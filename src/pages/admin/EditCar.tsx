import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AdminHeader from '../../components/admin/AdminHeader';
import CarForm from '../../components/admin/CarForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useCars } from '../../contexts/CarsContext';
import { AddCarFormValues } from '../../types';

const EditCar = () => {
  const { id } = useParams<{ id: string }>();
  const { getCar, updateCar, isLoading: carsLoading } = useCars();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const car = id ? getCar(id) : undefined;
  
  // Redirect to car list if car not found
  useEffect(() => {
    if (!carsLoading && !car && id) {
      navigate('/admin/cars', { replace: true });
    }
  }, [car, carsLoading, id, navigate]);

  const handleSubmit = async (data: AddCarFormValues) => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, we would handle image upload here
      
      await updateCar(id, {
        name: data.name,
        make: data.make,
        model: data.model,
        year: data.year,
        price: data.price,
        category: data.category,
        rating: data.rating,
        description: data.description,
        features: data.features,
        specifications: {
          engine: data.engine,
          transmission: data.transmission,
          drivetrain: data.drivetrain,
          horsepower: data.horsepower,
          torque: data.torque,
          fuelEconomy: data.fuelEconomy,
          acceleration: data.acceleration,
          topSpeed: data.topSpeed,
          color: data.color,
          interiorColor: data.interiorColor,
          seats: data.seats,
        },
        isFeatured: data.isFeatured,
      });
      
      // Redirect to car list after successful update
      navigate('/admin/cars');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update car');
      setIsLoading(false);
    }
  };

  if (carsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 mt-16">
        <AdminHeader />
        <div className="container mx-auto px-4 py-12">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }
  
  if (!car) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <Helmet>
        <title>Edit Car | Admin Dashboard</title>
      </Helmet>
      
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Car: {car.name}</h2>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4 mb-6">
            {error}
          </div>
        )}
        
        <CarForm onSubmit={handleSubmit} car={car} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default EditCar;