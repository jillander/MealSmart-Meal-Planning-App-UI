/** App Store listing copy for Cal Pal. Single source for the marketing surface. */

export const storeName = 'Cal Pal: Scan Fridge to Recipe';

/** 30 characters max, shown under the icon. */
export const storeSubtitle = 'Cook what you already have';

/** 170 characters max, the promotional text slot. */
export const storePromo =
'Point your camera at your fridge. Cal Pal finds recipes you can cook right now — and keeps every meal inside your calorie and protein targets.';

/** 100 characters max, comma-separated, no spaces after commas. */
export const storeKeywords =
'fridge scan,ingredient,recipe,calorie counter,macro,meal plan,grocery list,leftovers,protein';

export interface DescriptionSection {
  heading?: string;
  /** Paragraph text, rendered before any bullets. */
  body?: string;
  bullets?: string[];
}

export const storeDescription: DescriptionSection[] = [
{
  body: "You already have food in your kitchen. Cal Pal turns it into dinner.\n\nScan your fridge, your counter, or your grocery receipt. Cal Pal identifies what you have and instantly matches it to recipes you can actually cook tonight — every one of them sized to your calorie and macro targets. No blank search bar. No recipe that needs six things you don't own."
},
{
  heading: 'SCAN YOUR KITCHEN, GET REAL ANSWERS',
  body: 'Most food apps start with a question you can\'t answer: "what did you eat?" Cal Pal starts with what\'s in front of you.',
  bullets: [
  'Point your camera at your fridge, counter, or pantry',
  'Cal Pal identifies every ingredient it can see',
  'Edit or add anything it missed in one tap',
  'Get matched recipes ranked by how much of your food they use',
  'Scan a grocery receipt to stock your kitchen in seconds']

},
{
  heading: 'TOP CAL PAL FEATURES',
  bullets: [
  'Fridge and receipt scanning with instant ingredient detection',
  'Recipe matching scored against what you actually have',
  'Adaptive calorie and macro targets that adjust as you go',
  'Weight projection chart with your personal goal date',
  'Weekly meal planner with drag-and-drop meals',
  'Shopping lists built from the meals you chose, grouped by aisle',
  'Recipe discovery with filters for time, diet, protein, and cuisine',
  'Meal reminders for breakfast, lunch, and dinner',
  'Progress tracking for weight, streaks, and plan adherence']

},
{
  heading: 'A PLAN BUILT AROUND YOUR GOAL',
  body: 'Tell Cal Pal your goal, your pace, and how you like to eat. It works out your daily calories, protein, carbs, and fats — then shows you exactly when you\'ll reach your target weight. As your weight changes, your numbers change with it. Whether you\'re losing, gaining, or maintaining, the plan stays realistic and adjusts to real life rather than punishing you for it.'
},
{
  heading: 'SHOPPING LISTS THAT WRITE THEMSELVES',
  body: 'Found a recipe you love but missing two ingredients? Cal Pal adds only what you need to your shopping list, grouped by supermarket aisle and labelled with the meal it belongs to. Tick items off as you shop, then scan what you bought so your kitchen stays up to date.'
},
{
  heading: 'DISCOVER FOOD YOU ACTUALLY WANT TO EAT',
  body: 'Browse a library of recipes filtered by everything that matters: how long you have, what you can eat, how much protein you need, and what cuisine you\'re in the mood for. Every recipe shows its calories and macros up front, so you know it fits before you start cooking.'
},
{
  heading: 'LESS WASTE, LESS SPEND, LESS THINKING',
  bullets: [
  'Use what you already bought instead of throwing it away',
  'Stop buying duplicates of things sitting in your fridge',
  'Skip the nightly "what should we eat?" negotiation',
  'Hit your targets without weighing every single thing']

},
{
  heading: 'CAL PAL PLUS',
  body: 'Cal Pal is free to download with a limited number of scans and recipe matches each month. Cal Pal Plus unlocks unlimited scanning and matching, adaptive targets, the full recipe library, weekly planning, and progress tracking.\n\nPlus is available as 1-month, 3-month, and 12-month auto-renewing subscriptions. Payment is charged to your Apple Account at confirmation of purchase. Your subscription renews automatically unless auto-renew is turned off at least 24 hours before the end of the current period. You can manage or cancel your subscription in your Apple Account settings at any time.'
},
{
  body: 'Open the fridge. Point the camera. Eat something good.'
}];


/** Flattened plain-text version for pasting into App Store Connect. */
export function buildDescriptionText(): string {
  return storeDescription.
  map((section) => {
    const parts: string[] = [];
    if (section.heading) parts.push(section.heading);
    if (section.body) parts.push(section.body);
    if (section.bullets) parts.push(section.bullets.map((bullet) => `• ${bullet}`).join('\n'));
    return parts.join('\n');
  }).
  join('\n\n');
}