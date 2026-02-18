import React, { useEffect, useState, useRef } from 'react';
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
  SnowflakeIcon } from
'lucide-react';
import { useInView } from 'react-intersection-observer';
interface Recipe {
  id: string;
  title: string;
  video: string;
  thumbnail: string;
  duration: string;
  difficulty: string;
  likes: number;
  saved: boolean;
  liked: boolean;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  description: string;
}
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
  const [recipes, setRecipes] = useState<Recipe[]>([
  {
    id: '1',
    title: '15-Minute Healthy Breakfast Bowl',
    video: 'https://example.com/video1.mp4',
    thumbnail:
    'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '15 min',
    difficulty: 'Easy',
    likes: 1234,
    saved: false,
    liked: false,
    creator: {
      name: 'HealthyEats',
      avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    description:
    'Start your day right with this nutritious and delicious breakfast bowl! Packed with protein and healthy fats.'
  },
  {
    id: '2',
    title: 'One-Pan Chicken Stir Fry',
    video: 'https://example.com/video2.mp4',
    thumbnail:
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    duration: '20 min',
    difficulty: 'Medium',
    likes: 2567,
    saved: false,
    liked: false,
    creator: {
      name: 'QuickMeals',
      avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      verified: true
    },
    description:
    "A quick and easy weeknight dinner that's packed with vegetables and protein. Perfect for meal prep!"
  }]
  );
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeCategory, setActiveCategory] = useState('For You');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const categories = [
  'For You',
  'Trending',
  'Quick & Easy',
  'Healthy',
  'Vegetarian',
  'Desserts'];

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
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-white">
                <ClockIcon size={16} className="mr-1" />
                <span className="text-sm">{recipe.duration}</span>
              </div>
              <div className="flex items-center text-white">
                <ChefHatIcon size={16} className="mr-1" />
                <span className="text-sm">{recipe.difficulty}</span>
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
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
            placeholder="Search recipes, ingredients..." />

        </div>

        {/* Collections Grid */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">
            Collections
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {collections.map((collection) => {
              const isSelected = selectedCollection === collection.id;
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
                </button>);

            })}
          </div>
        </div>
      </div>

      {/* Sticky Filters */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="px-6 py-3">
          <div className="flex overflow-x-auto space-x-2 scrollbar-hide">
            {categories.map((category) =>
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === category ? 'bg-[#4CAF50] text-white shadow-md' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>

                {category}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recipe Feed */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {recipes.map((recipe) =>
        <RecipeCard key={recipe.id} recipe={recipe} />
        )}
      </div>

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