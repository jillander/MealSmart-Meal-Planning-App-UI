import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { IngredientCaptureScreen } from './components/IngredientCaptureScreen';
import { RecipeDetailScreen } from './components/RecipeDetailScreen';
import { MealCompletionScreen } from './components/MealCompletionScreen';
import { MealPrepScreen } from './components/MealPrepScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { WeeklyPlanScreen } from './components/WeeklyPlanScreen';
import { NavigationBar } from './components/NavigationBar';
import { RecipeImportGuide } from './components/RecipeImportGuide';
import { IngredientConfirmationScreen } from './components/IngredientConfirmationScreen';
import { RecipeSuggestionScreen } from './components/RecipeSuggestionScreen';
import { RecipeDiscoveryScreen } from './components/RecipeDiscoveryScreen';
import { RecipeGenerationLoadingScreen } from './components/RecipeGenerationLoadingScreen';
export function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showMealCompletion, setShowMealCompletion] = useState(false);
  const [showImportGuide, setShowImportGuide] = useState(false);
  const [confirmedIngredients, setConfirmedIngredients] = useState<any[]>([]);
  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };
  return <div className="w-full min-h-screen bg-[#F8F9FA] font-['Roboto']">
      {/* Import Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600&display=swap');
      `}</style>

      <div className="max-w-[430px] mx-auto relative min-h-screen pb-[72px]">
        {currentScreen === 'home' && <HomeScreen navigateTo={navigateTo} />}
        {currentScreen === 'ingredient-capture' && <IngredientCaptureScreen navigateTo={navigateTo} />}
        {currentScreen === 'recipe-detail' && <RecipeDetailScreen navigateTo={navigateTo} onMarkAsPrepared={() => setShowMealCompletion(true)} />}
        {currentScreen === 'meal-prep' && <MealPrepScreen navigateTo={navigateTo} />}
        {currentScreen === 'progress' && <ProgressScreen navigateTo={navigateTo} />}
        {currentScreen === 'settings' && <SettingsScreen navigateTo={navigateTo} />}
        {currentScreen === 'weekly-plan' && <WeeklyPlanScreen navigateTo={navigateTo} />}
        {showMealCompletion && <MealCompletionScreen onClose={() => {
        setShowMealCompletion(false);
        setCurrentScreen('home');
      }} />}
        {showImportGuide && <RecipeImportGuide onClose={() => setShowImportGuide(false)} onImport={() => {
        setShowImportGuide(false);
        // Additional import logic here if needed
      }} />}
        {currentScreen === 'ingredient-confirmation' && <IngredientConfirmationScreen navigateTo={navigateTo} onConfirm={ingredients => {
        setConfirmedIngredients(ingredients);
        navigateTo('recipe-generation-loading');
      }} />}
        {currentScreen === 'recipe-generation-loading' && <RecipeGenerationLoadingScreen onComplete={() => navigateTo('recipe-discovery')} ingredients={confirmedIngredients.map(ing => ing.name)} />}
        {currentScreen === 'recipe-suggestions' && <RecipeSuggestionScreen navigateTo={navigateTo} />}
        {currentScreen === 'recipe-discovery' && <RecipeDiscoveryScreen navigateTo={navigateTo} />}

        <NavigationBar currentScreen={currentScreen} navigateTo={navigateTo} onShowImportGuide={() => setShowImportGuide(true)} />
      </div>
    </div>;
}