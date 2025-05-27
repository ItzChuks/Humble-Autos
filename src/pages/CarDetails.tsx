import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CarDetailsComponent from '../components/cars/CarDetails';
import CarComments from '../components/cars/CarComments';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCars } from '../contexts/CarsContext';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getCar, isLoading } = useCars();
  const navigate = useNavigate();
  
  const car = id ? getCar(id) : undefined;
  
  // Redirect to listings if car not found
  useEffect(() => {
    if (!isLoading && !car && id) {
      navigate('/cars', { replace: true });
    }
  }, [car, isLoading, id, navigate]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 mt-16">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (!car) {
    return null; // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Helmet>
        <title>{car.name} | Humble Autos</title>
        <meta name="description" content={car.description.substring(0, 160)} />
      </Helmet>
      
      <CarDetailsComponent car={car} />
      <CarComments carId={car.id} comments={car.comments} />
    </div>
  );
};

export default CarDetails;