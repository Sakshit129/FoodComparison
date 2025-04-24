import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { Search, X, Filter, TrendingUp } from 'lucide-react';
import { mockResults } from '../utils/mockData';

const SearchPage = () => {
  const navigate = useNavigate();
  const { searchQuery, updateSearchQuery, updateResults } = useSearch();
  const [query, setQuery] = useState(searchQuery || '');
  const [isSearching, setIsSearching] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cuisineFilters, setCuisineFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const popularSearches = [
    'Butter Chicken', 'Pizza', 'Biryani', 'Chinese', 'Burger',
    'Dosa', 'North Indian', 'South Indian', 'Italian', 'Desserts'
  ];

  const cuisines = [
    'North Indian', 'South Indian', 'Chinese', 'Italian', 
    'Mexican', 'Fast Food', 'Desserts', 'Beverages'
  ];

  useEffect(() => {
    setQuery(searchQuery || '');
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    updateSearchQuery(query);
    
    // Simulate API call delay
    setTimeout(() => {
      updateResults(mockResults);
      setIsSearching(false);
      navigate('/results');
    }, 1500);
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    updateSearchQuery(term);
    
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      updateResults(mockResults);
      setIsSearching(false);
      navigate('/results');
    }, 1500);
  };

  const toggleCuisineFilter = (cuisine: string) => {
    if (cuisineFilters.includes(cuisine)) {
      setCuisineFilters(cuisineFilters.filter(c => c !== cuisine));
    } else {
      setCuisineFilters([...cuisineFilters, cuisine]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-[80vh]">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by dish, restaurant, or cuisine..."
              className="w-full py-3 pl-10 pr-20 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] shadow-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button
                type="button"
                onClick={() => setFilterOpen(!filterOpen)}
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
              >
                <Filter size={20} className="text-gray-600" />
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF5A5F] to-[#FC8019] text-white py-1.5 px-4 rounded-full hover:shadow-md transition disabled:opacity-70"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching...</span>
                  </div>
                ) : 'Compare'}
              </button>
            </div>
          </div>
        </form>

        {/* Filters */}
        {filterOpen && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Cuisines</h4>
              <div className="flex flex-wrap gap-2">
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => toggleCuisineFilter(cuisine)}
                    className={`text-sm rounded-full px-3 py-1 transition ${
                      cuisineFilters.includes(cuisine)
                        ? 'bg-[#FF5A5F] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <div className="px-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5A5F]"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                className="bg-gradient-to-r from-[#FF5A5F] to-[#FC8019] text-white py-2 px-4 rounded-full hover:shadow-md transition"
                onClick={() => setFilterOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Popular and Trending Searches */}
        <div>
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Search size={16} className="text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold">Popular Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  className="bg-white border border-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-50 transition"
                  onClick={() => handlePopularSearch(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <TrendingUp size={16} className="text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold">Trending Now</h2>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Chicken Biryani', trend: '+15% searches today' },
                { name: 'Pizza', trend: '+8% searches today' },
                { name: 'Burgers', trend: '+5% searches today' }
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition text-left"
                  onClick={() => handlePopularSearch(item.name)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-green-600 flex items-center">
                      <TrendingUp size={14} className="mr-1" />
                      {item.trend}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;