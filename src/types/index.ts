// Types for car data
export interface Car {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  category: CarCategory;
  rating: number;
  images: string[];
  description: string;
  features: string[];
  specifications: CarSpecifications;
  comments: Comment[];
  likes: number;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CarCategory = 
  | 'luxury' 
  | 'sports' 
  | 'suv' 
  | 'sedan' 
  | 'electric' 
  | 'hybrid' 
  | 'convertible' 
  | 'truck';

export interface CarSpecifications {
  engine: string;
  transmission: string;
  drivetrain: string;
  horsepower: number;
  torque: number;
  fuelEconomy: string;
  acceleration: string;
  topSpeed: string;
  color: string;
  interiorColor: string;
  seats: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

// Types for user authentication
export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Types for filter and search
export interface FilterOptions {
  category?: CarCategory | 'all';
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  search?: string;
}

// Form types
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AddCarFormValues {
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  category: CarCategory;
  rating: number;
  description: string;
  features: string[];
  images: FileList;
  engine: string;
  transmission: string;
  drivetrain: string;
  horsepower: number;
  torque: number;
  fuelEconomy: string;
  acceleration: string;
  topSpeed: string;
  color: string;
  interiorColor: string;
  seats: number;
  isFeatured?: boolean;
}

export interface CommentFormValues {
  content: string;
}