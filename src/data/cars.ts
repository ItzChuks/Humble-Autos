import { Car } from '../types';

// Sample car data for initial rendering
export const cars: Car[] = [
  {
    id: '1',
    name: 'Mercedes-Benz S-Class',
    make: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2023,
    price: 110000,
    category: 'luxury',
    rating: 4.9,
    images: [
      'https://images.pexels.com/photos/4674337/pexels-photo-4674337.jpeg',
      'https://images.pexels.com/photos/4674338/pexels-photo-4674338.jpeg',
      'https://images.pexels.com/photos/4674339/pexels-photo-4674339.jpeg',
    ],
    description: 'The Mercedes-Benz S-Class is the epitome of luxury and cutting-edge technology. This flagship sedan combines opulent comfort with powerful performance.',
    features: [
      'MBUX Infotainment System',
      'Burmester 4D Surround Sound',
      'Augmented Reality Navigation',
      'Active Ambient Lighting',
      'Executive Rear Seats',
    ],
    specifications: {
      engine: '4.0L V8 Biturbo',
      transmission: '9-Speed Automatic',
      drivetrain: 'All-Wheel Drive',
      horsepower: 496,
      torque: 516,
      fuelEconomy: '17 city / 25 highway',
      acceleration: '0-60 mph in 4.4 seconds',
      topSpeed: '155 mph (limited)',
      color: 'Obsidian Black',
      interiorColor: 'Nappa Leather Beige',
      seats: 5,
    },
    comments: [
      {
        id: 'c1',
        userId: 'u1',
        username: 'luxuryCarFan',
        content: 'The S-Class truly represents the pinnacle of automotive luxury. The ride quality is unmatched!',
        createdAt: '2023-09-15T10:30:00Z',
      },
      {
        id: 'c2',
        userId: 'u2',
        username: 'techEnthusiast',
        content: 'The technology in this car is mind-blowing. The augmented reality navigation is like something from the future.',
        createdAt: '2023-09-16T14:45:00Z',
      },
    ],
    likes: 42,
    isFeatured: true,
    createdAt: '2023-08-20T08:00:00Z',
    updatedAt: '2023-09-18T11:20:00Z',
  },
  {
    id: '2',
    name: 'Porsche 911 GT3',
    make: 'Porsche',
    model: '911 GT3',
    year: 2023,
    price: 161100,
    category: 'sports',
    rating: 4.8,
    images: [
      'https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg',
      'https://images.pexels.com/photos/3608543/pexels-photo-3608543.jpeg',
      'https://images.pexels.com/photos/3608544/pexels-photo-3608544.jpeg',
    ],
    description: 'The Porsche 911 GT3 is a high-performance sports car that delivers exhilarating driving dynamics and race-bred technology in a road-legal package.',
    features: [
      'Naturally Aspirated Flat-6 Engine',
      'Track-Focused Aerodynamics',
      'Lightweight Construction',
      'Sport Chrono Package',
      'Porsche Active Suspension Management',
    ],
    specifications: {
      engine: '4.0L Naturally Aspirated Flat-6',
      transmission: '7-Speed PDK',
      drivetrain: 'Rear-Wheel Drive',
      horsepower: 502,
      torque: 346,
      fuelEconomy: '15 city / 20 highway',
      acceleration: '0-60 mph in 3.2 seconds',
      topSpeed: '197 mph',
      color: 'Guards Red',
      interiorColor: 'Black with Race-Tex',
      seats: 2,
    },
    comments: [
      {
        id: 'c3',
        userId: 'u3',
        username: 'speedDemon',
        content: 'Nothing compares to the sound of that naturally aspirated flat-6. Absolute perfection!',
        createdAt: '2023-09-10T09:20:00Z',
      },
    ],
    likes: 38,
    isFeatured: true,
    createdAt: '2023-08-25T09:15:00Z',
    updatedAt: '2023-09-12T16:40:00Z',
  },
  {
    id: '3',
    name: 'Tesla Model S Plaid',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2023,
    price: 89990,
    category: 'electric',
    rating: 4.7,
    images: [
      'https://unsplash.com/photos/black-porsche-911-on-road-during-sunset-49gi04Retc4',
      'https://unsplash.com/photos/black-porsche-911-on-road-during-sunset-49gi04Retc4',
      'https://unsplash.com/photos/black-porsche-911-on-road-during-sunset-49gi04Retc4',
    ],
    description: 'The Tesla Model S Plaid is the fastest accelerating production car ever made, combining ludicrous performance with zero emissions and cutting-edge technology.',
    features: [
      'Tri-Motor All-Wheel Drive',
      '17" Cinematic Display',
      'Full Self-Driving Capability',
      'Yoke Steering',
      'Glass Roof',
    ],
    specifications: {
      engine: 'Tri-Motor Electric',
      transmission: 'Single-Speed',
      drivetrain: 'All-Wheel Drive',
      horsepower: 1020,
      torque: 1050,
      fuelEconomy: '396 miles range',
      acceleration: '0-60 mph in 1.99 seconds',
      topSpeed: '200 mph',
      color: 'Midnight Silver Metallic',
      interiorColor: 'Black and White',
      seats: 5,
    },
    comments: [
      {
        id: 'c4',
        userId: 'u4',
        username: 'electricFuture',
        content: 'The acceleration in this car is literally breathtaking. Nothing else comes close!',
        createdAt: '2023-09-05T18:10:00Z',
      },
      {
        id: 'c5',
        userId: 'u5',
        username: 'techGeek',
        content: 'The tech features in this car make everything else feel outdated. The infotainment system is incredible.',
        createdAt: '2023-09-08T11:30:00Z',
      },
    ],
    likes: 55,
    isFeatured: true,
    createdAt: '2023-08-18T10:30:00Z',
    updatedAt: '2023-09-10T14:25:00Z',
  },
  {
    id: '4',
    name: 'Range Rover SV Autobiography',
    make: 'Land Rover',
    model: 'Range Rover SV Autobiography',
    year: 2023,
    price: 218300,
    category: 'suv',
    rating: 4.6,
    images: [
      'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg',
      'https://images.pexels.com/photos/1402788/pexels-photo-1402788.jpeg',
      'https://images.pexels.com/photos/1402789/pexels-photo-1402789.jpeg',
    ],
    description: 'The Range Rover SV Autobiography represents the pinnacle of luxury SUVs, combining off-road capability with unparalleled refinement and craftsmanship.',
    features: [
      'Executive Class Rear Seats',
      'Meridian Signature Sound System',
      'Terrain Response 2',
      'Hot Stone Massage Seats',
      'Deployable Tables',
    ],
    specifications: {
      engine: '5.0L Supercharged V8',
      transmission: '8-Speed Automatic',
      drivetrain: 'Four-Wheel Drive',
      horsepower: 557,
      torque: 516,
      fuelEconomy: '14 city / 19 highway',
      acceleration: '0-60 mph in 5.1 seconds',
      topSpeed: '155 mph (limited)',
      color: 'Santorini Black',
      interiorColor: 'Vintage Tan',
      seats: 5,
    },
    comments: [
      {
        id: 'c6',
        userId: 'u6',
        username: 'adventureSeeker',
        content: 'This is the perfect blend of luxury and capability. Took it off-road and it handled everything with ease while keeping us in complete comfort.',
        createdAt: '2023-09-07T20:45:00Z',
      },
    ],
    likes: 31,
    isFeatured: false,
    createdAt: '2023-08-22T11:45:00Z',
    updatedAt: '2023-09-09T10:15:00Z',
  },
  {
    id: '5',
    name: 'BMW M5 Competition',
    make: 'BMW',
    model: 'M5 Competition',
    year: 2023,
    price: 111100,
    category: 'sedan',
    rating: 4.7,
    images: [
      'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg',
      'https://images.pexels.com/photos/892523/pexels-photo-892523.jpeg',
      'https://images.pexels.com/photos/892524/pexels-photo-892524.jpeg',
    ],
    description: 'The BMW M5 Competition is a high-performance luxury sedan that combines exceptional driving dynamics with everyday usability.',
    features: [
      'M xDrive All-Wheel Drive',
      'M Sport Differential',
      'Active M Suspension',
      'M Carbon Ceramic Brakes',
      'M Sport Exhaust System',
    ],
    specifications: {
      engine: '4.4L Twin-Turbo V8',
      transmission: '8-Speed M Steptronic',
      drivetrain: 'All-Wheel Drive',
      horsepower: 617,
      torque: 553,
      fuelEconomy: '15 city / 21 highway',
      acceleration: '0-60 mph in 3.1 seconds',
      topSpeed: '190 mph (with M Driver\'s Package)',
      color: 'Marina Bay Blue',
      interiorColor: 'Silverstone Merino Leather',
      seats: 5,
    },
    comments: [
      {
        id: 'c7',
        userId: 'u7',
        username: 'bimmerFanatic',
        content: 'The perfect daily driver that transforms into a track monster at the push of a button. The dual personality of this car is incredible.',
        createdAt: '2023-09-01T15:20:00Z',
      },
      {
        id: 'c8',
        userId: 'u8',
        username: 'speedEnthusiast',
        content: 'I\'ve owned several M cars, and this is by far the most complete package. The power delivery is brutal yet refined.',
        createdAt: '2023-09-03T09:15:00Z',
      },
    ],
    likes: 47,
    isFeatured: false,
    createdAt: '2023-08-26T14:30:00Z',
    updatedAt: '2023-09-05T13:10:00Z',
  },
  {
    id: '6',
    name: 'Audi RS e-tron GT',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2023,
    price: 143900,
    category: 'electric',
    rating: 4.6,
    images: [
      'https://images.pexels.com/photos/10349768/pexels-photo-10349768.jpeg',
      'https://images.pexels.com/photos/10349769/pexels-photo-10349769.jpeg',
      'https://images.pexels.com/photos/10349770/pexels-photo-10349770.jpeg',
    ],
    description: 'The Audi RS e-tron GT is an all-electric grand tourer that combines stunning design with exhilarating performance and zero emissions.',
    features: [
      'Dual Electric Motors',
      'Adaptive Air Suspension',
      'Matrix LED Headlights',
      'Bang & Olufsen 3D Sound System',
      'Carbon Fiber Reinforced Plastic Roof',
    ],
    specifications: {
      engine: 'Dual Electric Motors',
      transmission: '2-Speed Automatic',
      drivetrain: 'All-Wheel Drive',
      horsepower: 637,
      torque: 612,
      fuelEconomy: '232 miles range',
      acceleration: '0-60 mph in 3.1 seconds',
      topSpeed: '155 mph (limited)',
      color: 'Daytona Gray',
      interiorColor: 'Black with Red Stitching',
      seats: 4,
    },
    comments: [
      {
        id: 'c9',
        userId: 'u9',
        username: 'greenSpeed',
        content: 'The future of performance cars is here! Silent but deadly performance with gorgeous styling.',
        createdAt: '2023-09-11T12:30:00Z',
      },
    ],
    likes: 39,
    isFeatured: true,
    createdAt: '2023-08-24T16:20:00Z',
    updatedAt: '2023-09-13T09:45:00Z',
  },
];

// Export categories for filtering
export const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'sports', label: 'Sports' },
  { value: 'suv', label: 'SUV' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'convertible', label: 'Convertible' },
  { value: 'truck', label: 'Truck' },
];

// Sample price ranges for filtering
export const priceRanges: { min: number; max: number; label: string }[] = [
  { min: 0, max: 50000, label: 'Under $50,000' },
  { min: 50000, max: 100000, label: '$50,000 - $100,000' },
  { min: 100000, max: 200000, label: '$100,000 - $200,000' },
  { min: 200000, max: 10000000, label: 'Over $200,000' },
];

// Sample year ranges for filtering
export const yearRanges: { min: number; max: number; label: string }[] = [
  { min: 2023, max: 2023, label: '2023' },
  { min: 2020, max: 2022, label: '2020 - 2022' },
  { min: 2015, max: 2019, label: '2015 - 2019' },
  { min: 0, max: 2014, label: '2014 & Older' },
];
