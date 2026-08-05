export type GroceryAisle = 'Produce' | 'Protein' | 'Dairy' | 'Pantry' | 'Other';

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity?: string;
  aisle: GroceryAisle;
  /** The recipe this item was added for, when it came from one. */
  recipeName?: string;
  /** Thumbnail of that recipe, used for the meal rail at the top of the list. */
  recipeImage?: string;
  /** When the meal is planned for, e.g. "Tonight" or "Thu 7 Aug". */
  plannedFor?: string;
  checked: boolean;
}

export interface ShoppingListDraftItem {
  name: string;
  quantity?: string;
  aisle?: GroceryAisle;
  recipeName?: string;
  recipeImage?: string;
  plannedFor?: string;
}

/** A recipe on the list, with how many of its ingredients are still needed. */
export interface ShoppingListMeal {
  name: string;
  image?: string;
  plannedFor?: string;
  total: number;
  remaining: number;
}