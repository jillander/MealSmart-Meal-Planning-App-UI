import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon, XIcon, CheckIcon, SearchIcon, Edit2Icon, AlertTriangleIcon, CheckCircleIcon, CircleDotIcon, ClipboardIcon } from 'lucide-react';
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
    category: 'Protein',
    confidence: 0.95,
    freshness: 9,
    notes: 'Fresh, pink color, no discoloration'
  }, {
    id: '2',
    name: 'Bell Peppers',
    quantity: '3',
    category: 'Vegetables',
    confidence: 0.92,
    freshness: 8,
    notes: 'Firm, bright color, slight wrinkle on one'
  }, {
    id: '3',
    name: 'Brown Rice',
    quantity: '2 cups',
    category: 'Grains',
    confidence: 0.98,
    freshness: 10,
    notes: 'Sealed package, well within expiration date'
  }, {
    id: '4',
    name: 'Olive Oil',
    quantity: '1 bottle',
    category: 'Pantry',
    confidence: 0.88,
    freshness: 10,
    notes: 'New bottle, clear color'
  }, {
    id: '5',
    name: 'Garlic',
    quantity: '3 cloves',
    category: 'Vegetables',
    confidence: 0.78,
    freshness: 7,
    notes: 'Firm bulbs, slight sprouting'
  }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: 'Other',
    freshness: 10,
    notes: ''
  });
  const [editingItem, setEditingItem] = useState<Ingredient | null>(null);
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
        notes: newItem.notes
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
  const handleEditItem = (ingredient: Ingredient) => {
    setEditingItem(ingredient);
    setNewItem({
      name: ingredient.name,
      quantity: ingredient.quantity || '',
      category: ingredient.category,
      freshness: ingredient.freshness,
      notes: ingredient.notes
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
  const filteredIngredients = ingredients.filter(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase()) || ing.quantity && ing.quantity.toLowerCase().includes(searchTerm.toLowerCase()) || ing.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const groupedIngredients = filteredIngredients.reduce((acc, ing) => {
    if (!acc[ing.category]) {
      acc[ing.category] = [];
    }
    acc[ing.category].push(ing);
    return acc;
  }, {} as Record<string, Ingredient[]>);
  const categories = ['Vegetables', 'Fruits', 'Protein', 'Dairy', 'Grains', 'Pantry', 'Other'];
  // Helper function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0.9 || score >= 9) return 'text-green-500';
    if (score >= 0.7 || score >= 7) return 'text-yellow-500';
    return 'text-red-500';
  };
  return <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A]">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>
      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigateTo('ingredient-capture')} className="mr-3">
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-xl font-bold">Confirm Ingredients</h1>
          </div>
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
        }} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4CAF50] text-white shadow-sm hover:shadow-md transition-all duration-200">
            <PlusIcon size={20} />
          </button>
        </div>
      </header>
      {/* Search Bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="relative">
          <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search ingredients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all duration-200" />
        </div>
        {/* Ingredient Stats */}
        <div className="flex justify-between mt-3 text-sm">
          <span className="text-[#757575]">
            {ingredients.length} ingredients detected
          </span>
          <div className="flex items-center">
            <span className="flex items-center text-[#4CAF50] mr-3">
              <CheckCircleIcon size={14} className="mr-1" />
              {ingredients.filter(i => i.confidence >= 0.9).length} verified
            </span>
            <span className="flex items-center text-[#FF9800]">
              <AlertTriangleIcon size={14} className="mr-1" />
              {ingredients.filter(i => i.confidence < 0.9).length} needs
              review
            </span>
          </div>
        </div>
      </div>
      {/* Ingredient List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {Object.entries(groupedIngredients).map(([category, items]) => <div key={category} className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-1 h-8 bg-[#4CAF50] rounded-r-md mr-3 flex-shrink-0" />
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-semibold text-[#1A1A1A]">
                  {category}
                </h2>
                <span className="text-xs text-[#757575] px-2 py-0.5 bg-gray-100 rounded-full">
                  {items.length} items
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {items.map(ingredient => <div key={ingredient.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className={`w-1 h-full rounded-full flex-shrink-0 ${ingredient.confidence > 0.9 ? 'bg-[#4CAF50]' : 'bg-[#FF9800]'}`} />
                        <div className="min-w-0">
                          <h3 className="font-medium text-[#1A1A1A] text-lg truncate">
                            {ingredient.name}
                          </h3>
                          {ingredient.quantity && <p className="text-sm text-[#757575] truncate mt-0.5">
                              {ingredient.quantity}
                            </p>}
                        </div>
                      </div>
                      {/* Metrics Grid - Improved layout */}
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <CircleDotIcon size={16} className="text-[#4CAF50] flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-[#757575] truncate">
                              Freshness
                            </p>
                            <p className={`text-sm font-medium ${getScoreColor(ingredient.freshness)} truncate`}>
                              {ingredient.freshness}/10
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon size={16} className="text-[#4CAF50] flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-[#757575] truncate">
                              Confidence
                            </p>
                            <p className={`text-sm font-medium ${getScoreColor(ingredient.confidence)} truncate`}>
                              {(ingredient.confidence * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Notes Section - Improved layout */}
                      {ingredient.notes && <div className="flex items-start mt-3 bg-gray-50 rounded-lg p-3">
                          <ClipboardIcon size={14} className="text-[#757575] mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-[#757575] leading-relaxed break-words">
                            {ingredient.notes}
                          </p>
                        </div>}
                    </div>
                    {/* Actions - Improved spacing */}
                    <div className="flex items-center space-x-2 ml-2">
                      <button onClick={() => handleEditItem(ingredient)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <Edit2Icon size={16} className="text-[#4CAF50]" />
                      </button>
                      <button onClick={() => handleRemoveIngredient(ingredient.id)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <XIcon size={16} className="text-[#FF5252]" />
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>)}
        {filteredIngredients.length === 0 && <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-[#757575] mb-2">No ingredients found</p>
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
          setSearchTerm('');
        }} className="text-[#4CAF50] font-medium flex items-center">
              <PlusIcon size={16} className="mr-1" />
              Add new ingredient
            </button>
          </div>}
      </div>
      {/* Add/Edit Item Modal */}
      {showAddItem && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">
                {editingItem ? 'Edit Ingredient' : 'Add Ingredient'}
              </h2>
              <button onClick={() => setShowAddItem(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Existing name and quantity fields */}
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
              {/* New freshness slider */}
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
              {/* Notes field */}
              <div>
                <label className="text-sm text-[#757575] mb-1 block">
                  Notes (Optional)
                </label>
                <textarea value={newItem.notes || ''} onChange={e => setNewItem({
              ...newItem,
              notes: e.target.value
            })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] min-h-[80px]" placeholder="Add observations about the ingredient..." />
              </div>
              {/* Existing category selection and buttons */}
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
      {/* Confirm Button */}
      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <button onClick={() => {
        onConfirm(ingredients);
        navigateTo('recipe-suggestions');
      }} className="w-full py-4 bg-[#4CAF50] text-white rounded-full font-medium flex items-center justify-center shadow-md hover:shadow-lg hover:bg-[#43A047] transition-all duration-200">
          <CheckIcon size={20} className="mr-2" />
          Find Recipes with These Ingredients
        </button>
      </div>
    </div>;
};