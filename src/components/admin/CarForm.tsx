import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus } from 'lucide-react';
import { Car, AddCarFormValues, CarCategory } from '../../types';
import { categories } from '../../data/cars';

interface CarFormProps {
  onSubmit: (data: AddCarFormValues) => Promise<void>;
  car?: Car;
  isLoading: boolean;
}

// Remove the "all" category for form
const carCategories = categories.filter(category => category.value !== 'all');

const carSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().int().min(1900, 'Year must be at least 1900').max(2100, 'Year must be less than 2100'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  rating: z.number().min(0, 'Rating must be at least 0').max(5, 'Rating must be at most 5'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  engine: z.string().min(1, 'Engine information is required'),
  transmission: z.string().min(1, 'Transmission information is required'),
  drivetrain: z.string().min(1, 'Drivetrain information is required'),
  horsepower: z.number().positive('Horsepower must be positive'),
  torque: z.number().positive('Torque must be positive'),
  fuelEconomy: z.string().min(1, 'Fuel economy information is required'),
  acceleration: z.string().min(1, 'Acceleration information is required'),
  topSpeed: z.string().min(1, 'Top speed information is required'),
  color: z.string().min(1, 'Color is required'),
  interiorColor: z.string().min(1, 'Interior color is required'),
  seats: z.number().int().positive('Seats must be positive'),
  isFeatured: z.boolean().optional(),
});

