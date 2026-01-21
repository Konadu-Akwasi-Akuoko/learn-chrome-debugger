'use client';

import { useCartStore } from '@/stores/useCartStore';
import type { CartItem as CartItemType } from '@/types/cart';

const sizes = ['S', 'M', 'L', 'XL'];
const colors = ['black', 'white', 'blue', 'red', 'gray'];

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const selectedItemId = useCartStore((state) => state.ui.selectedItemId);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemSize = useCartStore((state) => state.updateItemSize);
  const updateItemColor = useCartStore((state) => state.updateItemColor);
  const selectItem = useCartStore((state) => state.selectItem);

  const isSelected = selectedItemId === item.id;
  const hasSize = item.options.size !== undefined;

  return (
    <div
      onClick={() => selectItem(isSelected ? null : item.id)}
      className={`cursor-pointer rounded-lg border p-4 transition-all ${
        isSelected
          ? 'border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-800'
          : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-200 text-2xl dark:bg-zinc-700">
            📦
          </div>
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
              {item.name}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              ${item.price.toFixed(2)} each
            </p>
            {item.options.color && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Color: {item.options.color}
                {item.options.size && ` | Size: ${item.options.size}`}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeItem(item.id);
          }}
          className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
          aria-label="Remove item"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              decrementQuantity(item.id);
            }}
            disabled={item.quantity <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700"
          >
            -
          </button>
          <span className="w-8 text-center font-medium text-zinc-900 dark:text-zinc-100">
            {item.quantity}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              decrementQuantity(item.id);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700"
          >
            +
          </button>
        </div>
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {isSelected && (
        <div className="mt-4 space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-700">
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Color
            </label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateItemSize(item.id, color);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                    item.options.color === color
                      ? 'border-2 border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                      : 'border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {hasSize && (
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Size
              </label>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateItemColor(item.id, size);
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded text-xs font-medium transition-colors ${
                      item.options.size === size
                        ? 'border-2 border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                        : 'border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
