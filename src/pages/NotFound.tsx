import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-16">
      <Helmet>
        <title>Page Not Found | Humble Autos</title>
      </Helmet>
      
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-secondary-900 mb-4">Page Not Found</h2>
        <p className="text-secondary-600 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;