const CarForm = ({ onSubmit, car, isLoading }: CarFormProps) => {
  const [features, setFeatures] = useState<string[]>(car?.features || ['']);
  const [featuresError, setFeaturesError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddCarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: car ? {
      name: car.name,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      category: car.category,
      rating: car.rating,
      description: car.description,
      engine: car.specifications.engine,
      transmission: car.specifications.transmission,
      drivetrain: car.specifications.drivetrain,
      horsepower: car.specifications.horsepower,
      torque: car.specifications.torque,
      fuelEconomy: car.specifications.fuelEconomy,
      acceleration: car.specifications.acceleration,
      topSpeed: car.specifications.topSpeed,
      color: car.specifications.color,
      interiorColor: car.specifications.interiorColor,
      seats: car.specifications.seats,
      isFeatured: car.isFeatured,
    } : {
      name: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      category: 'luxury' as CarCategory,
      rating: 4.5,
      description: '',
      engine: '',
      transmission: '',
      drivetrain: '',
      horsepower: 0,
      torque: 0,
      fuelEconomy: '',
      acceleration: '',
      topSpeed: '',
      color: '',
      interiorColor: '',
      seats: 5,
      isFeatured: false,
    },
  });

  // Reset form if car prop changes
  useEffect(() => {
    if (car) {
      reset({
        name: car.name,
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        category: car.category,
        rating: car.rating,
        description: car.description,
        engine: car.specifications.engine,
        transmission: car.specifications.transmission,
        drivetrain: car.specifications.drivetrain,
        horsepower: car.specifications.horsepower,
        torque: car.specifications.torque,
        fuelEconomy: car.specifications.fuelEconomy,
        acceleration: car.specifications.acceleration,
        topSpeed: car.specifications.topSpeed,
        color: car.specifications.color,
        interiorColor: car.specifications.interiorColor,
        seats: car.specifications.seats,
        isFeatured: car.isFeatured,
      });
      setFeatures(car.features);
    }
  }, [car, reset]);

  // Handle feature input changes
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  // Add a new empty feature
  const addFeature = () => {
    setFeatures([...features, '']);
  };

  // Remove a feature
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      const updatedFeatures = [...features];
      updatedFeatures.splice(index, 1);
      setFeatures(updatedFeatures);
    }
  };

  // Handle form submission
  const handleFormSubmit = (data: AddCarFormValues) => {
    // Validate features
    const validFeatures = features.filter(feature => feature.trim() !== '');
    
    if (validFeatures.length === 0) {
      setFeaturesError('At least one feature is required');
      return;
    }
    
    setFeaturesError(null);
    
    // Submit form with features added
    onSubmit({
      ...data,
      features: validFeatures,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="label">
              Car Name
            </label>
            <input
              id="name"
              type="text"
              className={`input ${errors.name ? 'border-red-500' : ''}`}
              placeholder="e.g. Mercedes-Benz S-Class"
              {...register('name')}
            />
            {errors.name && (
              <p className="error-text">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="make" className="label">
              Make
            </label>
            <input
              id="make"
              type="text"
              className={`input ${errors.make ? 'border-red-500' : ''}`}
              placeholder="e.g. Mercedes-Benz"
              {...register('make')}
            />
            {errors.make && (
              <p className="error-text">{errors.make.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="model" className="label">
              Model
            </label>
            <input
              id="model"
              type="text"
              className={`input ${errors.model ? 'border-red-500' : ''}`}
              placeholder="e.g. S-Class"
              {...register('model')}
            />
            {errors.model && (
              <p className="error-text">{errors.model.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="year" className="label">
              Year
            </label>
            <input
              id="year"
              type="number"
              className={`input ${errors.year ? 'border-red-500' : ''}`}
              placeholder="e.g. 2023"
              {...register('year', { valueAsNumber: true })}
            />
            {errors.year && (
              <p className="error-text">{errors.year.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="price" className="label">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              className={`input ${errors.price ? 'border-red-500' : ''}`}
              placeholder="e.g. 75000"
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="error-text">{errors.price.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="label">
              Category
            </label>
            <select
              id="category"
              className={`input ${errors.category ? 'border-red-500' : ''}`}
              {...register('category')}
            >
              {carCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="error-text">{errors.category.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="rating" className="label">
              Rating (0-5)
            </label>
            <input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              className={`input ${errors.rating ? 'border-red-500' : ''}`}
              placeholder="e.g. 4.5"
              {...register('rating', { valueAsNumber: true })}
            />
            {errors.rating && (
              <p className="error-text">{errors.rating.message}</p>
            )}
          </div>
          
          <div className="flex items-center">
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <div className="mt-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-primary-600 rounded border-secondary-300"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <span className="ml-2 text-secondary-700">
                      Feature this car on homepage
                    </span>
                  </label>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        
        <div>
          <label htmlFor="description" className="label">
            Car Description
          </label>
          <textarea
            id="description"
            rows={5}
            className={`input ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Describe the car and its key selling points..."
            {...register('description')}
          ></textarea>
          {errors.description && (
            <p className="error-text">{errors.description.message}</p>
          )}
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
        <h2 className="text-xl font-bold mb-4">Features</h2>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="input flex-grow"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="p-2 rounded-md text-secondary-500 hover:bg-secondary-100 transition-colors"
                disabled={features.length <= 1}
              >
                <X size={18} />
              </button>
            </div>
          ))}
          
          {featuresError && (
            <p className="error-text">{featuresError}</p>
          )}
          
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add Feature
          </button>
        </div>
      </div>
      
      {/* Specifications Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
        <h2 className="text-xl font-bold mb-4">Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="engine" className="label">
              Engine
            </label>
            <input
              id="engine"
              type="text"
              className={`input ${errors.engine ? 'border-red-500' : ''}`}
              placeholder="e.g. 4.0L V8 Biturbo"
              {...register('engine')}
            />
            {errors.engine && (
              <p className="error-text">{errors.engine.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="transmission" className="label">
              Transmission
            </label>
            <input
              id="transmission"
              type="text"
              className={`input ${errors.transmission ? 'border-red-500' : ''}`}
              placeholder="e.g. 9-Speed Automatic"
              {...register('transmission')}
            />
            {errors.transmission && (
              <p className="error-text">{errors.transmission.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="drivetrain" className="label">
              Drivetrain
            </label>
            <input
              id="drivetrain"
              type="text"
              className={`input ${errors.drivetrain ? 'border-red-500' : ''}`}
              placeholder="e.g. All-Wheel Drive"
              {...register('drivetrain')}
            />
            {errors.drivetrain && (
              <p className="error-text">{errors.drivetrain.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="horsepower" className="label">
              Horsepower
            </label>
            <input
              id="horsepower"
              type="number"
              className={`input ${errors.horsepower ? 'border-red-500' : ''}`}
              placeholder="e.g. 496"
              {...register('horsepower', { valueAsNumber: true })}
            />
            {errors.horsepower && (
              <p className="error-text">{errors.horsepower.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="torque" className="label">
              Torque
            </label>
            <input
              id="torque"
              type="number"
              className={`input ${errors.torque ? 'border-red-500' : ''}`}
              placeholder="e.g. 516"
              {...register('torque', { valueAsNumber: true })}
            />
            {errors.torque && (
              <p className="error-text">{errors.torque.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="fuelEconomy" className="label">
              Fuel Economy
            </label>
            <input
              id="fuelEconomy"
              type="text"
              className={`input ${errors.fuelEconomy ? 'border-red-500' : ''}`}
              placeholder="e.g. 17 city / 25 highway"
              {...register('fuelEconomy')}
            />
            {errors.fuelEconomy && (
              <p className="error-text">{errors.fuelEconomy.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="acceleration" className="label">
              Acceleration
            </label>
            <input
              id="acceleration"
              type="text"
              className={`input ${errors.acceleration ? 'border-red-500' : ''}`}
              placeholder="e.g. 0-60 mph in 4.4 seconds"
              {...register('acceleration')}
            />
            {errors.acceleration && (
              <p className="error-text">{errors.acceleration.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="topSpeed" className="label">
              Top Speed
            </label>
            <input
              id="topSpeed"
              type="text"
              className={`input ${errors.topSpeed ? 'border-red-500' : ''}`}
              placeholder="e.g. 155 mph (limited)"
              {...register('topSpeed')}
            />
            {errors.topSpeed && (
              <p className="error-text">{errors.topSpeed.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="color" className="label">
              Exterior Color
            </label>
            <input
              id="color"
              type="text"
              className={`input ${errors.color ? 'border-red-500' : ''}`}
              placeholder="e.g. Obsidian Black"
              {...register('color')}
            />
            {errors.color && (
              <p className="error-text">{errors.color.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="interiorColor" className="label">
              Interior Color
            </label>
            <input
              id="interiorColor"
              type="text"
              className={`input ${errors.interiorColor ? 'border-red-500' : ''}`}
              placeholder="e.g. Nappa Leather Beige"
              {...register('interiorColor')}
            />
            {errors.interiorColor && (
              <p className="error-text">{errors.interiorColor.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="seats" className="label">
              Number of Seats
            </label>
            <input
              id="seats"
              type="number"
              className={`input ${errors.seats ? 'border-red-500' : ''}`}
              placeholder="e.g. 5"
              {...register('seats', { valueAsNumber: true })}
            />
            {errors.seats && (
              <p className="error-text">{errors.seats.message}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Images Section - In a real app, this would include image upload functionality */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
        <h2 className="text-xl font-bold mb-4">Images</h2>
        
        <div className="p-4 bg-secondary-50 rounded-md border border-secondary-200 text-secondary-700">
          <p>
            In a real application, this section would include image upload functionality. 
            For this demo, we're using sample images from Pexels.
          </p>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary px-6"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : (car ? 'Update Car' : 'Add Car')}
        </button>
      </div>
    </form>
  );
};

export default CarForm;