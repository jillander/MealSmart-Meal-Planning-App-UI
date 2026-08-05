import type { DiscoverRecipe } from '../types/discover';

export const discoverRecipes: DiscoverRecipe[] = [
{
  id: '1',
  title: '15-Minute Healthy Breakfast Bowl',
  video: 'https://example.com/video1.mp4',
  thumbnail:
  'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  timeMinutes: 15,
  difficulty: 'Easy',
  calories: 410,
  protein: 24,
  mealTypes: ['Breakfast'],
  cuisine: 'American',
  dietary: ['Vegetarian', 'Gluten-free'],
  collections: ['under-20', 'macros'],
  likes: 1234,
  saved: false,
  liked: false,
  creator: {
    name: 'HealthyEats',
    avatar:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  description:
  'Start your day right with this nutritious and delicious breakfast bowl! Packed with protein and healthy fats.'
},
{
  id: '2',
  title: 'One-Pan Chicken Stir Fry',
  video: 'https://example.com/video2.mp4',
  thumbnail:
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  timeMinutes: 20,
  difficulty: 'Medium',
  calories: 520,
  protein: 42,
  mealTypes: ['Lunch', 'Dinner'],
  cuisine: 'Asian',
  dietary: ['High protein', 'Dairy-free'],
  collections: ['one-pan', 'high-protein', 'under-20', 'meal-prep'],
  likes: 2567,
  saved: false,
  liked: false,
  creator: {
    name: 'QuickMeals',
    avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  description:
  "A quick and easy weeknight dinner that's packed with vegetables and protein. Perfect for meal prep!"
},
{
  id: '3',
  title: 'Smoky Black Bean Tacos',
  video: 'https://example.com/video3.mp4',
  thumbnail:
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  timeMinutes: 25,
  difficulty: 'Easy',
  calories: 480,
  protein: 19,
  mealTypes: ['Lunch', 'Dinner'],
  cuisine: 'Mexican',
  dietary: ['Vegan', 'Vegetarian', 'Dairy-free'],
  collections: ['meal-prep'],
  likes: 1876,
  saved: false,
  liked: false,
  creator: {
    name: 'PlantPlate',
    avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    verified: false
  },
  description:
  'Charred black beans, quick-pickled onion and a smoky chipotle crema — weeknight food with real personality.'
},
{
  id: '4',
  title: 'High-Protein Greek Chicken Bowls',
  video: 'https://example.com/video4.mp4',
  thumbnail:
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  timeMinutes: 35,
  difficulty: 'Medium',
  calories: 560,
  protein: 48,
  mealTypes: ['Lunch', 'Dinner'],
  cuisine: 'Mediterranean',
  dietary: ['High protein', 'Gluten-free'],
  collections: ['high-protein', 'meal-prep', 'macros'],
  likes: 3421,
  saved: false,
  liked: false,
  creator: {
    name: 'MacroKitchen',
    avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  description:
  'Four bowls, one tray. Marinated chicken, lemon rice and herby yoghurt that holds up all week in the fridge.'
},
{
  id: '5',
  title: '10-Minute Miso Noodle Soup',
  video: 'https://example.com/video5.mp4',
  thumbnail:
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  timeMinutes: 10,
  difficulty: 'Easy',
  calories: 320,
  protein: 16,
  mealTypes: ['Lunch', 'Dinner'],
  cuisine: 'Asian',
  dietary: ['Vegetarian', 'Dairy-free', 'Low carb'],
  collections: ['under-20', 'one-pan'],
  likes: 942,
  saved: false,
  liked: false,
  creator: {
    name: 'BrothClub',
    avatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    verified: false
  },
  description:
  'The fastest warming bowl in your rotation. Miso, ginger and greens, ready before the kettle cools.'
},
{
  id: '6',
  title: 'Freezer-Friendly Beef Ragu',
  video: 'https://example.com/video6.mp4',
  thumbnail:
  'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  timeMinutes: 75,
  difficulty: 'Advanced',
  calories: 640,
  protein: 45,
  mealTypes: ['Dinner'],
  cuisine: 'Italian',
  dietary: ['High protein'],
  collections: ['freezer', 'meal-prep', 'one-pan'],
  likes: 4108,
  saved: false,
  liked: false,
  creator: {
    name: 'SlowSunday',
    avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  description:
  'Make it once, eat it four times. A deep, slow-built ragu that freezes beautifully in single portions.'
},
{
  id: '7',
  title: 'Coconut Chickpea Curry',
  video: 'https://example.com/video7.mp4',
  thumbnail:
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  timeMinutes: 30,
  difficulty: 'Easy',
  calories: 495,
  protein: 21,
  mealTypes: ['Dinner'],
  cuisine: 'Indian',
  dietary: ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free'],
  collections: ['one-pan', 'freezer', 'meal-prep'],
  likes: 2233,
  saved: false,
  liked: false,
  creator: {
    name: 'SpiceRoute',
    avatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    verified: false
  },
  description:
  'One pot, pantry staples, and a sauce good enough to eat with a spoon. Better on day two.'
},
{
  id: '8',
  title: 'Cottage Cheese Protein Toast',
  video: 'https://example.com/video8.mp4',
  thumbnail:
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  timeMinutes: 8,
  difficulty: 'Easy',
  calories: 290,
  protein: 28,
  mealTypes: ['Breakfast', 'Snack'],
  cuisine: 'American',
  dietary: ['Vegetarian', 'High protein'],
  collections: ['under-20', 'high-protein', 'macros'],
  likes: 1502,
  saved: false,
  liked: false,
  creator: {
    name: 'MacroKitchen',
    avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  description:
  'Whipped cottage cheese, chilli honey and seeds — 28g of protein before you have finished your coffee.'
}];