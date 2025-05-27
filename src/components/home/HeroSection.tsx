import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: 'Luxury Reimagined',
    subtitle: 'Experience the pinnacle of automotive excellence with our premium selection.',
    buttonText: 'Explore Luxury Cars',
    buttonLink: '/cars?category=luxury',
    backgroundImage: '/images/car1.crdownload',
  },
  {
    id: 2,
    title: 'Performance Unleashed',
    subtitle: 'Discover sports cars that deliver unparalleled driving excitement.',
    buttonText: 'View Sports Cars',
    buttonLink: '/cars?category=sports',
    backgroundImage: '/images/car2.jpg',
  },
  {
    id: 3,
    title: 'Electric Revolution',
    subtitle: 'Embrace the future with our cutting-edge electric vehicles.',
    buttonText: 'See Electric Models',
    buttonLink: '/cars?category=electric',
    backgroundImage: '/images/car3.jpg',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Handle dot navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/80 to-secondary-900/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentSlide].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                {slides[currentSlide].subtitle}
              </p>
              <Link
                to={slides[currentSlide].buttonLink}
                className="btn-primary group"
              >
                {slides[currentSlide].buttonText}
                <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Dots */}
          <div className="absolute bottom-8 left-0 right-0">
            <div className="container mx-auto px-4">
              <div className="flex items-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-primary-500 w-10'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 text-white flex items-center cursor-pointer group animate-bounce">
        <span className="text-sm mr-2 font-medium">Scroll Down</span>
        <ChevronRight size={20} className="transform rotate-90" />
      </div>
    </section>
  );
};

export default HeroSection;