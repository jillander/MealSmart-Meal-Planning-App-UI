import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  PlusIcon,
  SearchIcon,
  CheckIcon,
  AlertTriangleIcon,
  ClockIcon,
  FlameIcon,
  ChevronDownIcon,
  Edit2Icon,
  Trash2Icon,
  BarChart2Icon,
  DropletIcon,
  DumbbellIcon } from
'lucide-react';
interface IngredientConfirmationScreenProps {
  navigateTo: (screen: string) => void;
  onConfirm: (ingredients: Ingredient[]) => void;
}
interface Ingredient {
  id: string;
  name: string;
  quantity?: string;
  category: string;
  confidence: number;
  isVerified: boolean;
  freshness: number;
  notes?: string;
  calories?: number;
  nutrition?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  expiresIn?: number;
  isExpanded?: boolean;
}
export const IngredientConfirmationScreen: React.FC<
  IngredientConfirmationScreenProps> =
({ navigateTo, onConfirm }) => {
  // Mock detected ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([
  {
    id: '1',
    name: 'Atlantic Salmon fillet',
    quantity: '1 fillet (approx. 200g / 7oz)',
    category: 'Protein',
    confidence: 0.95,
    isVerified: true,
    freshness: 8,
    notes:
    'Vacuum-sealed package. Vibrant orange color with good marbling, typical of farmed Atlantic salmon. No off odors.',
    calories: 412,
    nutrition: {
      protein: 42,
      carbs: 0,
      fat: 22
    },
    expiresIn: 3
  },
  {
    id: '2',
    name: 'Bell Peppers',
    quantity: '3 medium',
    category: 'Vegetable',
    confidence: 0.92,
    isVerified: true,
    freshness: 9,
    notes: 'Firm, bright color, slight wrinkle on one',
    calories: 30,
    nutrition: {
      protein: 1,
      carbs: 6,
      fat: 0.3
    },
    expiresIn: 5
  },
  {
    id: '3',
    name: 'Brown Rice',
    quantity: '2 cups',
    category: 'Grain',
    confidence: 0.98,
    isVerified: true,
    freshness: 10,
    notes: 'Sealed package, well within expiration date',
    calories: 216,
    nutrition: {
      protein: 5,
      carbs: 45,
      fat: 1.8
    }
  },
  {
    id: '4',
    name: 'Olive Oil',
    quantity: '1 bottle',
    category: 'Oil',
    confidence: 0.88,
    isVerified: false,
    freshness: 10,
    notes: 'New bottle, clear color',
    calories: 120,
    nutrition: {
      protein: 0,
      carbs: 0,
      fat: 14
    }
  },
  {
    id: '5',
    name: 'Garlic',
    quantity: '3 cloves',
    category: 'Vegetable',
    confidence: 0.78,
    isVerified: false,
    freshness: 7,
    notes: 'Firm bulbs, slight sprouting',
    calories: 4,
    nutrition: {
      protein: 0.2,
      carbs: 1,
      fat: 0
    },
    expiresIn: 14
  },
  {
    id: '6',
    name: 'Onions',
    quantity: '2 medium',
    category: 'Vegetable',
    confidence: 0.94,
    isVerified: true,
    freshness: 9,
    notes: 'Firm, no soft spots',
    calories: 44,
    nutrition: {
      protein: 1.2,
      carbs: 10,
      fat: 0.1
    },
    expiresIn: 10
  },
  {
    id: '7',
    name: 'Salt',
    quantity: 'to taste',
    category: 'Seasoning',
    confidence: 0.99,
    isVerified: false,
    freshness: 10,
    notes: '',
    calories: 0,
    nutrition: {
      protein: 0,
      carbs: 0,
      fat: 0
    }
  },
  {
    id: '8',
    name: 'Lemon',
    quantity: '1 medium',
    category: 'Fruit',
    confidence: 0.85,
    isVerified: false,
    freshness: 8,
    notes: 'Fresh, bright yellow',
    calories: 20,
    nutrition: {
      protein: 0.3,
      carbs: 5.4,
      fat: 0.2
    },
    expiresIn: 7
  }]
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showNutritionSummary, setShowNutritionSummary] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<Ingredient | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: 'Other',
    freshness: 10,
    notes: '',
    expiresIn: undefined as number | undefined,
    calories: 0,
    nutrition: {
      protein: 0,
      carbs: 0,
      fat: 0
    }
  });
  // Stats for the summary bar
  const totalIngredients = ingredients.length;
  const verifiedIngredients = ingredients.filter((ing) => ing.isVerified).length;
  const totalCalories = ingredients.reduce(
    (total, ing) => total + (ing.calories || 0),
    0
  );
  // Filtered ingredients based on search - Flat list
  const filteredIngredients = ingredients.filter(
    (ing) =>
    ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ing.quantity &&
    ing.quantity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ing.notes && ing.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Handle ingredient verification
  const toggleVerification = (id: string) => {
    setIngredients((prev) =>
    prev.map((ing) =>
    ing.id === id ?
    {
      ...ing,
      isVerified: !ing.isVerified
    } :
    ing
    )
    );
  };
  // Delete ingredient
  const handleDeleteItem = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };
  // Edit existing ingredient
  const handleEditItem = (ingredient: Ingredient) => {
    setEditingItem(ingredient);
    setNewItem({
      name: ingredient.name,
      quantity: ingredient.quantity || '',
      category: ingredient.category,
      freshness: ingredient.freshness,
      notes: ingredient.notes || '',
      expiresIn: ingredient.expiresIn,
      calories: ingredient.calories || 0,
      nutrition: ingredient.nutrition || {
        protein: 0,
        carbs: 0,
        fat: 0
      }
    });
    setShowAddItem(true);
  };
  // Add new ingredient
  const handleAddItem = () => {
    if (newItem.name.trim()) {
      setIngredients([
      ...ingredients,
      {
        id: Date.now().toString(),
        name: newItem.name,
        quantity: newItem.quantity,
        category: newItem.category,
        confidence: 1,
        isVerified: true,
        freshness: newItem.freshness,
        notes: newItem.notes,
        expiresIn: newItem.expiresIn,
        calories: newItem.calories,
        nutrition: newItem.nutrition
      }]
      );
      setNewItem({
        name: '',
        quantity: '',
        category: 'Other',
        freshness: 10,
        notes: '',
        expiresIn: undefined,
        calories: 0,
        nutrition: {
          protein: 0,
          carbs: 0,
          fat: 0
        }
      });
      setShowAddItem(false);
    }
  };
  // Update edited ingredient
  const handleUpdateItem = () => {
    if (editingItem && newItem.name.trim()) {
      setIngredients(
        ingredients.map((ing) =>
        ing.id === editingItem.id ?
        {
          ...ing,
          name: newItem.name,
          quantity: newItem.quantity,
          category: newItem.category,
          freshness: newItem.freshness,
          notes: newItem.notes,
          expiresIn: newItem.expiresIn,
          calories: newItem.calories,
          nutrition: newItem.nutrition
        } :
        ing
        )
      );
      setNewItem({
        name: '',
        quantity: '',
        category: 'Other',
        freshness: 10,
        notes: '',
        expiresIn: undefined,
        calories: 0,
        nutrition: {
          protein: 0,
          carbs: 0,
          fat: 0
        }
      });
      setEditingItem(null);
      setShowAddItem(false);
    }
  };
  // Category colors for pills
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<
      string,
      {
        bg: string;
        light: string;
        text: string;
      }> =
    {
      Protein: {
        bg: 'bg-rose-500',
        light: 'bg-rose-50',
        text: 'text-rose-600'
      },
      Vegetable: {
        bg: 'bg-emerald-500',
        light: 'bg-emerald-50',
        text: 'text-emerald-600'
      },
      Fruit: {
        bg: 'bg-amber-500',
        light: 'bg-amber-50',
        text: 'text-amber-600'
      },
      Grain: {
        bg: 'bg-amber-700',
        light: 'bg-amber-50',
        text: 'text-amber-700'
      },
      Dairy: {
        bg: 'bg-blue-400',
        light: 'bg-blue-50',
        text: 'text-blue-600'
      },
      Oil: {
        bg: 'bg-purple-400',
        light: 'bg-purple-50',
        text: 'text-purple-600'
      },
      Seasoning: {
        bg: 'bg-indigo-400',
        light: 'bg-indigo-50',
        text: 'text-indigo-600'
      },
      Other: {
        bg: 'bg-gray-500',
        light: 'bg-gray-50',
        text: 'text-gray-600'
      }
    };
    return categoryColors[category] || categoryColors.Other;
  };
  // Categories for new items
  const categories = [
  'Protein',
  'Vegetable',
  'Fruit',
  'Grain',
  'Dairy',
  'Oil',
  'Seasoning',
  'Other'];

  // Calculate total nutrition
  const totalNutrition = ingredients.reduce(
    (acc, ing) => {
      if (ing.nutrition) {
        acc.protein += ing.nutrition.protein;
        acc.carbs += ing.nutrition.carbs;
        acc.fat += ing.nutrition.fat;
      }
      return acc;
    },
    {
      protein: 0,
      carbs: 0,
      fat: 0
    }
  );
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-[430px] mx-auto">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A]">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-30">
        <button
          onClick={() => navigateTo('ingredient-capture')}
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back">
          
          <ArrowLeftIcon size={20} />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold text-gray-900">
            Review Ingredients
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            {totalIngredients} items detected
          </p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setNewItem({
              name: '',
              quantity: '',
              category: 'Other',
              freshness: 10,
              notes: '',
              expiresIn: undefined,
              calories: 0,
              nutrition: {
                protein: 0,
                carbs: 0,
                fat: 0
              }
            });
            setShowAddItem(true);
          }}
          className="w-8 h-8 flex items-center justify-center text-white bg-[#4CAF50] hover:bg-[#43A047] rounded-full transition-colors shadow-sm"
          aria-label="Add ingredient">
          
          <PlusIcon size={18} />
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white sticky top-[65px] z-20">
        <div className="relative">
          <SearchIcon
            size={16}
            className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:bg-white transition-all" />
          
        </div>
      </div>

      {/* Single-line Stats Summary */}
      <div className="px-4 pb-3 bg-white border-b border-gray-100">
        <p className="text-xs text-gray-500 font-medium text-center">
          {verifiedIngredients} of {totalIngredients} verified · {totalCalories}{' '}
          total cal
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        {filteredIngredients.length === 0 ?
        <div className="flex flex-col items-center justify-center h-40 text-center mt-8">
            <p className="text-gray-500 mb-3 text-sm">
              No ingredients match your search
            </p>
            <button
            onClick={() => {
              setSearchTerm('');
              setEditingItem(null);
              setNewItem({
                name: '',
                quantity: '',
                category: 'Other',
                freshness: 10,
                notes: '',
                expiresIn: undefined,
                calories: 0,
                nutrition: {
                  protein: 0,
                  carbs: 0,
                  fat: 0
                }
              });
              setShowAddItem(true);
            }}
            className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors bg-green-50 px-4 py-2 rounded-full">
            
              <PlusIcon size={16} className="mr-1" />
              Add new ingredient
            </button>
          </div> :

        <div className="space-y-3">
            {filteredIngredients.map((ingredient) =>
          <div
            key={ingredient.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            
                {/* Top Row: Name & Category */}
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
                    {ingredient.name}
                  </h3>
                  <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ml-2 shrink-0 ${getCategoryColor(ingredient.category).light} ${getCategoryColor(ingredient.category).text}`}>
                
                    {ingredient.category}
                  </span>
                </div>

                {/* Quantity */}
                {ingredient.quantity &&
            <p className="text-xs text-gray-500 mb-3">
                    {ingredient.quantity}
                  </p>
            }

                {/* Middle Row: Minimal Info Chips */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <FlameIcon size={12} className="mr-1" />
                    <span>{ingredient.calories || 0} cal</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <DumbbellIcon size={12} className="mr-1" />
                    <span>{ingredient.nutrition?.protein || 0}g protein</span>
                  </div>
                  {ingredient.expiresIn !== undefined &&
              <div className="flex items-center text-xs text-gray-500">
                      <ClockIcon size={12} className="mr-1" />
                      <span>{ingredient.expiresIn}d left</span>
                    </div>
              }
                </div>

                {/* Bottom Row: Verification & Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <button
                onClick={() => toggleVerification(ingredient.id)}
                className="flex items-center">
                
                    {ingredient.isVerified ?
                <>
                        <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center mr-1.5">
                          <CheckIcon size={12} className="text-green-600" />
                        </div>
                        <span className="text-xs font-medium text-green-600">
                          Verified
                        </span>
                      </> :

                <>
                        <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center mr-1.5">
                          <AlertTriangleIcon
                      size={12}
                      className="text-amber-600" />
                    
                        </div>
                        <span className="text-xs font-medium text-amber-600">
                          Needs review
                        </span>
                      </>
                }
                  </button>

                  <div className="flex space-x-1">
                    <button
                  onClick={() => handleEditItem(ingredient)}
                  className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                  aria-label="Edit ingredient">
                  
                      <Edit2Icon size={14} />
                    </button>
                    <button
                  onClick={() => handleDeleteItem(ingredient.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                  aria-label="Delete ingredient">
                  
                      <Trash2Icon size={14} />
                    </button>
                  </div>
                </div>
              </div>
          )}
          </div>
        }

        {/* Expanded Nutrition Summary (Inline, not fixed) */}
        {showNutritionSummary &&
        <div className="mt-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Nutrition Summary
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-green-50 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-gray-500 mb-0.5">Protein</p>
                <p className="text-lg font-bold text-green-600">
                  {Math.round(totalNutrition.protein)}g
                </p>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-gray-500 mb-0.5">Carbs</p>
                <p className="text-lg font-bold text-amber-600">
                  {Math.round(totalNutrition.carbs)}g
                </p>
              </div>
              <div className="bg-blue-50 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-gray-500 mb-0.5">Fat</p>
                <p className="text-lg font-bold text-blue-600">
                  {Math.round(totalNutrition.fat)}g
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-xs font-medium text-gray-600 mb-1.5">
                Macro Ratio
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
                <div
                className="bg-green-500 h-full"
                style={{
                  width: `${totalNutrition.protein * 4 * 100 / Math.max(1, totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
                }}>
              </div>
                <div
                className="bg-amber-500 h-full"
                style={{
                  width: `${totalNutrition.carbs * 4 * 100 / Math.max(1, totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
                }}>
              </div>
                <div
                className="bg-blue-500 h-full"
                style={{
                  width: `${totalNutrition.fat * 9 * 100 / Math.max(1, totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
                }}>
              </div>
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-gray-500">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                  Protein
                </span>
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1"></span>
                  Carbs
                </span>
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                  Fat
                </span>
              </div>
            </div>
          </div>
        }

        {/* Action Buttons (Inline, at the bottom of scrollable content) */}
        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setShowNutritionSummary(!showNutritionSummary)}
            className={`py-3.5 rounded-2xl font-medium flex items-center justify-center transition-all w-[35%] text-sm ${showNutritionSummary ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}>
            
            <BarChart2Icon size={16} className="mr-1.5" />
            Nutrition
          </button>
          <button
            onClick={() => {
              onConfirm(ingredients);
              navigateTo('recipe-loading');
            }}
            className="py-3.5 bg-[#1A1A1A] text-white rounded-2xl font-semibold hover:bg-black flex items-center justify-center shadow-sm transition-all w-[65%] text-sm">
            
            <CheckIcon size={18} className="mr-1.5" />
            Find Recipes ({totalIngredients})
          </button>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {showAddItem &&
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                {editingItem ? 'Edit Ingredient' : 'Add Ingredient'}
              </h2>
              <button
              onClick={() => {
                setShowAddItem(false);
                setEditingItem(null);
              }}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              
                <ChevronDownIcon size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredient Name
                </label>
                <input
                type="text"
                value={newItem.name}
                onChange={(e) =>
                setNewItem({
                  ...newItem,
                  name: e.target.value
                })
                }
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm"
                placeholder="Enter ingredient name" />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                type="text"
                value={newItem.quantity}
                onChange={(e) =>
                setNewItem({
                  ...newItem,
                  quantity: e.target.value
                })
                }
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm"
                placeholder="e.g., 2 cups, 500g" />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {categories.map((category) =>
                <button
                  key={category}
                  onClick={() =>
                  setNewItem({
                    ...newItem,
                    category
                  })
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${newItem.category === category ? `${getCategoryColor(category).bg} text-white` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  
                      {category}
                    </button>
                )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Freshness
                </label>
                <input
                type="range"
                min="1"
                max="5"
                value={Math.round(newItem.freshness / 2)}
                onChange={(e) =>
                setNewItem({
                  ...newItem,
                  freshness: parseInt(e.target.value) * 2
                })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4CAF50]" />
              
                <div className="flex justify-between mt-1">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) =>
                  <DropletIcon
                    key={star}
                    size={12}
                    className={`${star <= Math.round(newItem.freshness / 2) ? 'text-emerald-500 fill-emerald-500' : 'text-gray-300'} ${star > 1 ? 'ml-0.5' : ''}`} />

                  )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.round(newItem.freshness / 2)}/5
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expires In (days)
                  </label>
                  <input
                  type="number"
                  value={newItem.expiresIn || ''}
                  onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    expiresIn: e.target.value ?
                    parseInt(e.target.value) :
                    undefined
                  })
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm"
                  placeholder="Days" />
                
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                  type="number"
                  value={newItem.calories || ''}
                  onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    calories: parseInt(e.target.value) || 0
                  })
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm"
                  placeholder="kcal" />
                
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nutrition
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">
                      Protein (g)
                    </label>
                    <input
                    type="number"
                    value={newItem.nutrition.protein || ''}
                    onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      nutrition: {
                        ...newItem.nutrition,
                        protein: parseFloat(e.target.value) || 0
                      }
                    })
                    }
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm" />
                  
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">
                      Carbs (g)
                    </label>
                    <input
                    type="number"
                    value={newItem.nutrition.carbs || ''}
                    onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      nutrition: {
                        ...newItem.nutrition,
                        carbs: parseFloat(e.target.value) || 0
                      }
                    })
                    }
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm" />
                  
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">
                      Fat (g)
                    </label>
                    <input
                    type="number"
                    value={newItem.nutrition.fat || ''}
                    onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      nutrition: {
                        ...newItem.nutrition,
                        fat: parseFloat(e.target.value) || 0
                      }
                    })
                    }
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm" />
                  
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                value={newItem.notes || ''}
                onChange={(e) =>
                setNewItem({
                  ...newItem,
                  notes: e.target.value
                })
                }
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent min-h-[70px] text-sm"
                placeholder="Appearance, texture, etc." />
              
              </div>
              <button
              onClick={editingItem ? handleUpdateItem : handleAddItem}
              className="w-full py-3 bg-[#4CAF50] text-white rounded-xl font-semibold mt-2 hover:bg-[#43A047] transition-colors text-sm">
              
                {editingItem ? 'Update Ingredient' : 'Add Ingredient'}
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

};