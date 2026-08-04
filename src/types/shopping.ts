export type GroceryAisle = 'Produce' | 'Protein' | 'Dairy' | 'Pantry' | 'Other';

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity?: string;
  aisle: GroceryAisle;
  /** The recipe this item was added for, when it came from one. */
  recipeName?: string;
  checked: boolean;
}

export interface ShoppingListDraftItem {
  name: string;
  quantity?: string;
  aisle?: GroceryAisle;
  recipeName?: string;
}