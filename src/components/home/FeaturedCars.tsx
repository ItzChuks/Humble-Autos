import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useCars } from '../../contexts/CarsContext';
import { Car } from '../../types';
import { motion } from 'framer-motion';

const FeaturedCars = () => {
  const { featuredCars, isLoading } = useCars();
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleCars = 3;
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll through featured cars
  useEffect(() => {
    if (featuredCars.length <= maxVisibleCars) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredCars.length - maxVisibleCars ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredCars.length]);

  // Handle navigation
  const navigatePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const navigateNext = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(featuredCars.length - maxVisibleCars, prevIndex + 1)
    );
  };

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-secondary-900">Featured Vehicles</h2>
            <p className="text-secondary-600 mt-2">
              Discover our handpicked selection of exceptional automobiles
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={navigatePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full border border-secondary-200 hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={navigateNext}
              disabled={currentIndex >= featuredCars.length - maxVisibleCars}
              className="p-2 rounded-full border border-secondary-200 hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={false}
            animate={{ x: `-${currentIndex * 100 / maxVisibleCars}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {featuredCars.map((car: Car) => (
              <div key={car.id} className="card group">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{car.name}</h3>
                      <p className="text-secondary-600 text-sm">{car.year} {car.make} {car.model}</p>
                    </div>
                    <div className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                      {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    {renderRating(car.rating)}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold">${car.price.toLocaleString()}</span>
                    <Link
                      to={`/cars/${car.id}`}
                      className="btn-primary py-1.5 px-3 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/cars" className="btn-outline">
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;