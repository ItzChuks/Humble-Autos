import { Helmet } from 'react-helmet';
import { Car, Heart, MessageSquare, User } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import { useCars } from '../../contexts/CarsContext';

const AdminDashboard = () => {
  const { cars, isLoading } = useCars();
  
  // Calculate statistics
  const totalCars = cars.length;
  const totalLikes = cars.reduce((sum, car) => sum + car.likes, 0);
  const totalComments = cars.reduce((sum, car) => sum + car.comments.length, 0);
  const featuredCars = cars.filter(car => car.isFeatured).length;

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <Helmet>
        <title>Admin Dashboard | Humble Autos</title>
      </Helmet>
      
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Overview</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Cars */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary-600 text-sm font-medium">Total Cars</p>
                <p className="text-3xl font-bold mt-1">{totalCars}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
                <Car size={24} />
              </div>
            </div>
          </div>
          
          {/* Total Likes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary-600 text-sm font-medium">Total Likes</p>
                <p className="text-3xl font-bold mt-1">{totalLikes}</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-lg text-accent-600">
                <Heart size={24} />
              </div>
            </div>
          </div>
          
          {/* Total Comments */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary-600 text-sm font-medium">Total Comments</p>
                <p className="text-3xl font-bold mt-1">{totalComments}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                <MessageSquare size={24} />
              </div>
            </div>
          </div>
          
          {/* Featured Cars */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary-600 text-sm font-medium">Featured Cars</p>
                <p className="text-3xl font-bold mt-1">{featuredCars}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <Car size={24} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary-50">
                <div className="p-2 bg-accent-100 rounded-full text-accent-600">
                  <Heart size={16} />
                </div>
                <div>
                  <p className="font-medium">New Like</p>
                  <p className="text-sm text-secondary-600">User liked Mercedes-Benz S-Class</p>
                  <p className="text-xs text-secondary-500 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary-50">
                <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="font-medium">New Comment</p>
                  <p className="text-sm text-secondary-600">User commented on Porsche 911 GT3</p>
                  <p className="text-xs text-secondary-500 mt-1">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary-50">
                <div className="p-2 bg-primary-100 rounded-full text-primary-600">
                  <User size={16} />
                </div>
                <div>
                  <p className="font-medium">New User</p>
                  <p className="text-sm text-secondary-600">New user registered</p>
                  <p className="text-xs text-secondary-500 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary-50">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <Car size={16} />
                </div>
                <div>
                  <p className="font-medium">Car Updated</p>
                  <p className="text-sm text-secondary-600">Tesla Model S Plaid was updated</p>
                  <p className="text-xs text-secondary-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Popular Cars */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <h3 className="text-lg font-bold mb-4">Most Popular Cars</h3>
            
            <div className="space-y-4">
              {cars
                .sort((a, b) => b.likes - a.likes)
                .slice(0, 5)
                .map((car) => (
                  <div key={car.id} className="flex items-center gap-4 p-3 rounded-md hover:bg-secondary-50">
                    <div className="w-16 h-12 rounded overflow-hidden bg-secondary-100">
                      <img
                        src={car.images[0]}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{car.name}</p>
                      <p className="text-sm text-secondary-600">
                        {car.year} {car.make} {car.model}
                      </p>
                    </div>
                    <div className="flex items-center text-secondary-600">
                      <Heart size={16} className="mr-1" />
                      <span>{car.likes}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;