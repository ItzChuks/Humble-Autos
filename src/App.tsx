import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import { CarsProvider } from './contexts/CarsContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const CarListing = lazy(() => import('./pages/CarListing'));
const CarDetails = lazy(() => import('./pages/CarDetails'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminCars = lazy(() => import('./pages/admin/Cars'));
const AdminAddCar = lazy(() => import('./pages/admin/AddCar'));
const AdminEditCar = lazy(() => import('./pages/admin/EditCar'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <CarsProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cars" element={<CarListing />} />
                  <Route path="/cars/:id" element={<CarDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected routes for authenticated users */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/favorites" element={<CarListing favorites={true} />} />
                  </Route>
                  
                  {/* Admin routes */}
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/cars" element={<AdminCars />} />
                    <Route path="/admin/cars/add" element={<AdminAddCar />} />
                    <Route path="/admin/cars/edit/:id" element={<AdminEditCar />} />
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </CarsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;