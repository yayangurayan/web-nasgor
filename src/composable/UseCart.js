import { ref, computed, watch } from 'vue';

// State global (di luar fungsi agar persist antar komponen)
const cart = ref([]);
const isCartOpen = ref(false);

export function useCart() {
  
  // Load from localStorage on init
  const initializeCart = () => {
    if (localStorage.getItem('cart_v2')) {
      cart.value = JSON.parse(localStorage.getItem('cart_v2'));
    }
  };

  // Watcher untuk auto-save ke localStorage
  watch(cart, (newCart) => {
    localStorage.setItem('cart_v2', JSON.stringify(newCart));
  }, { deep: true });

  // Actions
  const addToCart = (product, notes = '') => {
    const existingItem = cart.value.find(
      item => item.id === product.id && item.notes === notes
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({
        ...product,
        quantity: 1,
        notes: notes
      });
    }
    // Buka sidebar otomatis saat tambah item (optional UX)
    // isCartOpen.value = true; 
  };

  const removeFromCart = (index) => {
    cart.value.splice(index, 1);
  };

  const updateQuantity = (index, delta) => {
    const item = cart.value[index];
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        removeFromCart(index);
      }
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  // Getters
  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  return {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    cartTotal,
    cartCount,
    initializeCart
  };
}