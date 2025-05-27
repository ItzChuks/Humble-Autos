import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Heart, Share2, Star } from 'lucide-react';
import { Car } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useCars } from '../../contexts/CarsContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface CarDetailsProps {
  car: Car;
}

const CarDetails = ({ car }: CarDetailsProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { isAuthenticated } = useAuth();
  const { toggleLike, toggleFavorite, favoriteCars } = useCars();
  const [isLiked, setIsLiked] = useState(favoriteCars.some(favCar => favCar.id === car.id));
  
  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    try {
      await toggleLike(car.id);
    } catch (error) {
      console.error('Failed to like car:', error);
    }
  };
  
  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    try {
      toggleFavorite(car.id);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to favorite car:', error);
    }
  };
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: car.name,
        text: `Check out this ${car.year} ${car.make} ${car.model}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Gallery */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper as any }}
          className="aspect-[16/9] md:aspect-[2/1]"
        >
          {car.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${car.name} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full ${
              isLiked ? 'bg-accent-500 text-white' : 'bg-white/80 text-secondary-700 hover:bg-white'
            } transition-colors`}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleShareClick}
            className="p-2 rounded-full bg-white/80 text-secondary-700 hover:bg-white transition-colors"
            aria-label="Share"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
      
      {/* Thumbnail Navigation */}
      {car.images.length > 1 && (
        <div className="p-2 bg-secondary-100">
          <Swiper
            onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="thumbs-swiper"
          >
            {car.images.map((image, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <div className="h-16 rounded overflow-hidden">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      
      {/* Car Info */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{car.name}</h1>
            <p className="text-secondary-600">{car.year} {car.make} {car.model}</p>
          </div>
          <div className="flex items-center mt-2 md:mt-0 space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < Math.floor(car.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-1 text-secondary-700">{car.rating.toFixed(1)}</span>
            </div>
            <span className="text-secondary-500">|</span>
            <span className="text-secondary-700">{car.likes} likes</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
            {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
          </span>
          <button
            onClick={handleLikeClick}
            className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium hover:bg-secondary-200 transition-colors"
          >
            Like this car
          </button>
        </div>
        
        <div className="text-3xl font-bold text-secondary-900 mb-6">
          ${car.price.toLocaleString()}
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-secondary-700 leading-relaxed">
            {car.description}
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            {car.features.map((feature, index) => (
              <li key={index} className="flex items-center text-secondary-700">
                <span className="mr-2 text-primary-600">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-2">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Engine</p>
              <p className="font-medium">{car.specifications.engine}</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Transmission</p>
              <p className="font-medium">{car.specifications.transmission}</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Drivetrain</p>
              <p className="font-medium">{car.specifications.drivetrain}</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Horsepower</p>
              <p className="font-medium">{car.specifications.horsepower} hp</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Torque</p>
              <p className="font-medium">{car.specifications.torque} lb-ft</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Fuel Economy</p>
              <p className="font-medium">{car.specifications.fuelEconomy}</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Acceleration</p>
              <p className="font-medium">{car.specifications.acceleration}</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Top Speed</p>
              <p className="font-medium">{car.specifications.topSpeed}</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Color</p>
              <p className="font-medium">{car.specifications.color}</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Interior</p>
              <p className="font-medium">{car.specifications.interiorColor}</p>
            </div>
            <div className="bg-secondary-50 p-3 rounded">
              <p className="text-sm text-secondary-500">Seats</p>
              <p className="font-medium">{car.specifications.seats}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;