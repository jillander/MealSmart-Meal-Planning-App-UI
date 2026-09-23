import type { HubRecipe } from '../utils/hubFilters';

/**
 * The Discover pool. Every recipe carries its own ingredient list so search
 * can match on "what I have" as well as on dish names.
 *
 * Tags are canonical: meal (Breakfast/Lunch/Dinner/Snack), cuisine, and
 * dietary needs all use the exact labels the Filters sheet offers, so search
 * chips and filter chips are one shared state.
 */

export const forYouRecipes: HubRecipe[] = [
{
  id: '1',
  title: 'Mediterranean Bowl',
  description: 'Warm grains, roasted veg and feta with a lemon dressing.',
  image:
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 95,
  cookingTime: '25 min',
  calories: 420,
  protein: 22,
  difficulty: 'Medium',
  tags: ['Lunch', 'Vegetarian', 'Mediterranean'],
  ingredients: ['Rice', 'Chickpeas', 'Feta', 'Spinach', 'Tomatoes', 'Olive oil'],
  saved: false,
  liked: false
},
{
  id: '2',
  title: 'Avocado Toast with Eggs',
  description: 'Smashed avocado on sourdough with soft-boiled eggs.',
  image:
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 92,
  cookingTime: '15 min',
  calories: 350,
  protein: 19,
  difficulty: 'Easy',
  tags: ['Breakfast', 'High protein', 'Vegetarian'],
  ingredients: ['Eggs', 'Avocado', 'Bread', 'Chilli flakes', 'Lemon'],
  saved: false,
  liked: false
},
{
  id: '3',
  title: 'Chicken Stir-Fry',
  description: 'Fast wok stir-fry with broccoli and a soy-ginger glaze.',
  image:
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 88,
  cookingTime: '20 min',
  calories: 480,
  protein: 41,
  difficulty: 'Medium',
  tags: ['Dinner', 'High protein', 'Asian', 'Dairy-free'],
  ingredients: ['Chicken', 'Broccoli', 'Rice', 'Soy sauce', 'Ginger', 'Garlic'],
  saved: false,
  liked: false
},
{
  id: '4',
  title: 'Berry Smoothie Bowl',
  description: 'Blended frozen berries topped with granola and seeds.',
  image:
  'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 85,
  cookingTime: '10 min',
  calories: 320,
  protein: 12,
  difficulty: 'Easy',
  tags: ['Breakfast', 'Vegan', 'Dairy-free'],
  ingredients: ['Berries', 'Banana', 'Oats', 'Almond milk', 'Chia seeds'],
  saved: false,
  liked: false
}];


export const perfectMatchRecipes: HubRecipe[] = [
{
  id: '5',
  title: 'Quinoa Salad Bowl',
  description: 'Herby quinoa salad with cucumber, feta and chickpeas.',
  image:
  'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 98,
  cookingTime: '30 min',
  calories: 380,
  protein: 18,
  difficulty: 'Easy',
  tags: ['Lunch', 'Vegetarian', 'Gluten-free', 'Mediterranean'],
  ingredients: ['Quinoa', 'Cucumber', 'Feta', 'Chickpeas', 'Lemon', 'Parsley'],
  saved: false,
  liked: false
},
{
  id: '6',
  title: 'Grilled Salmon',
  description: 'Crisp-skinned salmon with greens and a caper butter.',
  image:
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 94,
  cookingTime: '25 min',
  calories: 450,
  protein: 44,
  difficulty: 'Medium',
  tags: ['Dinner', 'High protein', 'Gluten-free', 'Mediterranean'],
  ingredients: ['Salmon', 'Spinach', 'Lemon', 'Butter', 'Capers'],
  saved: false,
  liked: false
},
{
  id: '7',
  title: 'Veggie Pasta',
  description: 'Pasta tossed with courgette, tomatoes and basil.',
  image:
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 92,
  cookingTime: '35 min',
  calories: 520,
  protein: 17,
  difficulty: 'Easy',
  tags: ['Dinner', 'Vegetarian', 'Italian'],
  ingredients: ['Pasta', 'Courgette', 'Tomatoes', 'Basil', 'Parmesan', 'Garlic'],
  saved: false,
  liked: false
}];


