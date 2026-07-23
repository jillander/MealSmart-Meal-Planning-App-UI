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
import { RecipeRecommendationHub } from './components/RecipeRecommendationHub';
import { CategoryBrowseScreen } from './components/CategoryBrowseScreen';
import { SubscriptionScreen } from './components/SubscriptionScreen';
import { RecipeLoadingScreen } from './components/RecipeLoadingScreen';
import { LogoConceptsScreen } from './components/LogoConceptsScreen';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { ReferenceScreen } from './components/reference/ReferenceScreen';
import { MealPlanProvider } from './contexts/MealPlanContext';
import { useScreenInit } from './useScreenInit.js';
export function App() {
  const screenInit = useScreenInit();
  const [currentScreen, setCurrentScreen] = useState(
    () => screenInit.currentScreen ?? 'home'
  );
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return (
      Boolean(screenInit.currentScreen) ||
      typeof window !== 'undefined' &&
      window.localStorage.getItem('cal-pal-onboarding-complete') === 'true');

  });
  const [showMealCompletion, setShowMealCompletion] = useState(false);
  const [showImportGuide, setShowImportGuide] = useState(false);
  const [categoryData, setCategoryData] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const navigateTo = (screen: string) => {
    // Handle category browse navigation with data
    if (screen.startsWith('category-browse:')) {
      const parts = screen.split(':');
      const categoryId = parts[1];
      const categoryLabel = parts[2];
      setCategoryData({
        id: categoryId,
        label: categoryLabel
      });
      setCurrentScreen('category-browse');
    } else {
      setCurrentScreen(screen);
    }
  };
  if (screenInit.reference) {
    return (
      <div className="w-full min-h-screen bg-black font-['Inter']">
        <div className="max-w-[430px] mx-auto relative min-h-screen">
          <ReferenceScreen
            reference={screenInit.reference}
            index={screenInit.refIndex ?? 0} />
          
        </div>
      </div>);

  }
  return (
    <MealPlanProvider>
      <div className="w-full min-h-screen bg-[#F8F9FA] font-['Inter']">
        {!hasCompletedOnboarding ?
        <OnboardingFlow
          initialStep={screenInit.onboardingStep}
          onSignIn={() => {
            window.localStorage.setItem('cal-pal-onboarding-complete', 'true');
            setHasCompletedOnboarding(true);
            setCurrentScreen('settings');
          }}
          onComplete={(path) => {
            window.localStorage.setItem('cal-pal-onboarding-complete', 'true');
            setHasCompletedOnboarding(true);
            setCurrentScreen(
              path === 'scan' ?
              'ingredient-capture' :
              path === 'plan' ?
              'meal-prep' :
              'home'
            );
          }} /> :


        <div className="max-w-[430px] mx-auto relative min-h-screen pb-[72px]">
          {currentScreen === 'logo-concepts' &&
          <LogoConceptsScreen navigateTo={navigateTo} />
          }
          {currentScreen === 'home' &&
          <HomeScreen
            navigateTo={navigateTo}
            initialTab={screenInit.activeTab} />

          }
          {currentScreen === 'ingredient-capture' &&
          <IngredientCaptureScreen
            navigateTo={navigateTo}
            initialTab={screenInit.activeCaptureTab} />

          }
          {currentScreen === 'recipe-detail' &&
          <RecipeDetailScreen
            navigateTo={navigateTo}
            onMarkAsPrepared={() => setShowMealCompletion(true)} />

          }
          {currentScreen === 'meal-prep' &&
          <MealPrepScreen
            navigateTo={navigateTo}
            initialViewType={screenInit.mealPlanView} />

          }
          {currentScreen === 'progress' &&
          <ProgressScreen
            navigateTo={navigateTo}
            initialPeriod={screenInit.progressPeriod} />

          }
          {currentScreen === 'settings' &&
          <SettingsScreen navigateTo={navigateTo} />
          }
          {currentScreen === 'weekly-plan' &&
          <WeeklyPlanScreen navigateTo={navigateTo} />
          }
          {currentScreen === 'subscription' &&
          <SubscriptionScreen navigateTo={navigateTo} />
          }
          {showMealCompletion &&
          <MealCompletionScreen
            onClose={() => {
              setShowMealCompletion(false);
              setCurrentScreen('home');
            }} />

          }
          {showImportGuide &&
          <RecipeImportGuide
            onClose={() => setShowImportGuide(false)}
            onImport={() => {
              setShowImportGuide(false);
              // Additional import logic here if needed
            }} />

          }
          {currentScreen === 'ingredient-confirmation' &&
          <IngredientConfirmationScreen
            navigateTo={navigateTo}
            onConfirm={(ingredients) => {
              console.log('Confirmed ingredients:', ingredients);
              // Add any additional logic here
            }} />

          }
          {currentScreen === 'recipe-loading' &&
          <RecipeLoadingScreen navigateTo={navigateTo} />
          }
          {currentScreen === 'recipe-suggestions' &&
          <RecipeSuggestionScreen navigateTo={navigateTo} />
          }
          {currentScreen === 'recipe-discovery' &&
          <RecipeRecommendationHub navigateTo={navigateTo} />
          }
          {currentScreen === 'category-browse' && categoryData &&
          <CategoryBrowseScreen
            navigateTo={navigateTo}
            categoryId={categoryData.id}
            categoryLabel={categoryData.label} />

          }

          {/* Show navigation bar on all screens */}
          <NavigationBar
            currentScreen={currentScreen}
            navigateTo={navigateTo}
            onShowImportGuide={() => setShowImportGuide(true)} />
          
          </div>
        }
      </div>
    </MealPlanProvider>);

}