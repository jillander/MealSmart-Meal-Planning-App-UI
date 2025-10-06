import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeftIcon, PlusIcon, XIcon, CheckIcon, SearchIcon, Edit2Icon, AlertTriangleIcon, CheckCircleIcon, CircleDotIcon, ClipboardIcon, MoreVerticalIcon, GripIcon, ChevronDownIcon, ChevronUpIcon, ShieldCheckIcon, ShoppingBagIcon, ThermometerIcon, ClockIcon, ScaleIcon, InfoIcon, BarChart2Icon } from 'lucide-react';
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
  isEditing?: boolean;
  freshness: number;
  notes?: string;
  alternativeSuggestions?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  expiresIn?: number;
  isExpanded?: boolean;
  isDragging?: boolean;
}
export const IngredientConfirmationScreen: React.FC<IngredientConfirmationScreenProps> = ({
  navigateTo,
  onConfirm
}) => {
  // Mock detected ingredients - in real app, this would come from props
  const [ingredients, setIngredients] = useState<Ingredient[]>([{
    id: '1',
    name: 'Chicken Breast',
    quantity: '2 pieces',
    category: 'Proteins',
    confidence: 0.95,
    freshness: 9,
    notes: 'Fresh, pink color, no discoloration',
    expiresIn: 3,
    nutritionInfo: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6
    }
  }, {
    id: '2',
    name: 'Bell Peppers',
    quantity: '3',
    category: 'Vegetables',
    confidence: 0.92,
    freshness: 8,
    notes: 'Firm, bright color, slight wrinkle on one',
    expiresIn: 5,
    nutritionInfo: {
      calories: 30,
      protein: 1,
      carbs: 6,
      fat: 0.3
    }
  }, {
    id: '3',
    name: 'Brown Rice',
    quantity: '2 cups',
    category: 'Grains',
    confidence: 0.98,
    freshness: 10,
    notes: 'Sealed package, well within expiration date',
    expiresIn: 180,
    nutritionInfo: {
      calories: 216,
      protein: 5,
      carbs: 45,
      fat: 1.8
    }
  }, {
    id: '4',
    name: 'Olive Oil',
    quantity: '1 bottle',
    category: 'Oils & Condiments',
    confidence: 0.88,
    freshness: 10,
    notes: 'New bottle, clear color',
    expiresIn: 365,
    nutritionInfo: {
      calories: 120,
      protein: 0,
      carbs: 0,
      fat: 14
    },
    alternativeSuggestions: ['Vegetable Oil', 'Avocado Oil', 'Coconut Oil']
  }, {
    id: '5',
    name: 'Garlic',
    quantity: '3 cloves',
    category: 'Vegetables',
    confidence: 0.78,
    freshness: 7,
    notes: 'Firm bulbs, slight sprouting',
    expiresIn: 14,
    alternativeSuggestions: ['Garlic Powder', 'Shallots', 'Onions'],
    nutritionInfo: {
      calories: 4,
      protein: 0.2,
      carbs: 1,
      fat: 0
    }
  }, {
    id: '6',
    name: 'Spinach',
    quantity: '1 bag',
    category: 'Vegetables',
    confidence: 0.94,
    freshness: 9,
    notes: 'Fresh, dark green leaves',
    expiresIn: 4,
    nutritionInfo: {
      calories: 7,
      protein: 0.9,
      carbs: 1.1,
      fat: 0.1
    }
  }, {
    id: '7',
    name: 'Salmon',
    quantity: '1 filet',
    category: 'Proteins',
    confidence: 0.68,
    freshness: 8,
    notes: 'Pink color, slight fishy smell',
    expiresIn: 2,
    alternativeSuggestions: ['Trout', 'Tilapia', 'Cod'],
    nutritionInfo: {
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13
    }
  }, {
    id: '8',
    name: 'Greek Yogurt',
    quantity: '500g container',
    category: 'Dairy',
    confidence: 0.89,
    freshness: 9,
    notes: 'Sealed, well within date',
    expiresIn: 7,
    nutritionInfo: {
      calories: 100,
      protein: 10,
      carbs: 4,
      fat: 5
    }
  }, {
    id: '9',
    name: 'Almonds',
    quantity: '1 cup',
    category: 'Nuts & Seeds',
    confidence: 0.93,
    freshness: 10,
    notes: 'Sealed package',
    expiresIn: 90,
    nutritionInfo: {
      calories: 162,
      protein: 6,
      carbs: 6,
      fat: 14
    }
  }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showNutritionPanel, setShowNutritionPanel] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Ingredient | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: 'Other',
    freshness: 10,
    notes: ''
  });
  const [editingItem, setEditingItem] = useState<Ingredient | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  // Ref for header element to track sticky positioning
  const headerRef = useRef<HTMLDivElement>(null);
  const [stickyHeaderVisible, setStickyHeaderVisible] = useState(false);
  // Common ingredients for quick add
  const quickAddIngredients = ['Onions', 'Tomatoes', 'Eggs', 'Milk', 'Bread', 'Cheese', 'Potatoes', 'Pasta'];
  // Category colors
  const categoryColors: Record<string, string> = {
    Vegetables: 'bg-green-500',
    Fruits: 'bg-orange-500',
    Proteins: 'bg-red-500',
    Dairy: 'bg-blue-500',
    Grains: 'bg-amber-500',
    'Oils & Condiments': 'bg-purple-500',
    'Nuts & Seeds': 'bg-yellow-500',
    Other: 'bg-gray-500'
  };
  // Stats calculation
  const totalIngredients = ingredients.length;
  const verifiedIngredients = ingredients.filter(ing => ing.confidence >= 0.9).length;
  const needsReviewIngredients = ingredients.filter(ing => ing.confidence < 0.9).length;
  const expiringIngredients = ingredients.filter(ing => ing.expiresIn !== undefined && ing.expiresIn <= 3).length;
  // Simulate haptic feedback
  const triggerHapticFeedback = () => {
    // In a real app, we would use a native bridge for haptics
    console.log('Haptic feedback triggered');
  };
  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };
  const handleAddItem = () => {
    if (newItem.name) {
      setIngredients([...ingredients, {
        id: Date.now().toString(),
        name: newItem.name,
        quantity: newItem.quantity,
        category: newItem.category,
        confidence: 1,
        freshness: newItem.freshness,
        notes: newItem.notes,
        expiresIn: 7,
        nutritionInfo: {
          calories: 100,
          protein: 5,
          carbs: 10,
          fat: 2
        }
      }]);
      setNewItem({
        name: '',
        quantity: '',
        category: 'Other',
        freshness: 10,
        notes: ''
      });
      setShowAddItem(false);
    }
  };
  const handleQuickAdd = (ingredientName: string) => {
    setIngredients([...ingredients, {
      id: Date.now().toString(),
      name: ingredientName,
      category: 'Other',
      confidence: 1,
      freshness: 10,
      expiresIn: 7,
      nutritionInfo: {
        calories: 100,
        protein: 5,
        carbs: 10,
        fat: 2
      }
    }]);
    triggerHapticFeedback();
  };
  const handleEditItem = (ingredient: Ingredient) => {
    setEditingItem(ingredient);
    setNewItem({
      name: ingredient.name,
      quantity: ingredient.quantity || '',
      category: ingredient.category,
      freshness: ingredient.freshness,
      notes: ingredient.notes || ''
    });
    setShowAddItem(true);
  };
  const handleUpdateItem = () => {
    if (editingItem && newItem.name) {
      setIngredients(ingredients.map(ing => ing.id === editingItem.id ? {
        ...ing,
        name: newItem.name,
        quantity: newItem.quantity,
        category: newItem.category,
        freshness: newItem.freshness,
        notes: newItem.notes
      } : ing));
      setNewItem({
        name: '',
        quantity: '',
        category: 'Other',
        freshness: 10,
        notes: ''
      });
      setEditingItem(null);
      setShowAddItem(false);
    }
  };
  const handleToggleExpand = (id: string) => {
    setIngredients(ingredients.map(ing => ing.id === id ? {
      ...ing,
      isExpanded: !ing.isExpanded
    } : ing));
  };
  const handleStartDrag = (ingredient: Ingredient) => {
    setDraggedItem(ingredient);
    setIngredients(ingredients.map(ing => ing.id === ingredient.id ? {
      ...ing,
      isDragging: true
    } : ing));
    triggerHapticFeedback();
  };
  const handleEndDrag = () => {
    setIngredients(ingredients.map(ing => ing.isDragging ? {
      ...ing,
      isDragging: false
    } : ing));
    setDraggedItem(null);
  };
  const handleSelectAlternative = (ingredientId: string, alternativeName: string) => {
    setIngredients(ingredients.map(ing => ing.id === ingredientId ? {
      ...ing,
      name: alternativeName,
      confidence: 1 // Set confidence to 100% for manually selected
    } : ing));
    triggerHapticFeedback();
  };
  const filteredIngredients = ingredients.filter(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase()) || ing.quantity && ing.quantity.toLowerCase().includes(searchTerm.toLowerCase()) || ing.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const groupedIngredients = filteredIngredients.reduce((acc, ing) => {
    if (!acc[ing.category]) {
      acc[ing.category] = [];
    }
    acc[ing.category].push(ing);
    return acc;
  }, {} as Record<string, Ingredient[]>);
  const categories = ['Vegetables', 'Fruits', 'Proteins', 'Dairy', 'Grains', 'Oils & Condiments', 'Nuts & Seeds', 'Other'];
  // Helper function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0.9 || score >= 9) return 'text-green-500';
    if (score >= 0.7 || score >= 7) return 'text-yellow-500';
    return 'text-red-500';
  };
  // Helper function to get background color based on score
  const getScoreBackground = (score: number) => {
    if (score >= 0.9 || score >= 9) return 'bg-green-500';
    if (score >= 0.7 || score >= 7) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  // Calculate total nutrition
  const totalNutrition = ingredients.reduce((acc, ing) => {
    if (ing.nutritionInfo) {
      acc.calories += ing.nutritionInfo.calories;
      acc.protein += ing.nutritionInfo.protein;
      acc.carbs += ing.nutritionInfo.carbs;
      acc.fat += ing.nutritionInfo.fat;
    }
    return acc;
  }, {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  // Track scroll position for sticky headers
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const {
          top
        } = headerRef.current.getBoundingClientRect();
        setStickyHeaderVisible(top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A]">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>
      {/* Elevated App Bar with Shadow */}
      <header className="bg-white px-6 py-4 border-b border-gray-100 shadow-md sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigateTo('ingredient-capture')} className="mr-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200" aria-label="Go back">
              <ArrowLeftIcon size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Ingredient Review</h1>
              <p className="text-sm text-[#64748B]">
                {totalIngredients} items detected
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={() => {
            setEditingItem(null);
            setNewItem({
              name: '',
              quantity: '',
              category: 'Other',
              freshness: 10,
              notes: ''
            });
            setShowAddItem(true);
          }} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4CAF50] text-white shadow-sm hover:shadow-md transition-all duration-200 mr-2" aria-label="Add ingredient">
              <PlusIcon size={20} />
            </button>
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200" aria-label="More options">
                <MoreVerticalIcon size={20} />
              </button>
              {showMenu && <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50 overflow-hidden animate-scale-in">
                  <div className="py-1">
                    <button onClick={() => {
                  setShowMenu(false);
                  // Sort by confidence
                  setIngredients([...ingredients].sort((a, b) => b.confidence - a.confidence));
                }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                      Sort by confidence
                    </button>
                    <button onClick={() => {
                  setShowMenu(false);
                  // Sort by expiry
                  setIngredients([...ingredients].sort((a, b) => (a.expiresIn || 999) - (b.expiresIn || 999)));
                }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                      Sort by expiry date
                    </button>
                    <button onClick={() => {
                  setShowMenu(false);
                  // Clear all low confidence
                  setIngredients(ingredients.filter(ing => ing.confidence >= 0.8));
                }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                      Remove low confidence items
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </header>
      {/* Search Bar with Quick Add */}
      <div ref={headerRef} className="px-6 py-4 bg-white border-b border-gray-100 z-20">
        <div className="relative">
          <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search ingredients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all duration-200" />
          <button onClick={() => setShowQuickAdd(!showQuickAdd)} className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full ${showQuickAdd ? 'bg-gray-300 rotate-45' : 'bg-[#4CAF50] text-white'} transition-all duration-300`}>
            <PlusIcon size={18} />
          </button>
        </div>
        {/* Quick Add Chips */}
        {showQuickAdd && <div className="mt-3 flex flex-wrap gap-2 animate-fade-in">
            {quickAddIngredients.map(ing => <button key={ing} onClick={() => handleQuickAdd(ing)} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-[#1A1A1A] hover:bg-gray-50 hover:shadow-sm transition-all duration-200 flex items-center">
                <PlusIcon size={14} className="mr-1 text-[#4CAF50]" />
                {ing}
              </button>)}
          </div>}
        {/* Statistics Bar */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#E0E0E0" strokeWidth="2" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray={`${verifiedIngredients / totalIngredients * 100} 100`} strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheckIcon size={16} className="text-[#4CAF50]" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs font-medium">
              <span className="block text-sm font-bold text-[#1A1A1A]">
                {verifiedIngredients}/{totalIngredients}
              </span>
              Verified
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#E0E0E0" strokeWidth="2" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#FF9800" strokeWidth="2" strokeDasharray={`${needsReviewIngredients / totalIngredients * 100} 100`} strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <AlertTriangleIcon size={16} className="text-[#FF9800]" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs font-medium">
              <span className="block text-sm font-bold text-[#1A1A1A]">
                {needsReviewIngredients}
              </span>
              Review
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#E0E0E0" strokeWidth="2" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#F44336" strokeWidth="2" strokeDasharray={`${expiringIngredients / totalIngredients * 100} 100`} strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClockIcon size={16} className="text-[#F44336]" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs font-medium">
              <span className="block text-sm font-bold text-[#1A1A1A]">
                {expiringIngredients}
              </span>
              Expiring
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#E0E0E0" strokeWidth="2" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#2196F3" strokeWidth="2" strokeDasharray="100 100" strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart2Icon size={16} className="text-[#2196F3]" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs font-medium">
              <span className="block text-sm font-bold text-[#1A1A1A]">
                {totalNutrition.calories}
              </span>
              Calories
            </p>
          </div>
        </div>
      </div>
      {/* Sticky Category Header (visible when scrolling) */}
      {stickyHeaderVisible && <div className="sticky top-[72px] z-20 animate-fade-in">
          {Object.keys(groupedIngredients).map((category, index) => <div key={`sticky-${category}`} className={`py-2 px-6 ${categoryColors[category] || 'bg-gray-500'} text-white font-medium flex items-center justify-between ${index === 0 ? 'visible' : 'hidden'}`}>
              <span>{category}</span>
              <span className="text-sm">
                {groupedIngredients[category].length} items
              </span>
            </div>)}
        </div>}
      {/* Ingredient List with Category Headers */}
      <div className="flex-1 overflow-y-auto pb-32">
        {Object.entries(groupedIngredients).length === 0 ? <div className="flex flex-col items-center justify-center h-48 text-center px-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <InfoIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No ingredients found</h3>
            <p className="text-[#64748B] mb-4">
              Try adjusting your search or add new ingredients
            </p>
            <button onClick={() => {
          setSearchTerm('');
          setEditingItem(null);
          setNewItem({
            name: '',
            quantity: '',
            category: 'Other',
            freshness: 10,
            notes: ''
          });
          setShowAddItem(true);
        }} className="px-4 py-2 bg-[#4CAF50] text-white rounded-full text-sm font-medium flex items-center">
              <PlusIcon size={16} className="mr-1" />
              Add new ingredient
            </button>
          </div> : Object.entries(groupedIngredients).map(([category, items]) => <div key={category} className="mb-6">
              {/* Category Header */}
              <div className={`${categoryColors[category] || 'bg-gray-500'} py-3 px-6 text-white font-medium sticky top-[72px] z-10 flex items-center justify-between`}>
                <span>{category}</span>
                <span className="text-sm">{items.length} items</span>
              </div>
              {/* Ingredients in this category */}
              <div className="px-6 py-2 space-y-3">
                {items.map(ingredient => <div key={ingredient.id} className={`bg-white rounded-xl border ${ingredient.isDragging ? 'border-[#4CAF50] shadow-lg scale-[1.02]' : 'border-gray-100 shadow-sm hover:shadow-md'} transition-all duration-200 overflow-hidden`}>
                    {/* Drag Handle */}
                    <div className="flex items-center px-4 py-3">
                      <div className="mr-3 text-gray-400 cursor-grab active:cursor-grabbing touch-none" onMouseDown={() => handleStartDrag(ingredient)} onMouseUp={handleEndDrag} onMouseLeave={handleEndDrag}>
                        <GripIcon size={18} />
                      </div>
                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-lg text-[#1A1A1A] truncate mr-2">
                            {ingredient.name}
                          </h3>
                          {/* Confidence Indicator */}
                          <div className="relative flex-shrink-0 w-8 h-8">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                              <circle cx="16" cy="16" r="14" fill="none" stroke="#E0E0E0" strokeWidth="2" />
                              <circle cx="16" cy="16" r="14" fill="none" stroke={ingredient.confidence >= 0.9 ? '#4CAF50' : ingredient.confidence >= 0.7 ? '#FF9800' : '#F44336'} strokeWidth="2" strokeDasharray={`${ingredient.confidence * 100} 100`} strokeLinecap="round" className="transition-all duration-700" />
                              <text x="16" y="16" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill={ingredient.confidence >= 0.9 ? '#4CAF50' : ingredient.confidence >= 0.7 ? '#FF9800' : '#F44336'}>
                                {Math.round(ingredient.confidence * 100)}%
                              </text>
                            </svg>
                          </div>
                        </div>
                        {ingredient.quantity && <p className="text-sm text-[#757575] mt-1">
                            {ingredient.quantity}
                          </p>}
                        {/* Expiration Tag */}
                        {ingredient.expiresIn !== undefined && <div className={`inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs ${ingredient.expiresIn <= 3 ? 'bg-red-100 text-red-700' : ingredient.expiresIn <= 7 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            <ClockIcon size={12} className="mr-1" />
                            {ingredient.expiresIn === 0 ? 'Expires today' : ingredient.expiresIn === 1 ? 'Expires tomorrow' : `Expires in ${ingredient.expiresIn} days`}
                          </div>}
                      </div>
                      {/* Actions */}
                      <div className="flex items-center space-x-1">
                        <button onClick={() => handleEditItem(ingredient)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" aria-label="Edit ingredient">
                          <Edit2Icon size={16} className="text-[#4CAF50]" />
                        </button>
                        <button onClick={() => handleRemoveIngredient(ingredient.id)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" aria-label="Remove ingredient">
                          <XIcon size={16} className="text-[#FF5252]" />
                        </button>
                        <button onClick={() => handleToggleExpand(ingredient.id)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" aria-label={ingredient.isExpanded ? 'Collapse' : 'Expand'}>
                          {ingredient.isExpanded ? <ChevronUpIcon size={16} className="text-[#757575]" /> : <ChevronDownIcon size={16} className="text-[#757575]" />}
                        </button>
                      </div>
                    </div>
                    {/* Expanded Details */}
                    {ingredient.isExpanded && <div className="px-4 pb-4 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <ThermometerIcon size={16} className={getScoreColor(ingredient.freshness)} />
                            <div>
                              <p className="text-xs text-[#757575]">
                                Freshness
                              </p>
                              <p className={`text-sm font-medium ${getScoreColor(ingredient.freshness)}`}>
                                {ingredient.freshness}/10
                              </p>
                            </div>
                          </div>
                          {ingredient.nutritionInfo && <div className="flex items-center space-x-2">
                              <BarChart2Icon size={16} className="text-[#2196F3]" />
                              <div>
                                <p className="text-xs text-[#757575]">
                                  Calories
                                </p>
                                <p className="text-sm font-medium">
                                  {ingredient.nutritionInfo.calories} kcal
                                </p>
                              </div>
                            </div>}
                        </div>
                        {/* Notes */}
                        {ingredient.notes && <div className="flex items-start mt-3 bg-gray-50 rounded-lg p-3">
                            <ClipboardIcon size={14} className="text-[#757575] mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-[#757575] leading-relaxed break-words">
                              {ingredient.notes}
                            </p>
                          </div>}
                        {/* Nutrition Info */}
                        {ingredient.nutritionInfo && <div className="mt-3 bg-blue-50 rounded-lg p-3">
                            <p className="text-xs font-medium text-blue-700 mb-2">
                              Nutrition Information
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <p className="text-xs text-blue-600">Protein</p>
                                <p className="text-sm font-medium">
                                  {ingredient.nutritionInfo.protein}g
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-blue-600">Carbs</p>
                                <p className="text-sm font-medium">
                                  {ingredient.nutritionInfo.carbs}g
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-blue-600">Fat</p>
                                <p className="text-sm font-medium">
                                  {ingredient.nutritionInfo.fat}g
                                </p>
                              </div>
                            </div>
                          </div>}
                      </div>}
                    {/* Low Confidence Warning */}
                    {ingredient.confidence < 0.8 && ingredient.alternativeSuggestions && <div className="px-4 py-3 bg-[#FFF3E0] border-t border-[#FFE0B2]">
                          <p className="text-xs font-medium text-[#E65100] flex items-center mb-2">
                            <AlertTriangleIcon size={14} className="mr-1 flex-shrink-0" />
                            Low confidence detection. Did you mean:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {ingredient.alternativeSuggestions.map(alt => <button key={alt} onClick={() => handleSelectAlternative(ingredient.id, alt)} className="px-2 py-1 bg-white border border-[#FFB74D] rounded-full text-xs font-medium text-[#E65100] hover:bg-[#FFF8E1] transition-colors">
                                {alt}
                              </button>)}
                          </div>
                        </div>}
                  </div>)}
              </div>
            </div>)}
      </div>
      {/* Add/Edit Item Modal */}
      {showAddItem && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">
                {editingItem ? 'Edit Ingredient' : 'Add Ingredient'}
              </h2>
              <button onClick={() => setShowAddItem(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#757575] mb-1 block">
                  Ingredient Name
                </label>
                <input type="text" value={newItem.name} onChange={e => setNewItem({
              ...newItem,
              name: e.target.value
            })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" placeholder="Enter ingredient name" />
              </div>
              <div>
                <label className="text-sm text-[#757575] mb-1 block">
                  Quantity (optional)
                </label>
                <input type="text" value={newItem.quantity} onChange={e => setNewItem({
              ...newItem,
              quantity: e.target.value
            })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" placeholder="Enter quantity (e.g., 2 cups, 500g)" />
              </div>
              <div>
                <label className="text-sm text-[#757575] mb-1 block">
                  Freshness Score (1-10)
                </label>
                <input type="range" min="1" max="10" value={newItem.freshness || 10} onChange={e => setNewItem({
              ...newItem,
              freshness: parseInt(e.target.value)
            })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <div className="flex justify-between text-xs text-[#757575] mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-[#757575] mb-1 block">
                  Notes (Optional)
                </label>
                <textarea value={newItem.notes || ''} onChange={e => setNewItem({
              ...newItem,
              notes: e.target.value
            })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] min-h-[80px]" placeholder="Add observations about the ingredient..." />
              </div>
              <div>
                <label className="text-sm text-[#757575] mb-1 block">
                  Category
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(category => <button key={category} onClick={() => setNewItem({
                ...newItem,
                category
              })} className={`px-3 py-1.5 rounded-lg text-sm ${newItem.category === category ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 text-[#757575]'} transition-colors`}>
                      {category}
                    </button>)}
                </div>
              </div>
              <button onClick={editingItem ? handleUpdateItem : handleAddItem} className="w-full py-3 bg-[#4CAF50] text-white rounded-full font-medium mt-4 hover:bg-[#43A047] transition-colors">
                {editingItem ? 'Update Ingredient' : 'Add Ingredient'}
              </button>
            </div>
          </div>
        </div>}
      {/* Footer with Nutrition Panel */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-100 z-30">
        {/* Nutrition Panel */}
        {showNutritionPanel && <div className="px-6 py-4 border-b border-gray-100 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Nutrition Summary</h3>
              <button onClick={() => setShowNutritionPanel(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <ChevronDownIcon size={20} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#757575] mb-1">Calories</p>
                <p className="text-lg font-bold text-[#1A1A1A]">
                  {Math.round(totalNutrition.calories)}
                </p>
                <p className="text-xs text-[#757575]">kcal</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#757575] mb-1">Protein</p>
                <p className="text-lg font-bold text-[#4CAF50]">
                  {Math.round(totalNutrition.protein)}
                </p>
                <p className="text-xs text-[#757575]">g</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#757575] mb-1">Carbs</p>
                <p className="text-lg font-bold text-[#FF9800]">
                  {Math.round(totalNutrition.carbs)}
                </p>
                <p className="text-xs text-[#757575]">g</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-[#757575] mb-1">Fat</p>
                <p className="text-lg font-bold text-[#2196F3]">
                  {Math.round(totalNutrition.fat)}
                </p>
                <p className="text-xs text-[#757575]">g</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-sm font-medium mb-2">Macronutrient Ratio</p>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                <div className="bg-[#4CAF50] h-full" style={{
              width: `${totalNutrition.protein * 4 * 100 / (totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
            }}></div>
                <div className="bg-[#FF9800] h-full" style={{
              width: `${totalNutrition.carbs * 4 * 100 / (totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
            }}></div>
                <div className="bg-[#2196F3] h-full" style={{
              width: `${totalNutrition.fat * 9 * 100 / (totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
            }}></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-[#757575]">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-1"></span>
                  Protein
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF9800] rounded-full mr-1"></span>
                  Carbs
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-[#2196F3] rounded-full mr-1"></span>
                  Fat
                </span>
              </div>
            </div>
          </div>}
        {/* Action Buttons */}
        <div className="flex px-6 py-4 space-x-3">
          <button onClick={() => setShowNutritionPanel(!showNutritionPanel)} className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-[#1A1A1A] hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
            <BarChart2Icon size={18} className="mr-2" />
            {showNutritionPanel ? 'Hide Nutrition' : 'View Nutrition'}
          </button>
          <button onClick={() => {
          onConfirm(ingredients);
          navigateTo('recipe-suggestions');
        }} className="flex-1 py-3 bg-[#4CAF50] text-white rounded-xl font-medium hover:bg-[#43A047] transition-all duration-200 flex items-center justify-center shadow-md">
            <CheckIcon size={18} className="mr-2" />
            Find Recipes
          </button>
        </div>
      </div>
    </div>;
};