export const quickAndEasyRecipes: HubRecipe[] = [
{
  id: '8',
  title: '5-Minute Breakfast Wrap',
  description: 'Scrambled eggs and spinach rolled into a warm tortilla.',
  image:
  'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 82,
  cookingTime: '5 min',
  calories: 280,
  protein: 21,
  difficulty: 'Easy',
  tags: ['Breakfast', 'High protein'],
  ingredients: ['Eggs', 'Spinach', 'Tortilla', 'Cheddar'],
  saved: false,
  liked: false
},
{
  id: '9',
  title: 'Microwave Egg Bowl',
  description: 'Eggs, rice and greens in one bowl, straight from the microwave.',
  image:
  'https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 78,
  cookingTime: '8 min',
  calories: 320,
  protein: 24,
  difficulty: 'Easy',
  tags: ['Breakfast', 'High protein', 'Gluten-free'],
  ingredients: ['Eggs', 'Rice', 'Spinach', 'Soy sauce'],
  saved: false,
  liked: false
},
{
  id: '10',
  title: 'Quick Tuna Salad',
  description: 'Tuna, white beans and rocket with a mustard dressing.',
  image:
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 85,
  cookingTime: '12 min',
  calories: 350,
  protein: 32,
  difficulty: 'Easy',
  tags: ['Lunch', 'High protein', 'Gluten-free', 'Dairy-free'],
  ingredients: ['Tuna', 'White beans', 'Rocket', 'Lemon', 'Olive oil'],
  saved: false,
  liked: false
},
{
  id: '16',
  title: 'Peanut Butter Oat Bites',
  description: 'No-bake oat and peanut butter bites for the afternoon dip.',
  image:
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 80,
  cookingTime: '10 min',
  calories: 210,
  protein: 9,
  difficulty: 'Easy',
  tags: ['Snack', 'Vegetarian', 'Gluten-free'],
  ingredients: ['Oats', 'Peanut butter', 'Honey', 'Dark chocolate'],
  saved: false,
  liked: false
}];


export const trendingRecipes: HubRecipe[] = [
{
  id: '11',
  title: 'Korean Bibimbap',
  description: 'Rice bowl with seasoned vegetables, beef and a fried egg.',
  image:
  'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 76,
  cookingTime: '40 min',
  calories: 550,
  protein: 35,
  difficulty: 'Medium',
  trending: true,
  tags: ['Dinner', 'Asian'],
  ingredients: ['Rice', 'Beef', 'Eggs', 'Spinach', 'Carrot', 'Gochujang'],
  saved: false,
  liked: false
},
{
  id: '12',
  title: 'Acai Smoothie Bowl',
  description: 'Acai blended with banana, topped with coconut and berries.',
  image:
  'https://images.unsplash.com/photo-1590080874088-eec64895b423?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 80,
  cookingTime: '15 min',
  calories: 310,
  protein: 11,
  difficulty: 'Easy',
  trending: true,
  tags: ['Breakfast', 'Vegan', 'Dairy-free'],
  ingredients: ['Acai', 'Banana', 'Berries', 'Coconut', 'Almond milk'],
  saved: false,
  liked: false
},
{
  id: '13',
  title: 'Cauliflower Tacos',
  description: 'Charred cauliflower tacos with lime slaw and black beans.',
  image:
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 72,
  cookingTime: '30 min',
  calories: 420,
  protein: 16,
  difficulty: 'Medium',
  trending: true,
  tags: ['Dinner', 'Vegetarian', 'Mexican'],
  ingredients: ['Cauliflower', 'Black beans', 'Tortilla', 'Lime', 'Cabbage'],
  saved: false,
  liked: false
},
{
  id: '17',
  title: 'Spicy Peanut Noodles',
  description: 'Noodles in a chilli-peanut sauce with chicken and greens.',
  image:
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 90,
  cookingTime: '20 min',
  calories: 540,
  protein: 38,
  difficulty: 'Easy',
  trending: true,
  tags: ['Dinner', 'High protein', 'Asian', 'Dairy-free'],
  ingredients: ['Pasta', 'Chicken', 'Peanut butter', 'Soy sauce', 'Spinach', 'Chilli'],
  saved: false,
  liked: false
}];


