import { Link, useLocation } from 'react-router-dom';
import { Car, Home, PlusCircle } from 'lucide-react';

const AdminHeader = () => {
  const location = useLocation();
  
  return (
    <div className="bg-white border-b border-secondary-200 mb-6">
      <div className="container mx-auto px-4">
        <div className="py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-secondary-600">Manage your car inventory and website content</p>
        </div>
        
        <div className="flex flex-wrap gap-2 pb-4">
          <Link
            to="/admin"
            className={`px-4 py-2 rounded-md flex items-center text-sm font-medium ${
              location.pathname === '/admin'
                ? 'bg-primary-100 text-primary-800'
                : 'text-secondary-700 hover:bg-secondary-100'
            }`}
          >
            <Home size={16} className="mr-2" />
            Dashboard
          </Link>
          
          <Link
            to="/admin/cars"
            className={`px-4 py-2 rounded-md flex items-center text-sm font-medium ${
              location.pathname === '/admin/cars'
                ? 'bg-primary-100 text-primary-800'
                : 'text-secondary-700 hover:bg-secondary-100'
            }`}
          >
            <Car size={16} className="mr-2" />
            Cars
          </Link>
          
          <Link
            to="/admin/cars/add"
            className={`px-4 py-2 rounded-md flex items-center text-sm font-medium ${
              location.pathname === '/admin/cars/add'
                ? 'bg-primary-100 text-primary-800'
                : 'text-secondary-700 hover:bg-secondary-100'
            }`}
          >
            <PlusCircle size={16} className="mr-2" />
            Add Car
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;