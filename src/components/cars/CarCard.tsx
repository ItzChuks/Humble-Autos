import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Car } from '../../types';
import { useCars } from '../../contexts/CarsContext';
import { useAuth } from '../../contexts/AuthContext';

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const { toggleFavorite, favoriteCars } = useCars();
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(favoriteCars.some(favCar => favCar.id === car.id));

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAuthenticated) {
      toggleFavorite(car.id);
      setIsLiked(!isLiked);
    } else {
      // If not authenticated, redirect to login
      window.location.href = '/login';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card group h-full flex flex-col"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={car.images[0]}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button
          onClick={handleLikeClick}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isLiked ? 'bg-accent-500 text-white' : 'bg-white/80 text-secondary-500 hover:bg-white'
          } transition-colors`}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            size={18} 
            className={isLiked ? 'fill-current' : ''} 
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between">
            <div className="flex items-center text-white text-sm">
              <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
              <span>{car.rating.toFixed(1)}</span>
            </div>
            <div className="text-white text-sm font-medium">
              {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="font-bold text-lg group-hover:text-primary-600 transition-colors">
            {car.name}
          </h3>
          <p className="text-secondary-600 text-sm">{car.year} {car.make} {car.model}</p>
        </div>
        
        <p className="text-secondary-600 text-sm line-clamp-2 mb-3">
          {car.description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-bold">${car.price.toLocaleString()}</span>
          <Link
            to={`/cars/${car.id}`}
            className="btn-primary py-1.5 px-3 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;