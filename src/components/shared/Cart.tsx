import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

interface CartProps {
  theme: 'winter' | 'christmas' | 'newyear';
}

const Cart: React.FC<CartProps> = ({ theme }) => {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const getThemeStyles = () => {
    switch (theme) {
      case 'winter':
        return {
          button: 'bg-[#A5F2F3] text-blue-900 hover:bg-[#D4F1F9]',
          panel: 'bg-white/95 backdrop-blur-lg border-[#A5F2F3]',
        };
      case 'christmas':
        return {
          button: 'bg-[#EA4630] text-white hover:bg-[#146B3A]',
          panel: 'bg-white/95 backdrop-blur-lg border-[#EA4630]',
        };
      case 'newyear':
        return {
          button: 'bg-[#F7E7CE] text-black hover:bg-[#E8E8E8]',
          panel: 'bg-black/95 backdrop-blur-lg border-[#F7E7CE] text-white',
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg ${styles.button}`}
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className={`absolute right-0 top-0 h-full w-full max-w-md ${styles.panel} shadow-xl p-6 overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-center py-8 text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg">
                    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm opacity-75">${(item.discountPrice || item.price).toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button
                    className={`w-full mt-4 py-3 rounded-lg ${styles.button}`}
                    onClick={() => {
                      // Here we would integrate with Stripe for checkout
                      alert('Stripe checkout will be integrated here');
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;