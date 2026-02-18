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
  date: string; // ISO date string
  progress: {
    hasIngredients: boolean;
    hasRecipe: boolean;
    viewedRecipe: boolean;
    completed: boolean;
  };
}
interface MealPlanContextType {
  meals: Meal[];
  addMeal: (
  recipe: {
    id: string;
    title: string;
    image: string;
    cookingTime: string;
    calories: number;
  },
  date: Date,
  mealType: 'breakfast' | 'lunch' | 'dinner')
  => void;
  updateMeal: (mealId: string, updates: Partial<Meal>) => void;
  getMealsForDate: (date: Date) => Meal[];
  removeMeal: (mealId: string) => void;
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
  // Initialize with some default meals for today
  const today = new Date().toISOString().split('T')[0];
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
  const addMeal = (
  recipe: {
    id: string;
    title: string;
    image: string;
    cookingTime: string;
    calories: number;
  },
  date: Date,
  mealType: 'breakfast' | 'lunch' | 'dinner') =>
  {
    const timeMap = {
      breakfast: '8:00 AM',
      lunch: '12:30 PM',
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
  return (
    <MealPlanContext.Provider
      value={{
        meals,
        addMeal,
        updateMeal,
        getMealsForDate,
        removeMeal
      }}>

      {children}
    </MealPlanContext.Provider>);

};