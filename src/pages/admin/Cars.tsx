import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Edit, Eye, PlusCircle, Search, Trash2 } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useCars } from '../../contexts/CarsContext';
import { Car } from '../../types';

const AdminCars = () => {
  const { cars, deleteCar, isLoading } = useCars();
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Filter cars based on search query
  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle delete confirmation
  const handleDeleteClick = (carId: string) => {
    setConfirmDelete(carId);
  };
  
  // Handle delete car
  const handleDeleteConfirm = async (carId: string) => {
    try {
      await deleteCar(carId);
      setConfirmDelete(null);
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <Helmet>
        <title>Manage Cars | Admin Dashboard</title>
      </Helmet>
      
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold">Manage Cars</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
            </div>
            
            <Link to="/admin/cars/add" className="btn-primary whitespace-nowrap">
              <PlusCircle size={18} className="mr-2" />
              Add New Car
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredCars.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200 text-center">
            <p className="text-secondary-600">No cars found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-secondary-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Car
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {filteredCars.map((car) => (
                    <tr key={car.id} className="hover:bg-secondary-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-secondary-100">
                            <img
                              src={car.images[0]}
                              alt={car.name}
                              className="h-10 w-10 object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-secondary-900">{car.name}</div>
                            <div className="text-sm text-secondary-500">{car.year} {car.make} {car.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                          {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-secondary-900">${car.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-secondary-900">{car.rating.toFixed(1)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-secondary-900">{car.isFeatured ? 'Yes' : 'No'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        <div className="flex space-x-2">
                          <Link
                            to={`/cars/${car.id}`}
                            className="p-1 text-secondary-600 hover:text-secondary-900 transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            to={`/admin/cars/edit/${car.id}`}
                            className="p-1 text-primary-600 hover:text-primary-800 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(car.id)}
                            className="p-1 text-accent-600 hover:text-accent-800 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-secondary-900/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
              <p className="text-secondary-600 mb-4">
                Are you sure you want to delete this car? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteConfirm(confirmDelete)}
                  className="btn-accent"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCars;