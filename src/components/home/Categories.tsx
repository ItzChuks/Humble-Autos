import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../data/cars';

// Remove the "all" category for this display
const displayCategories = categories.filter(category => category.value !== 'all');

// Category images (from Pexels)
const categoryImages: Record<string, string> = {
  luxury: 'https://images.pexels.com/photos/4674337/pexels-photo-4674337.jpeg',
  sports: 'https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg',
  suv: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg',
  sedan: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg',
  electric: 'https://images.pexels.com/photos/7354442/pexels-photo-7354442.jpeg',
  hybrid: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
  convertible: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg',
  truck: 'https://images.pexels.com/photos/2676424/pexels-photo-2676424.jpeg',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Categories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900">Browse by Category</h2>
          <p className="text-secondary-600 mt-2 max-w-2xl mx-auto">
            Explore our diverse range of vehicles categorized by type to find your perfect match
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayCategories.map((category) => (
            <motion.div key={category.value} variants={item}>
              <Link 
                to={`/cars?category=${category.value}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md h-64">
                  <img
                    src={categoryImages[category.value] || 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg'}
                    alt={category.label}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{category.label}</h3>
                      <p className="text-white/80 text-sm mt-1">
                        Explore our {category.label.toLowerCase()} collection
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;