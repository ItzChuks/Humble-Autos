import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AdminHeader from '../../components/admin/AdminHeader';
import CarForm from '../../components/admin/CarForm';
import { useCars } from '../../contexts/CarsContext';
import { AddCarFormValues } from '../../types';

const AddCar = () => {
  const { addCar } = useCars();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: AddCarFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await addCar(data);
      
      // Redirect to car list after successful addition
      navigate('/admin/cars');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add car');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <Helmet>
        <title>Add New Car | Admin Dashboard</title>
      </Helmet>
      
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Car</h2>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4 mb-6">
            {error}
          </div>
        )}
        
        <CarForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AddCar;