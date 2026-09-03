import type { PlateAnalysis } from '../types/foodLog';

/**
 * Pre-analyzed plates. A real build would return this from the vision model;
 * here each sample photo maps to the result the model would produce.
 */
export const plateAnalyses: PlateAnalysis[] = [
{
  dishName: 'Chicken bowl with rice and greens',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80',
  items: [
  {
    id: 'chicken',
    name: 'Grilled chicken breast',
    portionLabel: '120 g',
    quantity: 1,
    calories: 198,
    protein: 37,
    carbs: 0,
    fat: 4,
    confidence: 0.94
  },
  {
    id: 'rice',
    name: 'Brown rice',
    portionLabel: '1 cup cooked',
    quantity: 1,
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 2,
    confidence: 0.91
  },
  {
    id: 'greens',
    name: 'Mixed greens',
    portionLabel: '1 handful',
    quantity: 1,
    calories: 34,
    protein: 2,
    carbs: 6,
    fat: 0,
    confidence: 0.88
  },
  {
    id: 'dressing',
    name: 'Olive oil dressing',
    portionLabel: '1 tbsp',
    quantity: 1,
    calories: 119,
    protein: 0,
    carbs: 0,
    fat: 14,
    confidence: 0.62
  }]

},
{
  dishName: 'Yogurt bowl with berries and granola',
  image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80',
  items: [
  {
    id: 'yogurt',
    name: 'Greek yogurt',
    portionLabel: '200 g',
    quantity: 1,
    calories: 118,
    protein: 20,
    carbs: 7,
    fat: 1,
    confidence: 0.95
  },
  {
    id: 'granola',
    name: 'Granola',
    portionLabel: '40 g',
    quantity: 1,
    calories: 176,
    protein: 4,
    carbs: 26,
    fat: 7,
    confidence: 0.87
  },
  {
    id: 'berries',
    name: 'Mixed berries',
    portionLabel: '80 g',
    quantity: 1,
    calories: 43,
    protein: 1,
    carbs: 10,
    fat: 0,
    confidence: 0.92
  },
  {
    id: 'honey',
    name: 'Honey',
    portionLabel: '1 tsp',
    quantity: 1,
    calories: 21,
    protein: 0,
    carbs: 6,
    fat: 0,
    confidence: 0.58
  }]

},
{
  dishName: 'Salmon with roasted vegetables',
  image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80',
  items: [
  {
    id: 'salmon',
    name: 'Baked salmon fillet',
    portionLabel: '140 g',
    quantity: 1,
    calories: 292,
    protein: 34,
    carbs: 0,
    fat: 17,
    confidence: 0.93
  },
  {
    id: 'potatoes',
    name: 'Roasted potatoes',
    portionLabel: '150 g',
    quantity: 1,
    calories: 174,
    protein: 3,
    carbs: 33,
    fat: 4,
    confidence: 0.89
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    portionLabel: '100 g',
    quantity: 1,
    calories: 35,
    protein: 3,
    carbs: 7,
    fat: 0,
    confidence: 0.9
  }]

}];


/** Rotates through the samples so repeat logs don't return an identical plate. */
export function getPlateAnalysis(attempt: number): PlateAnalysis {
  const sample = plateAnalyses[attempt % plateAnalyses.length];
  // Hand back a copy so portion edits never mutate the source data.
  return { ...sample, items: sample.items.map((item) => ({ ...item })) };
}