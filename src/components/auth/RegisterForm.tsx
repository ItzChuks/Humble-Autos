import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterFormValues } from '../../types';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setError(null);
      setIsLoading(true);
      
      await registerUser(data);
      
      // Redirect after successful registration
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-secondary-600 mt-2">
          Join Humble Autos and discover amazing vehicles
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`input ${errors.username ? 'border-red-500' : ''}`}
            placeholder="Choose a username"
            {...register('username')}
          />
          {errors.username && (
            <p className="error-text">{errors.username.message}</p>
          )}
        </div>
        
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
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`input pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Create a password"
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
        
        <div>
          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className={`input pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm your password"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 text-primary-600 rounded border-secondary-300"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-secondary-600">
            I agree to the{' '}
            <a href="#" className="text-primary-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            'Creating account...'
          ) : (
            <>
              <UserPlus size={18} className="mr-2" />
              Create Account
            </>
          )}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-secondary-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;