import React, { useState, createContext, useContext } from 'react';
interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  cookingTime: string;
  time: string;
  image: string;
  completed: boolean;
  date: string;
  progress: {
    hasIngredients: boolean;
    hasRecipe: boolean;
    viewedRecipe: boolean;
    completed: boolean;
  };
}
export interface SavedRecipe {
  id: string;
  name: string;
  image: string;
  calories: number;
  cookingTime: string;
  matchPercentage: number;
  savedAt: string;
}
export interface GeneratedRecipe {
  id: string;
  name: string;
  image: string;
  matchPercentage: number;
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  missingIngredients: string[];
  cuisine: string;
  dietaryTags: string[];
  difficulty: string;
  inspiredBy: {
    name: string;
    handle: string;
    avatar: string;
  };
}
interface MealPlanContextType {
  meals: Meal[];
  savedRecipes: SavedRecipe[];
  generatedRecipes: GeneratedRecipe[];
  addMeal: (
  recipe: {
    id: string;
    title: string;
    image: string;
    cookingTime: string;
    calories: number;
  },
  date: Date,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack')
  => void;
  updateMeal: (mealId: string, updates: Partial<Meal>) => void;
  getMealsForDate: (date: Date) => Meal[];
  removeMeal: (mealId: string) => void;
  addSavedRecipe: (recipe: SavedRecipe) => void;
  removeSavedRecipe: (recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;
  addGeneratedRecipe: (recipe: GeneratedRecipe) => void;
  getGeneratedRecipes: () => GeneratedRecipe[];
}
const MealPlanContext = createContext<MealPlanContextType | undefined>(
  undefined
);
export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};
interface MealPlanProviderProps {
  children: ReactNode;
}
export const MealPlanProvider: React.FC<MealPlanProviderProps> = ({
  children
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [generatedRecipes, setGeneratedRecipes] = useState<GeneratedRecipe[]>([
  {
    id: 'gen-1',
    name: 'One-Pan Chicken and Rice',
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 95,
    prepTime: '30 min',
    calories: 450,
    protein: 38,
    carbs: 42,
    fat: 14,
    missingIngredients: ['Garlic', 'Thyme'],
    cuisine: 'Mediterranean',
    dietaryTags: ['High Protein', 'Gluten Free'],
    difficulty: 'Easy',
    inspiredBy: {
      name: 'Chef Maria',
      handle: '@chefmaria',
      avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'gen-2',
    name: 'Stir-Fried Rice Bowl',
    image:
    'https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 85,
    prepTime: '20 min',
    calories: 380,
    protein: 22,
    carbs: 52,
    fat: 11,
    missingIngredients: ['Soy Sauce', 'Ginger'],
    cuisine: 'Asian',
    dietaryTags: ['Vegetarian'],
    difficulty: 'Medium',
    inspiredBy: {
      name: 'Wok Master',
      handle: '@wokmaster',
      avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'gen-3',
    name: 'Mediterranean Vegetable Bowl',
    image:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 78,
    prepTime: '25 min',
    calories: 320,
    protein: 18,
    carbs: 38,
    fat: 12,
    missingIngredients: ['Feta Cheese', 'Olives'],
    cuisine: 'Mediterranean',
    dietaryTags: ['Vegetarian', 'Low Carb'],
    difficulty: 'Easy',
    inspiredBy: {
      name: 'Green Kitchen',
      handle: '@greenkitchen',
      avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  }]
  );
  const [meals, setMeals] = useState<Meal[]>([
  {
    id: 'meal-1',
    type: 'breakfast',
    name: 'Avocado Toast',
    calories: 350,
    cookingTime: '15 min',
    time: '8:00 AM',
    image:
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    completed: true,
    date: today,
    progress: {
      hasIngredients: true,
      hasRecipe: true,
      viewedRecipe: true,
      completed: true
    }
  },
  {
    id: 'meal-2',
    type: 'lunch',
    name: 'Chicken Salad',
    calories: 450,
    cookingTime: '20 min',
    time: '12:30 PM',
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    completed: true,
    date: today,
    progress: {
      hasIngredients: true,
      hasRecipe: true,
      viewedRecipe: true,
      completed: true
    }
  },
  {
    id: 'meal-3',
    type: 'snack',
    name: 'Greek Yogurt',
    calories: 150,
    cookingTime: '10 min',
    time: '3:30 PM',
    image:
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    completed: false,
    date: today,
    progress: {
      hasIngredients: true,
      hasRecipe: true,
      viewedRecipe: false,
      completed: false
    }
  },
  {
    id: 'meal-4',
    type: 'dinner',
    name: 'Salmon Bowl',
    calories: 550,
    cookingTime: '30 min',
    time: '7:00 PM',
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    completed: false,
    date: today,
    progress: {
      hasIngredients: true,
      hasRecipe: true,
      viewedRecipe: false,
      completed: false
    }
  }]
  );
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const addGeneratedRecipe = (recipe: GeneratedRecipe) => {
    setGeneratedRecipes((prev) => {
      if (prev.some((r) => r.id === recipe.id)) return prev;
      return [recipe, ...prev];
    });
  };
  const getGeneratedRecipes = () => {
    return generatedRecipes;
  };
  const addMeal = (
  recipe: {
    id: string;
    title: string;
    image: string;
    cookingTime: string;
    calories: number;
  },
  date: Date,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') =>
  {
    const timeMap = {
      breakfast: '8:00 AM',
      lunch: '12:30 PM',
      snack: '3:30 PM',
      dinner: '7:00 PM'
    };
    const newMeal: Meal = {
      id: `meal-${Date.now()}-${Math.random()}`,
      type: mealType,
      name: recipe.title,
      calories: recipe.calories,
      cookingTime: recipe.cookingTime,
      time: timeMap[mealType],
      image: recipe.image,
      completed: false,
      date: date.toISOString().split('T')[0],
      progress: {
        hasIngredients: false,
        hasRecipe: true,
        viewedRecipe: false,
        completed: false
      }
    };
    setMeals((prevMeals) => [...prevMeals, newMeal]);
  };
  const updateMeal = (mealId: string, updates: Partial<Meal>) => {
    setMeals((prevMeals) =>
    prevMeals.map((meal) =>
    meal.id === mealId ?
    {
      ...meal,
      ...updates
    } :
    meal
    )
    );
  };
  const getMealsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return meals.filter((meal) => meal.date === dateString);
  };
  const removeMeal = (mealId: string) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
  };
  const addSavedRecipe = (recipe: SavedRecipe) => {
    setSavedRecipes((prev) => {
      if (prev.some((r) => r.id === recipe.id)) return prev;
      return [recipe, ...prev];
    });
  };
  const removeSavedRecipe = (recipeId: string) => {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== recipeId));
  };
  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.some((r) => r.id === recipeId);
  };
  return (
    <MealPlanContext.Provider
      value={{
        meals,
        savedRecipes,
        generatedRecipes,
        addMeal,
        updateMeal,
        getMealsForDate,
        removeMeal,
        addSavedRecipe,
        removeSavedRecipe,
        isRecipeSaved,
        addGeneratedRecipe,
        getGeneratedRecipes
      }}>
      
      {children}
    </MealPlanContext.Provider>);

};