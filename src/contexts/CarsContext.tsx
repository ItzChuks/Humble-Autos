import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car, CarCategory, FilterOptions, CommentFormValues, AddCarFormValues } from '../types';
import { cars as initialCars } from '../data/cars';
import { useAuth } from './AuthContext';

interface CarsContextType {
  cars: Car[];
  filteredCars: Car[];
  featuredCars: Car[];
  favoriteCars: Car[];
  isLoading: boolean;
  error: string | null;
  getCar: (id: string) => Car | undefined;
  filterCars: (options: FilterOptions) => void;
  searchCars: (query: string) => void;
  addComment: (carId: string, comment: CommentFormValues) => Promise<void>;
  toggleLike: (carId: string) => Promise<void>;
  toggleFavorite: (carId: string) => void;
  addCar: (car: AddCarFormValues) => Promise<void>;
  updateCar: (id: string, car: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  currentFilter: FilterOptions;
}

const CarsContext = createContext<CarsContextType>({
  cars: [],
  filteredCars: [],
  featuredCars: [],
  favoriteCars: [],
  isLoading: false,
  error: null,
  getCar: () => undefined,
  filterCars: () => {},
  searchCars: () => {},
  addComment: async () => {},
  toggleLike: async () => {},
  toggleFavorite: () => {},
  addCar: async () => {},
  updateCar: async () => {},
  deleteCar: async () => {},
  currentFilter: {},
});

export const useCars = () => useContext(CarsContext);

export const CarsProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(initialCars);
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [favoriteCars, setFavoriteCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterOptions>({});
  
  const { user } = useAuth();

  // Initialize cars on mount
  useEffect(() => {
    // Simulate API fetch
    const fetchCars = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCars(initialCars);
        setFilteredCars(initialCars);
        setFeaturedCars(initialCars.filter(car => car.isFeatured));
        
        // Load favorites from localStorage if user is logged in
        if (user) {
          const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
          if (storedFavorites) {
            const favoriteIds = JSON.parse(storedFavorites) as string[];
            setFavoriteCars(initialCars.filter(car => favoriteIds.includes(car.id)));
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch cars');
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  // Get a single car by ID
  const getCar = (id: string) => {
    return cars.find(car => car.id === id);
  };

  // Filter cars based on options
  const filterCars = (options: FilterOptions) => {
    setCurrentFilter(options);
    
    let filtered = [...cars];
    
    // Filter by category
    if (options.category && options.category !== 'all') {
      filtered = filtered.filter(
        car => car.category === options.category
      );
    }
    
    // Filter by price range
    if (options.minPrice !== undefined) {
      filtered = filtered.filter(car => car.price >= options.minPrice!);
    }
    
    if (options.maxPrice !== undefined) {
      filtered = filtered.filter(car => car.price <= options.maxPrice!);
    }
    
    // Filter by year range
    if (options.minYear !== undefined) {
      filtered = filtered.filter(car => car.year >= options.minYear!);
    }
    
    if (options.maxYear !== undefined) {
      filtered = filtered.filter(car => car.year <= options.maxYear!);
    }
    
    // Filter by search term
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(
        car =>
          car.name.toLowerCase().includes(searchLower) ||
          car.make.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          car.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredCars(filtered);
  };

  // Search cars by query
  const searchCars = (query: string) => {
    filterCars({ ...currentFilter, search: query });
  };

  // Add a comment to a car
  const addComment = async (carId: string, commentData: CommentFormValues) => {
    if (!user) {
      throw new Error('You must be logged in to comment');
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedCars = cars.map(car => {
        if (car.id === carId) {
          const newComment = {
            id: `c${Date.now()}`,
            userId: user.id,
            username: user.username,
            content: commentData.content,
            createdAt: new Date().toISOString(),
          };
          
          return {
            ...car,
            comments: [...car.comments, newComment],
          };
        }
        return car;
      });
      
      setCars(updatedCars);
      setFilteredCars(prevFiltered => 
        prevFiltered.map(car => 
          car.id === carId 
            ? updatedCars.find(c => c.id === carId)! 
            : car
        )
      );
      
      setIsLoading(false);
    } catch (error) {
      setError('Failed to add comment');
      setIsLoading(false);
      throw error;
    }
  };

  // Toggle like on a car
  const toggleLike = async (carId: string) => {
    if (!user) {
      throw new Error('You must be logged in to like a car');
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user has already liked this car (would be stored in the backend)
      // For demo purposes, we'll just toggle the like count
      
      const updatedCars = cars.map(car => {
        if (car.id === carId) {
          // In a real app, we would check if the user has already liked the car
          // For this demo, we'll just increment/decrement the likes count
          return {
            ...car,
            likes: car.likes + 1,
          };
        }
        return car;
      });
      
      setCars(updatedCars);
      setFilteredCars(prevFiltered => 
        prevFiltered.map(car => 
          car.id === carId 
            ? updatedCars.find(c => c.id === carId)! 
            : car
        )
      );
      
      setIsLoading(false);
    } catch (error) {
      setError('Failed to toggle like');
      setIsLoading(false);
      throw error;
    }
  };

  // Toggle favorite on a car
  const toggleFavorite = (carId: string) => {
    if (!user) {
      throw new Error('You must be logged in to favorite a car');
    }
    
    try {
      // Check if car is already in favorites
      const isFavorite = favoriteCars.some(car => car.id === carId);
      
      let updatedFavorites: Car[];
      
      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = favoriteCars.filter(car => car.id !== carId);
      } else {
        // Add to favorites
        const carToAdd = cars.find(car => car.id === carId);
        if (!carToAdd) {
          throw new Error('Car not found');
        }
        updatedFavorites = [...favoriteCars, carToAdd];
      }
      
      setFavoriteCars(updatedFavorites);
      
      // Save to localStorage
      localStorage.setItem(
        `favorites_${user.id}`,
        JSON.stringify(updatedFavorites.map(car => car.id))
      );
    } catch (error) {
      setError('Failed to toggle favorite');
      throw error;
    }
  };

  // Add a new car (admin only)
  const addCar = async (carData: AddCarFormValues) => {
    if (!user?.isAdmin) {
      throw new Error('Only admins can add cars');
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would upload images to a storage service
      // For this demo, we'll use sample image URLs
      const imageUrls = [
        'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
        'https://images.pexels.com/photos/3802511/pexels-photo-3802511.jpeg',
        'https://images.pexels.com/photos/3802512/pexels-photo-3802512.jpeg',
      ];
      
      const newCar: Car = {
        id: `car-${Date.now()}`,
        name: carData.name,
        make: carData.make,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        category: carData.category,
        rating: carData.rating,
        images: imageUrls,
        description: carData.description,
        features: carData.features,
        specifications: {
          engine: carData.engine,
          transmission: carData.transmission,
          drivetrain: carData.drivetrain,
          horsepower: carData.horsepower,
          torque: carData.torque,
          fuelEconomy: carData.fuelEconomy,
          acceleration: carData.acceleration,
          topSpeed: carData.topSpeed,
          color: carData.color,
          interiorColor: carData.interiorColor,
          seats: carData.seats,
        },
        comments: [],
        likes: 0,
        isFeatured: carData.isFeatured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const updatedCars = [...cars, newCar];
      setCars(updatedCars);
      
      // Update filtered cars based on current filter
      filterCars(currentFilter);
      
      // Update featured cars if needed
      if (newCar.isFeatured) {
        setFeaturedCars([...featuredCars, newCar]);
      }
      
      setIsLoading(false);
      return newCar;
    } catch (error) {
      setError('Failed to add car');
      setIsLoading(false);
      throw error;
    }
  };

  // Update an existing car (admin only)
  const updateCar = async (id: string, carData: Partial<Car>) => {
    if (!user?.isAdmin) {
      throw new Error('Only admins can update cars');
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedCars = cars.map(car => {
        if (car.id === id) {
          const updatedCar = {
            ...car,
            ...carData,
            updatedAt: new Date().toISOString(),
          };
          
          return updatedCar;
        }
        return car;
      });
      
      setCars(updatedCars);
      
      // Update filtered cars
      filterCars(currentFilter);
      
      // Update featured cars
      setFeaturedCars(updatedCars.filter(car => car.isFeatured));
      
      // Update favorites if needed
      if (favoriteCars.some(car => car.id === id)) {
        setFavoriteCars(prevFavorites => 
          prevFavorites.map(car => 
            car.id === id 
              ? updatedCars.find(c => c.id === id)! 
              : car
          )
        );
      }
      
      setIsLoading(false);
    } catch (error) {
      setError('Failed to update car');
      setIsLoading(false);
      throw error;
    }
  };

  // Delete a car (admin only)
  const deleteCar = async (id: string) => {
    if (!user?.isAdmin) {
      throw new Error('Only admins can delete cars');
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedCars = cars.filter(car => car.id !== id);
      setCars(updatedCars);
      
      // Update filtered cars
      setFilteredCars(prevFiltered => prevFiltered.filter(car => car.id !== id));
      
      // Update featured cars if needed
      setFeaturedCars(prevFeatured => prevFeatured.filter(car => car.id !== id));
      
      // Update favorites if needed
      setFavoriteCars(prevFavorites => prevFavorites.filter(car => car.id !== id));
      
      setIsLoading(false);
    } catch (error) {
      setError('Failed to delete car');
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <CarsContext.Provider
      value={{
        cars,
        filteredCars,
        featuredCars,
        favoriteCars,
        isLoading,
        error,
        getCar,
        filterCars,
        searchCars,
        addComment,
        toggleLike,
        toggleFavorite,
        addCar,
        updateCar,
        deleteCar,
        currentFilter,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};