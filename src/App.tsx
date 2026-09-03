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
import { RecipeErrorScreen } from './components/RecipeErrorScreen';
import { ShoppingListScreen } from './components/ShoppingListScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { LogoConceptsScreen } from './components/LogoConceptsScreen';
import { AppStoreAssetsScreen } from './components/marketing/AppStoreAssetsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SnapMealScreen } from './components/foodlog/SnapMealScreen';
import { ToastNotification } from './components/ToastNotification';
import type { MealSlot } from './types/foodLog';
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
    // A canvas/preview screen that targets an onboarding step must always show
    // the onboarding flow, regardless of any saved completion flag.
    if (screenInit.onboardingStep != null) return false;
    return (
      Boolean(screenInit.currentScreen) ||
      typeof window !== 'undefined' &&
      window.localStorage.getItem('cal-pal-onboarding-complete') === 'true');

  });
  const [showMealCompletion, setShowMealCompletion] = useState(false);
  const [snapMealSlot, setSnapMealSlot] = useState<MealSlot | null>(
    () => screenInit.snapMealSlot as MealSlot | undefined ?? null
  );
  const [logToast, setLogToast] = useState('');
  const [showImportGuide, setShowImportGuide] = useState(false);
  const [categoryData, setCategoryData] = useState<{
    id: string;
    label: string;
  } | null>(null);
  // Recipe matching can come back empty. `generationAttempt` remounts the
  // loading screen so a retry runs a genuinely fresh pass.
  const [generationAttempt, setGenerationAttempt] = useState(1);
  const [generationShouldFail, setGenerationShouldFail] = useState(
    () => Boolean(screenInit.recipeGenerationFails)
  );
  const retryRecipeGeneration = () => {
    // A retry always attempts a real match rather than replaying the failure.
    setGenerationShouldFail(false);
    setGenerationAttempt((attempt) => attempt + 1);
    setCurrentScreen('recipe-loading');
  };
  const navigateTo = (screen: string) => {
    // "snap-meal:<mealType>" preselects the slot the user tapped.
    if (screen.startsWith('snap-meal')) {
      const [, slot] = screen.split(':');
      setSnapMealSlot(slot as MealSlot | undefined ?? null);
      setCurrentScreen('snap-meal');
      return;
    }
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
          onComplete={() => {
            window.localStorage.setItem('cal-pal-onboarding-complete', 'true');
            setHasCompletedOnboarding(true);
            // The selected activation action is already complete before membership.
            // Land on Today so the newly added meal is immediately visible.
            setCurrentScreen('home');
          }} /> :


        <div className="max-w-[430px] mx-auto relative min-h-screen pb-[72px]">
          {currentScreen === 'logo-concepts' &&
          <LogoConceptsScreen navigateTo={navigateTo} />
          }
          {currentScreen === 'app-store' &&
          <AppStoreAssetsScreen navigateTo={navigateTo} />
          }
          {currentScreen === 'profile' &&
          <ProfileScreen navigateTo={navigateTo} />
          }
          {currentScreen === 'snap-meal' &&
          <SnapMealScreen
            navigateTo={navigateTo}
            initialMealSlot={snapMealSlot ?? undefined}
            onLogged={(summary) => {
              setLogToast(summary);
              window.setTimeout(() => setLogToast(''), 2600);
            }} />

          }
          {logToast && <ToastNotification message={logToast} />}
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
          <SubscriptionScreen
            navigateTo={navigateTo}
            startActive={Boolean(screenInit.subscriptionActive)} />

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
          <RecipeLoadingScreen
            key={generationAttempt}
            navigateTo={navigateTo}
            shouldFail={generationShouldFail} />

          }
          {currentScreen === 'recipe-error' &&
          <RecipeErrorScreen
            navigateTo={navigateTo}
            onRetry={retryRecipeGeneration}
            attempt={generationAttempt} />

          }
          {currentScreen === 'shopping-list' &&
          <ShoppingListScreen
            navigateTo={navigateTo}
            startEmpty={Boolean(screenInit.shoppingListEmpty)} />

          }
          {currentScreen === 'notifications' &&
          <NotificationsScreen navigateTo={navigateTo} />
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

          {/* The camera and its review step are full-screen tasks */}
          {currentScreen !== 'snap-meal' &&
          <NavigationBar
            currentScreen={currentScreen}
            navigateTo={navigateTo}
            onShowImportGuide={() => setShowImportGuide(true)} />

          }
          </div>
        }
      </div>
    </MealPlanProvider>);

}