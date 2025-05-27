import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginFormValues } from '../../types';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the redirect path from location state, or default to homepage
  const from = location.state?.from?.pathname || '/';
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);
      setIsLoading(true);
      
      await login(data);
      
      // Redirect after successful login
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-secondary-600 mt-2">
          Sign in to your account to continue
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className={`input ${errors.email ? 'border-red-500' : ''}`}
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="error-text">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="label">
              Password
            </label>
            <a href="#" className="text-sm text-primary-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`input pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            'Signing in...'
          ) : (
            <>
              <LogIn size={18} className="mr-2" />
              Sign In
            </>
          )}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-secondary-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:underline">
            Register
          </Link>
        </p>
        
        <div className="mt-6 text-sm text-secondary-500">
          <p>Demo accounts:</p>
          <p className="mt-1">
            Admin: admin@humbleautos.com / admin123
          </p>
          <p>
            User: user@example.com / user123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;