export const pantryRecipes: HubRecipe[] = [
{
  id: '14',
  title: 'Pantry Pasta',
  description: 'Storecupboard pasta with garlic, chilli and parmesan.',
  image:
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 100,
  cookingTime: '20 min',
  calories: 450,
  protein: 18,
  difficulty: 'Easy',
  tags: ['Dinner', 'Vegetarian', 'Italian'],
  ingredients: ['Pasta', 'Garlic', 'Chilli', 'Parmesan', 'Olive oil'],
  saved: false,
  liked: false
},
{
  id: '15',
  title: 'Bean & Rice Bowl',
  description: 'Black beans over rice with lime, coriander and salsa.',
  image:
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 100,
  cookingTime: '25 min',
  calories: 380,
  protein: 17,
  difficulty: 'Easy',
  tags: ['Lunch', 'Vegan', 'Gluten-free', 'Dairy-free', 'Mexican'],
  ingredients: ['Rice', 'Black beans', 'Lime', 'Coriander', 'Tomatoes'],
  saved: false,
  liked: false
},
{
  id: '18',
  title: 'Creamy Salmon Pasta',
  description: 'Rigatoni with flaked salmon, peas, asparagus and dill.',
  image:
  'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 96,
  cookingTime: '25 min',
  calories: 560,
  protein: 39,
  difficulty: 'Easy',
  tags: ['Dinner', 'High protein', 'Italian'],
  ingredients: ['Pasta', 'Salmon', 'Peas', 'Asparagus', 'Cream', 'Dill'],
  saved: false,
  liked: false
},
{
  id: '19',
  title: 'Chicken Pesto Pasta',
  description: 'Pasta folded through basil pesto with roast chicken.',
  image:
  'https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 93,
  cookingTime: '20 min',
  calories: 610,
  protein: 45,
  difficulty: 'Easy',
  tags: ['Dinner', 'High protein', 'Italian'],
  ingredients: ['Pasta', 'Chicken', 'Pesto', 'Parmesan', 'Spinach'],
  saved: false,
  liked: false
},
{
  id: '20',
  title: 'One-Pot Chicken Orzo',
  description: 'Orzo pasta simmered with chicken thighs, lemon and greens.',
  image:
  'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 91,
  cookingTime: '35 min',
  calories: 580,
  protein: 42,
  difficulty: 'Medium',
  tags: ['Dinner', 'High protein', 'Mediterranean'],
  ingredients: ['Pasta', 'Chicken', 'Lemon', 'Spinach', 'Garlic', 'Stock'],
  saved: false,
  liked: false
},
{
  id: '21',
  title: 'Tomato Chicken Pasta Bake',
  description: 'Baked pasta with chicken, tomatoes and melted mozzarella.',
  image:
  'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 89,
  cookingTime: '45 min',
  calories: 640,
  protein: 46,
  difficulty: 'Medium',
  tags: ['Dinner', 'High protein', 'Italian'],
  ingredients: ['Pasta', 'Chicken', 'Tomatoes', 'Mozzarella', 'Garlic', 'Basil'],
  saved: false,
  liked: false
},
{
  id: '22',
  title: 'Tofu Poke Bowl',
  description: 'Marinated tofu over rice with avocado, edamame and sesame.',
  image:
  'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 87,
  cookingTime: '20 min',
  calories: 430,
  protein: 26,
  difficulty: 'Easy',
  tags: ['Lunch', 'Vegan', 'High protein', 'Dairy-free', 'Asian'],
  ingredients: ['Tofu', 'Rice', 'Avocado', 'Edamame', 'Soy sauce', 'Sesame'],
  saved: false,
  liked: false
},
{
  id: '23',
  title: 'Spiced Chickpea Soup',
  description: 'Chickpeas simmered with cumin, tomatoes and spinach.',
  image:
  'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  matchPercentage: 84,
  cookingTime: '30 min',
  calories: 340,
  protein: 19,
  difficulty: 'Easy',
  tags: ['Lunch', 'Vegan', 'Gluten-free', 'Dairy-free', 'Indian'],
  ingredients: ['Chickpeas', 'Tomatoes', 'Spinach', 'Cumin', 'Onion', 'Stock'],
  saved: false,
  liked: false
}];


/** One pool for search and filtering; rails still render their own groups. */
export const allHubRecipes: HubRecipe[] = [
...forYouRecipes,
...perfectMatchRecipes,
...quickAndEasyRecipes,
...trendingRecipes,
...pantryRecipes].
filter((recipe, index, list) => list.findIndex((entry) => entry.id === recipe.id) === index);