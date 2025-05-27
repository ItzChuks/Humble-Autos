import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import CarCard from '../components/cars/CarCard';
import CarFilters from '../components/cars/CarFilters';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCars } from '../contexts/CarsContext';
import { FilterOptions } from '../types';

interface CarListingProps {
  favorites?: boolean;
}

const CarListing = ({ favorites = false }: CarListingProps) => {
  const { filteredCars, favoriteCars, filterCars, isLoading, currentFilter } = useCars();
  const [searchParams] = useSearchParams();
  
  const cars = favorites ? favoriteCars : filteredCars;
  
  // Set page title based on filters
  const getPageTitle = () => {
    if (favorites) return 'Your Favorite Cars';
    
    if (currentFilter.category && currentFilter.category !== 'all') {
      return `${currentFilter.category.charAt(0).toUpperCase() + currentFilter.category.slice(1)} Cars`;
    }
    
    if (currentFilter.search) {
      return `Search Results for "${currentFilter.search}"`;
    }
    
    return 'Browse Our Car Inventory';
  };

  // Handle filter changes
  const handleFilter = (options: FilterOptions) => {
    filterCars(options);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Helmet>
        <title>{getPageTitle()} | Humble Autos</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
      <p className="text-secondary-600 mb-6">
        {favorites 
          ? 'Cars you have saved to your favorites' 
          : 'Explore our collection of premium vehicles'}
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        {!favorites && (
          <div className="w-full md:w-64 flex-shrink-0">
            <CarFilters onFilter={handleFilter} currentFilter={currentFilter} />
          </div>
        )}
        
        {/* Car Grid */}
        <div className="flex-grow">
          {isLoading ? (
            <div className="py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : cars.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-lg shadow-sm border border-secondary-200">
              <h2 className="text-xl font-medium text-secondary-800 mb-2">
                {favorites 
                  ? 'You haven\'t added any cars to your favorites yet.' 
                  : 'No cars match your current filters.'}
              </h2>
              <p className="text-secondary-600">
                {favorites 
                  ? 'Browse our inventory and click the heart icon to add cars to your favorites.' 
                  : 'Try adjusting your filters or search criteria.'}
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-secondary-600">
                Showing {cars.length} {cars.length === 1 ? 'car' : 'cars'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {cars.map((car) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CarCard car={car} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListing;