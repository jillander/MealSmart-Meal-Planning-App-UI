import React from 'react';
interface IngredientProgressProps {
  used: number;
  total: number;
  expiringCount: number;
  ingredients: Array<{
    name: string;
    image: string;
  }>;
}
export const IngredientProgress: React.FC<IngredientProgressProps> = ({
  used,
  total,
  expiringCount,
  ingredients
}) => {
  const percentage = used / total * 100;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Ingredient Status
      </h2>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Ingredients Used: {used}/{total}
          </span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4CAF50] transition-all duration-500"
            style={{
              width: `${percentage}%`
            }}>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {total - used} ingredients remaining
        </p>
      </div>
      {/* Ingredient Thumbnails */}
      <div className="flex space-x-2 mb-3">
        {ingredients.slice(0, 4).map((ingredient, index) =>
        <div
          key={index}
          className="w-10 h-10 rounded-full overflow-hidden shadow-sm">

            <img
            src={ingredient.image}
            alt={ingredient.name}
            className="w-full h-full object-cover" />

          </div>
        )}
      </div>
      {/* Expiring Alert */}
      {expiringCount > 0 &&
      <p className="text-sm text-[#F44336] font-medium">
          {expiringCount} items expiring tomorrow
        </p>
      }
    </div>);

};