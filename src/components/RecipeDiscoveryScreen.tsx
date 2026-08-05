import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  PlayIcon,
  PauseIcon,
  CalendarIcon,
  BookmarkIcon,
  HeartIcon,
  ChevronDownIcon,
  ShareIcon,
  ClockIcon,
  ChefHatIcon,
  SearchIcon,
  ActivityIcon,
  TimerIcon,
  PackageIcon,
  DumbbellIcon,
  UtensilsIcon,
  SnowflakeIcon,
  SlidersHorizontalIcon,
  FlameIcon,
  XIcon } from
'lucide-react';
import { useInView } from 'react-intersection-observer';
import { discoverRecipes } from '../data/discoverRecipes';
import { applyDiscoverFilters, formatDuration } from '../utils/discoverFilters';
import { countActiveFilters, emptyFilters } from '../types/discover';
import type { DiscoverFilters, DiscoverRecipe } from '../types/discover';
import { DiscoverFilterSheet } from './discover/DiscoverFilterSheet';
import { ActiveFilterBar } from './discover/ActiveFilterBar';

type Recipe = DiscoverRecipe;

interface RecipeDiscoveryScreenProps {
  navigateTo: (screen: string) => void;
}
interface CollectionShortcut {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}
export const RecipeDiscoveryScreen: React.FC<RecipeDiscoveryScreenProps> = ({
  navigateTo
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>(discoverRecipes);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<DiscoverFilters>(emptyFilters);
  const [draftFilters, setDraftFilters] = useState<DiscoverFilters>(emptyFilters);
  const [showFilters, setShowFilters] = useState(false);

  // Collections are a shortcut on top of the same filter model.
  const collectionMatched = useMemo(
    () =>
    selectedCollection ?
    recipes.filter((recipe) => recipe.collections.includes(selectedCollection)) :
    recipes,
    [recipes, selectedCollection]
  );
  const visibleRecipes = useMemo(
    () => applyDiscoverFilters(collectionMatched, filters, query),
    [collectionMatched, filters, query]
  );
  const draftCount = useMemo(
    () => applyDiscoverFilters(collectionMatched, draftFilters, query).length,
    [collectionMatched, draftFilters, query]
  );
  const activeCount = countActiveFilters(filters);
  const clearEverything = () => {
    setFilters(emptyFilters);
    setDraftFilters(emptyFilters);
    setSelectedCollection(null);
    setQuery('');
  };
  const collections: CollectionShortcut[] = [
  {
    id: 'macros',
    label: 'Hit my macros',
    icon: <ActivityIcon size={24} className="text-orange-600" />,
    color: 'bg-orange-100'
  },
  {
    id: 'under-20',
    label: 'Under 20 minutes',
    icon: <TimerIcon size={24} className="text-blue-600" />,
    color: 'bg-blue-100'
  },
  {
    id: 'meal-prep',
    label: 'Meal prep staples',
    icon: <PackageIcon size={24} className="text-green-600" />,
    color: 'bg-green-100'
  },
  {
    id: 'high-protein',
    label: 'High protein dinners',
    icon: <DumbbellIcon size={24} className="text-purple-600" />,
    color: 'bg-purple-100'
  },
  {
    id: 'one-pan',
    label: 'One-pan / one-pot',
    icon: <UtensilsIcon size={24} className="text-red-600" />,
    color: 'bg-red-100'
  },
  {
    id: 'freezer',
    label: 'Freezer-friendly',
    icon: <SnowflakeIcon size={24} className="text-cyan-600" />,
    color: 'bg-cyan-100'
  }];

  const toggleLike = (recipeId: string) => {
    setRecipes(
      recipes.map((recipe) =>
      recipe.id === recipeId ?
      {
        ...recipe,
        liked: !recipe.liked,
        likes: recipe.liked ? recipe.likes - 1 : recipe.likes + 1
      } :
      recipe
      )
    );
  };
  const toggleSave = (recipeId: string) => {
    setRecipes(
      recipes.map((recipe) =>
      recipe.id === recipeId ?
      {
        ...recipe,
        saved: !recipe.saved
      } :
      recipe
      )
    );
  };
  const RecipeCard: React.FC<{
    recipe: Recipe;
  }> = ({ recipe }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { ref, inView } = useInView({
      threshold: 0.7
    });
    useEffect(() => {
      if (videoRef.current) {
        if (inView) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }, [inView]);
    return (
      <div
        ref={ref}
        className="bg-white rounded-2xl overflow-hidden mb-6 shadow-sm">
        
        {/* Creator Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img
              src={recipe.creator.avatar}
              alt={recipe.creator.name}
              className="w-10 h-10 rounded-full object-cover" />
            
            <div className="ml-3">
              <p className="font-medium text-[#1A1A1A]">
                {recipe.creator.name}
              </p>
              <p className="text-xs text-[#757575]">Recipe Creator</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedRecipe(recipe)}
            className="text-[#4CAF50]">
            
            <ChevronDownIcon size={20} />
          </button>
        </div>

        {/* Video/Thumbnail Container */}
        <div className="relative aspect-[4/5] bg-black">
          <video
            ref={videoRef}
            poster={recipe.thumbnail}
            loop
            muted
            playsInline
            className="w-full h-full object-cover">
            
            <source src={recipe.video} type="video/mp4" />
          </video>
          <button
            onClick={() => {
              if (videoRef.current) {
                if (isPlaying) {
                  videoRef.current.pause();
                } else {
                  videoRef.current.play();
                }
                setIsPlaying(!isPlaying);
              }
            }}
            className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
            
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>

          {/* Recipe Quick Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h2 className="text-white font-medium text-lg mb-2">
              {recipe.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center text-white">
                <ClockIcon size={16} className="mr-1" />
                <span className="text-sm">{formatDuration(recipe.timeMinutes)}</span>
              </div>
              <div className="flex items-center text-white">
                <ChefHatIcon size={16} className="mr-1" />
                <span className="text-sm">{recipe.difficulty}</span>
              </div>
              <div className="flex items-center text-white">
                <FlameIcon size={16} className="mr-1" />
                <span className="text-sm">{recipe.calories} kcal</span>
              </div>
              <div className="flex items-center text-white">
                <DumbbellIcon size={16} className="mr-1" />
                <span className="text-sm">{recipe.protein}g protein</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleLike(recipe.id)}
              className="flex items-center space-x-1">
              
              <HeartIcon
                size={24}
                className={`${recipe.liked ? 'text-red-500 fill-red-500' : 'text-[#1A1A1A]'} transition-colors`} />
              
              <span className="text-sm font-medium">
                {recipe.likes.toLocaleString()}
              </span>
            </button>
            <button
              onClick={() => {
                setSelectedRecipe(recipe);
                setShowSchedule(true);
              }}
              className="flex items-center space-x-1">
              
              <CalendarIcon size={24} className="text-[#1A1A1A]" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => toggleSave(recipe.id)}>
              <BookmarkIcon
                size={24}
                className={`${recipe.saved ? 'text-[#4CAF50] fill-[#4CAF50]' : 'text-[#1A1A1A]'} transition-colors`} />
              
            </button>
            <button>
              <ShareIcon size={24} className="text-[#1A1A1A]" />
            </button>
          </div>
        </div>
      </div>);

  };
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Header Content (Scrollable) */}
      <div className="bg-white px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">
          Discover Recipes
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search recipes"
            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
            placeholder="Search recipes, ingredients..." />
          
          {query &&
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#1A1A1A]">
            
              <XIcon size={18} />
            </button>
          }
        </div>

        {/* Collections Grid */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">
            Collections
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {collections.map((collection) => {
              const isSelected = selectedCollection === collection.id;
              const count = recipes.filter((recipe) =>
              recipe.collections.includes(collection.id)
              ).length;
              return (
                <button
                  key={collection.id}
                  onClick={() =>
                  setSelectedCollection(isSelected ? null : collection.id)
                  }
                  className={`
                    flex flex-col items-center p-4 rounded-xl border transition-all duration-200 active:scale-95
                    ${isSelected ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'}
                  `}>
                  
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${collection.color}`}>
                    
                    {collection.icon}
                  </div>
                  <span
                    className={`text-sm text-center ${isSelected ? 'font-semibold text-blue-900' : 'font-medium text-gray-700'}`}>
                    
                    {collection.label}
                  </span>
                  <span className="mt-1 text-xs text-[#94A3B8]">
                    {count} {count === 1 ? 'recipe' : 'recipes'}
                  </span>
                </button>);

            })}
          </div>
        </div>
      </div>

      {/* Sticky Filters */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 px-6 py-3">
          <button
            type="button"
            onClick={() => {
              setDraftFilters(filters);
              setShowFilters(true);
            }}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
            activeCount > 0 ?
            'bg-[#1A1A1A] text-white' :
            'bg-gray-100 text-[#1A1A1A] hover:bg-gray-200'}`
            }>
            
            <SlidersHorizontalIcon size={16} />
            Filters
            {activeCount > 0 &&
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4CAF50] px-1.5 text-[11px] font-extrabold text-white">
                {activeCount}
              </span>
            }
          </button>
          <p className="truncate text-sm text-[#757575]">
            {visibleRecipes.length} {visibleRecipes.length === 1 ? 'recipe' : 'recipes'}
            {selectedCollection ? ' in this collection' : ''}
          </p>
        </div>
        <ActiveFilterBar
          filters={filters}
          onChange={(next) => {
            setFilters(next);
            setDraftFilters(next);
          }}
          onClearAll={() => {
            setFilters(emptyFilters);
            setDraftFilters(emptyFilters);
          }} />
        
      </div>

      {/* Recipe Feed */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {visibleRecipes.length === 0 ?
        <div className="flex flex-col items-center pt-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">🍳</div>
            <h2 className="mt-5 text-xl font-bold text-[#1A1A1A]">No recipes match</h2>
            <p className="mt-2 max-w-[290px] text-sm leading-relaxed text-[#757575]">
              Try loosening a filter — dietary needs and time limits narrow things down fastest.
            </p>
            <button
            type="button"
            onClick={clearEverything}
            className="mt-6 rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2A2A2A]">
            
              Clear all filters
            </button>
          </div> :

        visibleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        }
      </div>

      <DiscoverFilterSheet
        open={showFilters}
        filters={filters}
        previewCount={draftCount}
        onPreview={setDraftFilters}
        onApply={(next) => {
          setFilters(next);
          setDraftFilters(next);
          setShowFilters(false);
        }}
        onClose={() => setShowFilters(false)} />
      

      {/* Quick Schedule Modal */}
      {showSchedule && selectedRecipe &&
      <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up">
            <h3 className="text-lg font-bold mb-4">
              Schedule {selectedRecipe.title}
            </h3>
            <div className="space-y-4 mb-6">
              {['Breakfast', 'Lunch', 'Dinner'].map((mealType) =>
            <button
              key={mealType}
              onClick={() => {
                setShowSchedule(false);
                navigateTo('meal-prep');
              }}
              className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-all">
              
                  <span className="font-medium">{mealType}</span>
                  <ChevronDownIcon size={20} className="text-[#4CAF50]" />
                </button>
            )}
            </div>
            <button
            onClick={() => setShowSchedule(false)}
            className="w-full py-3 bg-[#4CAF50] text-white rounded-full font-medium">
            
              Cancel
            </button>
          </div>
        </div>
      }
    </div>);

};