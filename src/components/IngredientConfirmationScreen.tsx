import React, { useState, useRef, createElement } from 'react';
import { ArrowLeftIcon, PlusIcon, SearchIcon, CheckIcon, AlertTriangleIcon, ClockIcon, FlameIcon, ChevronDownIcon, ChevronUpIcon, Edit2Icon, Trash2Icon, BarChart2Icon, ClipboardIcon, DropletIcon, GripVerticalIcon, DumbbellIcon } from 'lucide-react';
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
export const IngredientConfirmationScreen: React.FC<IngredientConfirmationScreenProps> = ({
  navigateTo,
  onConfirm
}) => {
  // Mock detected ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([{
    id: '1',
    name: 'Atlantic Salmon fillet',
    quantity: '1 fillet (approx. 200g / 7oz)',
    category: 'Protein',
    confidence: 0.95,
    isVerified: true,
    freshness: 8,
    notes: 'Vacuum-sealed package. Vibrant orange color with good marbling, typical of farmed Atlantic salmon. No off odors.',
    calories: 412,
    nutrition: {
      protein: 42,
      carbs: 0,
      fat: 22
    },
    expiresIn: 3
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }]);
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
  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<Ingredient | null>(null);
  const [draggedOverId, setDraggedOverId] = useState<string | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragItemRef = useRef<HTMLDivElement | null>(null);
  const dragOverItemRef = useRef<string | null>(null);
  // Stats for the summary bar
  const totalIngredients = ingredients.length;
  const verifiedIngredients = ingredients.filter(ing => ing.isVerified).length;
  const needsReviewIngredients = totalIngredients - verifiedIngredients;
  const expiringIngredients = ingredients.filter(ing => ing.expiresIn !== undefined && ing.expiresIn <= 3).length;
  const totalCalories = ingredients.reduce((total, ing) => total + (ing.calories || 0), 0);
  // Group ingredients by category
  const groupedIngredients = ingredients.reduce((acc, ing) => {
    if (!acc[ing.category]) {
      acc[ing.category] = [];
    }
    acc[ing.category].push(ing);
    return acc;
  }, {} as Record<string, Ingredient[]>);
  // Filtered ingredients based on search
  const getFilteredIngredients = () => {
    if (!searchTerm) return groupedIngredients;
    const filtered = {} as Record<string, Ingredient[]>;
    Object.entries(groupedIngredients).forEach(([category, items]) => {
      const filteredItems = items.filter(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase()) || ing.quantity && ing.quantity.toLowerCase().includes(searchTerm.toLowerCase()) || ing.notes && ing.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems;
      }
    });
    return filtered;
  };
  const filteredIngredients = getFilteredIngredients();
  // Toggle ingredient expansion
  const toggleIngredientExpansion = (id: string) => {
    setIngredients(ingredients.map(ing => ing.id === id ? {
      ...ing,
      isExpanded: !ing.isExpanded
    } : ing));
  };
  // Handle ingredient verification
  const toggleVerification = (id: string) => {
    setIngredients(prev => prev.map(ing => ing.id === id ? {
      ...ing,
      isVerified: !ing.isVerified
    } : ing));
  };
  // Delete ingredient
  const handleDeleteItem = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
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
      setIngredients([...ingredients, {
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
      }]);
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
      setIngredients(ingredients.map(ing => ing.id === editingItem.id ? {
        ...ing,
        name: newItem.name,
        quantity: newItem.quantity,
        category: newItem.category,
        freshness: newItem.freshness,
        notes: newItem.notes,
        expiresIn: newItem.expiresIn,
        calories: newItem.calories,
        nutrition: newItem.nutrition
      } : ing));
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
  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, ingredient: Ingredient) => {
    setDraggedItem(ingredient);
    dragItemRef.current = e.currentTarget;
    // Enhanced visual feedback for dragged element
    if (dragItemRef.current) {
      dragItemRef.current.style.opacity = '0.6';
      dragItemRef.current.style.transform = 'scale(1.03)';
      dragItemRef.current.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
      dragItemRef.current.style.zIndex = '50';
      dragItemRef.current.style.background = '#f0f9ff';
    }
    e.dataTransfer.effectAllowed = 'move';
    try {
      // Create a transparent drag image
      const dragImage = document.createElement('div');
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-9999px';
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    } catch (err) {
      console.error('Error setting drag image:', err);
    }
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== id) {
      setDraggedOverId(id);
      dragOverItemRef.current = id;
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragEnd = () => {
    if (dragItemRef.current) {
      dragItemRef.current.style.opacity = '1';
      dragItemRef.current.style.transform = 'none';
      dragItemRef.current.style.boxShadow = 'none';
    }
    setDraggedItem(null);
    setDraggedOverId(null);
    dragItemRef.current = null;
    dragOverItemRef.current = null;
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, category: string) => {
    e.preventDefault();
    if (!draggedItem || !dragOverItemRef.current) return;
    const newIngredients = [...ingredients];
    const draggedItemIndex = newIngredients.findIndex(ing => ing.id === draggedItem.id);
    const dropOverItemIndex = newIngredients.findIndex(ing => ing.id === dragOverItemRef.current);
    if (draggedItemIndex === -1 || dropOverItemIndex === -1) return;
    // Remove the dragged item
    const [removed] = newIngredients.splice(draggedItemIndex, 1);
    // Update category if dropped in different category
    if (removed.category !== category) {
      removed.category = category;
    }
    // Insert at the new position
    newIngredients.splice(dropOverItemIndex, 0, removed);
    setIngredients(newIngredients);
    setDraggedOverId(null);
    handleDragEnd();
  };
  // Touch handlers for mobile drag and drop - improved for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, ingredient: Ingredient) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    // Start a timer to detect long press
    const timer = setTimeout(() => {
      setDraggedItem(ingredient);
      setIsDragging(true);
      // Add enhanced visual feedback
      if (e.currentTarget) {
        e.currentTarget.style.opacity = '0.6';
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.zIndex = '50';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
        e.currentTarget.style.background = '#f0f9ff';
        // Add haptic feedback simulation
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }
    }, 300); // Reduced to 300ms for faster feedback
    // Store the timer in a ref so we can clear it
    const currentTarget = e.currentTarget;
    currentTarget.dataset.timer = String(timer);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !draggedItem) return;
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    // Find the ingredient element being dragged over
    const ingredientElement = elements.find(el => el.classList.contains('ingredient-item') && el !== e.currentTarget) as HTMLElement | undefined;
    if (ingredientElement) {
      const id = ingredientElement.dataset.id;
      if (id && id !== draggedOverId) {
        setDraggedOverId(id);
        dragOverItemRef.current = id;
      }
    }
    // Move the dragged element with the touch
    if (e.currentTarget && touchStartY !== null) {
      const deltaY = touch.clientY - touchStartY;
      e.currentTarget.style.transform = `translate(0, ${deltaY}px) scale(1.03)`;
    }
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    // Clear any pending long press timer
    const timer = Number(e.currentTarget.dataset.timer);
    if (timer) clearTimeout(timer);
    // If we were dragging, handle the drop
    if (isDragging && draggedItem && dragOverItemRef.current) {
      const category = ingredients.find(ing => ing.id === dragOverItemRef.current)?.category || draggedItem.category;
      const newIngredients = [...ingredients];
      const draggedItemIndex = newIngredients.findIndex(ing => ing.id === draggedItem.id);
      const dropOverItemIndex = newIngredients.findIndex(ing => ing.id === dragOverItemRef.current);
      if (draggedItemIndex !== -1 && dropOverItemIndex !== -1) {
        const [removed] = newIngredients.splice(draggedItemIndex, 1);
        if (removed.category !== category) {
          removed.category = category;
        }
        newIngredients.splice(dropOverItemIndex, 0, removed);
        setIngredients(newIngredients);
      }
    }
    // Reset styles
    if (e.currentTarget) {
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.zIndex = 'auto';
      e.currentTarget.style.boxShadow = 'none';
    }
    // Reset state
    setDraggedItem(null);
    setDraggedOverId(null);
    setIsDragging(false);
    setTouchStartY(null);
    dragOverItemRef.current = null;
  };
  // Category colors
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, {
      bg: string;
      light: string;
      text: string;
    }> = {
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
  const categories = ['Protein', 'Vegetable', 'Fruit', 'Grain', 'Dairy', 'Oil', 'Seasoning', 'Other'];
  // Calculate total nutrition
  const totalNutrition = ingredients.reduce((acc, ing) => {
    if (ing.nutrition) {
      acc.protein += ing.nutrition.protein;
      acc.carbs += ing.nutrition.carbs;
      acc.fat += ing.nutrition.fat;
    }
    return acc;
  }, {
    protein: 0,
    carbs: 0,
    fat: 0
  });
  return <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A]">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>
      {/* Header - Enhanced with sticky positioning */}
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <button onClick={() => navigateTo('ingredient-capture')} className="p-3 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors" aria-label="Go back">
          <ArrowLeftIcon size={22} />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Review Ingredients
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            {totalIngredients} items detected
          </p>
        </div>
        <button onClick={() => {
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
      }} className="p-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors shadow-sm" aria-label="Add ingredient">
          <PlusIcon size={22} />
        </button>
      </header>
      {/* Search Bar - Enhanced with sticky positioning */}
      <div className="px-6 py-3 bg-white border-b border-gray-100 sticky top-[73px] z-20">
        <div className="relative">
          <SearchIcon size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search ingredients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-full text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" />
        </div>
      </div>
      {/* Statistics Dashboard - Simplified and more scannable */}
      <div className="grid grid-cols-2 gap-3 px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center bg-emerald-50 p-3 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-3 shrink-0">
            <CheckIcon size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              {verifiedIngredients}/{totalIngredients}
            </p>
            <p className="text-xs text-gray-600 font-medium">Verified</p>
          </div>
        </div>
        <div className="flex items-center bg-amber-50 p-3 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-3 shrink-0">
            <AlertTriangleIcon size={20} className="text-amber-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              {needsReviewIngredients}
            </p>
            <p className="text-xs text-gray-600 font-medium">Need review</p>
          </div>
        </div>
      </div>
      {/* Onboarding tooltip for drag functionality - NEW! */}
      {ingredients.length > 0 && <div className="mx-6 mt-3 mb-2 bg-blue-50 p-3 rounded-xl border border-blue-100 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 shrink-0">
            <GripVerticalIcon size={16} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-blue-700">
              <span className="font-medium">Tip:</span> Long press or drag an
              ingredient to reorder or change its category
            </p>
          </div>
        </div>}
      {/* Ingredient List */}
      <div className="flex-1 overflow-y-auto pb-32 bg-gray-50">
        {Object.keys(filteredIngredients).length === 0 ? <div className="flex flex-col items-center justify-center h-40 px-4 text-center mt-8">
            <p className="text-gray-500 mb-3">
              No ingredients match your search
            </p>
            <button onClick={() => {
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
        }} className="text-emerald-500 font-medium flex items-center hover:text-emerald-600 transition-colors duration-200 bg-emerald-50 px-4 py-2 rounded-full">
              <PlusIcon size={16} className="mr-1" />
              Add new ingredient
            </button>
          </div> : <div className="p-4 space-y-4">
            {Object.entries(filteredIngredients).map(([category, items]) => <div key={category} className="bg-white rounded-xl overflow-hidden shadow-sm">
                {/* Category Header */}
                <div className={`${getCategoryColor(category).bg} py-3 px-4 flex justify-between items-center`}>
                  <h2 className="font-semibold text-white text-base uppercase tracking-wide">
                    {category}
                  </h2>
                  <span className="text-white text-sm font-medium px-2 py-0.5 bg-white/20 rounded-full">
                    {items.length} item{items.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {/* Category Items - Simplified card design */}
                <div className="divide-y divide-gray-100">
                  {items.map(ingredient => <div key={ingredient.id} className={`bg-white flex items-start relative
                        ${draggedOverId === ingredient.id ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''} 
                        ${draggedItem && draggedItem.id === ingredient.id ? 'opacity-60 bg-blue-50' : 'opacity-100'} 
                        transition-all duration-200 ingredient-item hover:bg-gray-50`} data-id={ingredient.id} draggable onDragStart={e => handleDragStart(e, ingredient)} onDragEnter={e => handleDragEnter(e, ingredient.id)} onDragOver={handleDragOver} onDragEnd={handleDragEnd} onDrop={e => handleDrop(e, category)} onTouchStart={e => handleTouchStart(e, ingredient)} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                      {/* Drag Handle - Enhanced for better affordance */}
                      <div className="px-3 py-5 flex items-center justify-center cursor-grab active:cursor-grabbing">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <GripVerticalIcon size={18} className="text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        {/* Main ingredient info - Simplified layout */}
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {ingredient.name}
                          </h3>
                          <div className="flex space-x-1">
                            <button onClick={() => handleEditItem(ingredient)} className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors" aria-label="Edit ingredient">
                              <Edit2Icon size={18} />
                            </button>
                            <button onClick={() => handleDeleteItem(ingredient.id)} className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors" aria-label="Delete ingredient">
                              <Trash2Icon size={18} />
                            </button>
                          </div>
                        </div>
                        {ingredient.quantity && <p className="text-gray-600 text-sm mb-3">
                            {ingredient.quantity}
                          </p>}
                        {/* Key Info Chips - Original layout */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <div className="inline-flex items-center px-2.5 py-1.5 bg-amber-50 text-amber-600 rounded-full">
                            <FlameIcon size={14} className="mr-1 flex-shrink-0" />
                            <span className="text-sm font-medium">
                              {ingredient.calories} cal
                            </span>
                          </div>
                          <div className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-full">
                            <DumbbellIcon size={14} className="mr-1 flex-shrink-0" />
                            <span className="text-sm font-medium">
                              {ingredient.nutrition?.protein || 0}g protein
                            </span>
                          </div>
                          {ingredient.expiresIn !== undefined && <div className="inline-flex items-center px-2.5 py-1.5 bg-red-50 text-red-500 rounded-full">
                              <ClockIcon size={14} className="mr-1 flex-shrink-0" />
                              <span className="text-sm font-medium">
                                Expires: {ingredient.expiresIn}d
                              </span>
                            </div>}
                        </div>
                        {/* Freshness Rating - Keep as is */}
                        <div className="bg-emerald-50 p-3 rounded-lg mb-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-emerald-700">
                              Freshness Rating
                            </p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => {
                        // Convert 10-point scale to 5-point scale
                        const freshness5Point = Math.round(ingredient.freshness / 2);
                        return <DropletIcon key={star} size={14} className={`${star <= freshness5Point ? 'text-emerald-500 fill-emerald-500' : 'text-gray-300'} ${star > 1 ? 'ml-0.5' : ''}`} />;
                      })}
                            </div>
                          </div>
                        </div>
                        {/* Notes - Moved outside expanded section */}
                        {ingredient.notes && <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
                            <div className="flex items-start">
                              <ClipboardIcon size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                              <p className="text-sm text-gray-700">
                                {ingredient.notes}
                              </p>
                            </div>
                          </div>}
                        {/* Toggle Button - Clearer affordance */}
                        <button onClick={() => toggleIngredientExpansion(ingredient.id)} className="w-full flex items-center justify-center py-2 mt-1 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" aria-expanded={ingredient.isExpanded} aria-controls={`details-${ingredient.id}`}>
                          <span className="text-xs mr-1">
                            {ingredient.isExpanded ? 'Hide details' : 'Show details'}
                          </span>
                          {ingredient.isExpanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                        </button>
                        {/* Expanded Details - Only nutrition information */}
                        {ingredient.isExpanded && <div id={`details-${ingredient.id}`} className="mt-3 space-y-3 animate-fade-in">
                            {/* Nutrition Details */}
                            {ingredient.nutrition && <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-sm font-medium text-blue-700 mb-2">
                                  Nutrition Information
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="bg-white p-2 rounded-lg text-center shadow-sm">
                                    <p className="text-xs text-blue-600 font-medium">
                                      Protein
                                    </p>
                                    <p className="font-bold text-gray-800">
                                      {ingredient.nutrition.protein}g
                                    </p>
                                  </div>
                                  <div className="bg-white p-2 rounded-lg text-center shadow-sm">
                                    <p className="text-xs text-blue-600 font-medium">
                                      Carbs
                                    </p>
                                    <p className="font-bold text-gray-800">
                                      {ingredient.nutrition.carbs}g
                                    </p>
                                  </div>
                                  <div className="bg-white p-2 rounded-lg text-center shadow-sm">
                                    <p className="text-xs text-blue-600 font-medium">
                                      Fat
                                    </p>
                                    <p className="font-bold text-gray-800">
                                      {ingredient.nutrition.fat}g
                                    </p>
                                  </div>
                                </div>
                              </div>}
                            {/* Confidence indicator */}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>AI confidence</span>
                              <span className="font-medium">
                                {Math.round(ingredient.confidence * 100)}%
                              </span>
                            </div>
                          </div>}
                      </div>
                    </div>)}
                </div>
              </div>)}
          </div>}
      </div>
      {/* Nutrition Summary Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg max-w-[430px] mx-auto rounded-t-xl z-40">
        {/* Action Buttons - Enhanced primary action */}
        <div className="flex px-6 py-4 space-x-3">
          <button onClick={() => setShowNutritionSummary(!showNutritionSummary)} className="py-4 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center shadow-sm transition-all w-[40%]">
            <BarChart2Icon size={18} className="mr-2 text-gray-500" />
            Nutrition
          </button>
          <button onClick={() => {
          onConfirm(ingredients);
          navigateTo('recipe-suggestions');
        }} className="py-4 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 flex items-center justify-center shadow-md transition-all w-[60%] text-lg">
            <CheckIcon size={20} className="mr-2" />
            Find Recipes
          </button>
        </div>
        {/* Expanded Nutrition Summary */}
        {showNutritionSummary && <div className="px-6 py-4 animate-fade-in border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-emerald-50 p-3 rounded-lg text-center shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Protein</p>
                <p className="text-xl font-bold text-emerald-600">
                  {Math.round(totalNutrition.protein)}g
                </p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg text-center shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Carbs</p>
                <p className="text-xl font-bold text-amber-600">
                  {Math.round(totalNutrition.carbs)}g
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Fat</p>
                <p className="text-xl font-bold text-blue-600">
                  {Math.round(totalNutrition.fat)}g
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-2 shadow-sm">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Macronutrient Ratio
              </p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{
              width: `${totalNutrition.protein * 4 * 100 / Math.max(1, totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
            }}></div>
                <div className="bg-amber-500 h-full" style={{
              width: `${totalNutrition.carbs * 4 * 100 / Math.max(1, totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
            }}></div>
                <div className="bg-blue-500 h-full" style={{
              width: `${totalNutrition.fat * 9 * 100 / Math.max(1, totalNutrition.protein * 4 + totalNutrition.carbs * 4 + totalNutrition.fat * 9)}%`
            }}></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></span>
                  Protein
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-1"></span>
                  Carbs
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                  Fat
                </span>
              </div>
            </div>
          </div>}
      </div>
      {/* Add/Edit Item Modal - Kept mostly the same */}
      {showAddItem && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem ? 'Edit Ingredient' : 'Add Ingredient'}
              </h2>
              <button onClick={() => setShowAddItem(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronDownIcon size={22} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredient Name
                </label>
                <input type="text" value={newItem.name} onChange={e => setNewItem({
              ...newItem,
              name: e.target.value
            })} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" placeholder="Enter ingredient name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (optional)
                </label>
                <input type="text" value={newItem.quantity} onChange={e => setNewItem({
              ...newItem,
              quantity: e.target.value
            })} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" placeholder="Enter quantity (e.g., 2 cups, 500g)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(category => <button key={category} onClick={() => setNewItem({
                ...newItem,
                category
              })} className={`px-3 py-1.5 rounded-lg text-sm ${newItem.category === category ? `${getCategoryColor(category).bg} text-white` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                      {category}
                    </button>)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Freshness (1-5)
                </label>
                <input type="range" min="1" max="5" value={Math.round(newItem.freshness / 2)} onChange={e => setNewItem({
              ...newItem,
              freshness: parseInt(e.target.value) * 2
            })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <span className="text-xs font-medium mr-1.5">
                      Freshness:
                    </span>
                    {[1, 2, 3, 4, 5].map(star => <DropletIcon key={star} size={14} className={`${star <= Math.round(newItem.freshness / 2) ? 'text-emerald-500 fill-emerald-500' : 'text-gray-300'} ${star > 1 ? 'ml-1' : ''}`} />)}
                  </div>
                  <span className={`text-xs font-medium ${Math.round(newItem.freshness / 2) >= 4 ? 'text-emerald-500' : Math.round(newItem.freshness / 2) >= 3 ? 'text-amber-500' : 'text-rose-500'}`}>
                    {Math.round(newItem.freshness / 2)}/5
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expires In (days)
                </label>
                <input type="number" value={newItem.expiresIn || ''} onChange={e => setNewItem({
              ...newItem,
              expiresIn: e.target.value ? parseInt(e.target.value) : undefined
            })} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" placeholder="Days until expiry" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories (kcal)
                </label>
                <input type="number" value={newItem.calories || ''} onChange={e => setNewItem({
              ...newItem,
              calories: parseInt(e.target.value) || 0
            })} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" placeholder="Calories per serving" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nutrition Information
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Protein (g)
                    </label>
                    <input type="number" value={newItem.nutrition.protein || ''} onChange={e => setNewItem({
                  ...newItem,
                  nutrition: {
                    ...newItem.nutrition,
                    protein: parseFloat(e.target.value) || 0
                  }
                })} className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Carbs (g)
                    </label>
                    <input type="number" value={newItem.nutrition.carbs || ''} onChange={e => setNewItem({
                  ...newItem,
                  nutrition: {
                    ...newItem.nutrition,
                    carbs: parseFloat(e.target.value) || 0
                  }
                })} className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Fat (g)
                    </label>
                    <input type="number" value={newItem.nutrition.fat || ''} onChange={e => setNewItem({
                  ...newItem,
                  nutrition: {
                    ...newItem.nutrition,
                    fat: parseFloat(e.target.value) || 0
                  }
                })} className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Appearance, Texture, etc.)
                </label>
                <textarea value={newItem.notes || ''} onChange={e => setNewItem({
              ...newItem,
              notes: e.target.value
            })} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px] shadow-sm" placeholder="Add details about the ingredient (e.g., firm texture, bright color)" />
              </div>
              <button onClick={editingItem ? handleUpdateItem : handleAddItem} className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium mt-4 hover:bg-emerald-600 transition-colors shadow-sm">
                {editingItem ? 'Update Ingredient' : 'Add Ingredient'}
              </button>
            </div>
          </div>
        </div>}
    </div>;
};