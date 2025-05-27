import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown, Filter, X } from 'lucide-react';
import { categories, priceRanges, yearRanges } from '../../data/cars';
import { FilterOptions } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CarFiltersProps {
  onFilter: (options: FilterOptions) => void;
  currentFilter: FilterOptions;
}

const CarFilters = ({ onFilter, currentFilter }: CarFiltersProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: 'all',
    minPrice: undefined,
    maxPrice: undefined,
    minYear: undefined,
    maxYear: undefined,
    search: '',
  });

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;
    const minYear = searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : undefined;
    const maxYear = searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : undefined;
    
    const newFilters = {
      category: category as FilterOptions['category'],
      search,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
    };
    
    setFilterOptions(newFilters);
    onFilter(newFilters);
  }, [searchParams]);

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilterOptions(prev => ({ ...prev, [key]: value }));
  };

  // Apply filters and update URL
  const applyFilters = () => {
    // Build query params
    const params = new URLSearchParams();
    
    if (filterOptions.category && filterOptions.category !== 'all') {
      params.set('category', filterOptions.category);
    }
    
    if (filterOptions.search) {
      params.set('search', filterOptions.search);
    }
    
    if (filterOptions.minPrice !== undefined) {
      params.set('minPrice', filterOptions.minPrice.toString());
    }
    
    if (filterOptions.maxPrice !== undefined) {
      params.set('maxPrice', filterOptions.maxPrice.toString());
    }
    
    if (filterOptions.minYear !== undefined) {
      params.set('minYear', filterOptions.minYear.toString());
    }
    
    if (filterOptions.maxYear !== undefined) {
      params.set('maxYear', filterOptions.maxYear.toString());
    }
    
    // Update URL
    navigate({ pathname: '/cars', search: params.toString() });
    
    // Apply filters
    onFilter(filterOptions);
    
    // Close mobile filters
    setIsOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterOptions({
      category: 'all',
      minPrice: undefined,
      maxPrice: undefined,
      minYear: undefined,
      maxYear: undefined,
      search: '',
    });
    
    navigate('/cars');
    onFilter({});
    setIsOpen(false);
  };

  // Count active filters
  const activeFilterCount = Object.values(filterOptions).filter(val => 
    val !== undefined && val !== 'all' && val !== ''
  ).length;

  return (
    <div className="mb-8">
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border border-secondary-200 rounded-md shadow-sm"
        >
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-secondary-500" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                {activeFilterCount}
              </span>
            )}
          </div>
          <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block bg-white border border-secondary-200 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Filters</h3>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
            >
              <X size={14} className="mr-1" />
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Category
            </label>
            <select
              value={filterOptions.category || 'all'}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Price Range
            </label>
            <select
              value={
                filterOptions.minPrice !== undefined && filterOptions.maxPrice !== undefined
                  ? `${filterOptions.minPrice}-${filterOptions.maxPrice}`
                  : ''
              }
              onChange={(e) => {
                if (e.target.value === '') {
                  handleFilterChange('minPrice', undefined);
                  handleFilterChange('maxPrice', undefined);
                } else {
                  const [min, max] = e.target.value.split('-').map(Number);
                  handleFilterChange('minPrice', min);
                  handleFilterChange('maxPrice', max);
                }
              }}
              className="input"
            >
              <option value="">Any Price</option>
              {priceRanges.map((range, index) => (
                <option key={index} value={`${range.min}-${range.max}`}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year Range Filter */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Year
            </label>
            <select
              value={
                filterOptions.minYear !== undefined && filterOptions.maxYear !== undefined
                  ? `${filterOptions.minYear}-${filterOptions.maxYear}`
                  : ''
              }
              onChange={(e) => {
                if (e.target.value === '') {
                  handleFilterChange('minYear', undefined);
                  handleFilterChange('maxYear', undefined);
                } else {
                  const [min, max] = e.target.value.split('-').map(Number);
                  handleFilterChange('minYear', min);
                  handleFilterChange('maxYear', max);
                }
              }}
              className="input"
            >
              <option value="">Any Year</option>
              {yearRanges.map((range, index) => (
                <option key={index} value={`${range.min}-${range.max}`}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filterOptions.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search cars..."
              className="input"
            />
          </div>

          <button
            onClick={applyFilters}
            className="w-full btn-primary mt-2"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-secondary-900/50 z-50 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Filters</h3>
                <button onClick={() => setIsOpen(false)}>
                  <X size={20} className="text-secondary-500" />
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pb-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filterOptions.category || 'all'}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Price Range
                  </label>
                  <select
                    value={
                      filterOptions.minPrice !== undefined && filterOptions.maxPrice !== undefined
                        ? `${filterOptions.minPrice}-${filterOptions.maxPrice}`
                        : ''
                    }
                    onChange={(e) => {
                      if (e.target.value === '') {
                        handleFilterChange('minPrice', undefined);
                        handleFilterChange('maxPrice', undefined);
                      } else {
                        const [min, max] = e.target.value.split('-').map(Number);
                        handleFilterChange('minPrice', min);
                        handleFilterChange('maxPrice', max);
                      }
                    }}
                    className="input"
                  >
                    <option value="">Any Price</option>
                    {priceRanges.map((range, index) => (
                      <option key={index} value={`${range.min}-${range.max}`}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Year
                  </label>
                  <select
                    value={
                      filterOptions.minYear !== undefined && filterOptions.maxYear !== undefined
                        ? `${filterOptions.minYear}-${filterOptions.maxYear}`
                        : ''
                    }
                    onChange={(e) => {
                      if (e.target.value === '') {
                        handleFilterChange('minYear', undefined);
                        handleFilterChange('maxYear', undefined);
                      } else {
                        const [min, max] = e.target.value.split('-').map(Number);
                        handleFilterChange('minYear', min);
                        handleFilterChange('maxYear', max);
                      }
                    }}
                    className="input"
                  >
                    <option value="">Any Year</option>
                    {yearRanges.map((range, index) => (
                      <option key={index} value={`${range.min}-${range.max}`}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Filter */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    value={filterOptions.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search cars..."
                    className="input"
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-secondary-200 mt-4">
                <button
                  onClick={resetFilters}
                  className="flex-1 btn-outline"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarFilters;