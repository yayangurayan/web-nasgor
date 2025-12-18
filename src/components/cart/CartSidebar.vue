<script setup>
import { useCart } from '@/composables/useCart';
import { useCurrency } from '@/composables/useCurrency';

// Define emits agar parent bisa mendengarkan event 'checkout'
const emit = defineEmits(['checkout']);

const { 
  cart, 
  isCartOpen, 
  toggleCart, 
  removeFromCart, 
  updateQuantity, 
  cartTotal 
} = useCart();
const { formatRupiah } = useCurrency();

const handleCheckout = () => {
  if (cart.value.length === 0) return;
  toggleCart(); // Tutup sidebar
  emit('checkout'); // Emit event ke parent (App.vue) untuk buka modal
};
</script>

<template>
  <div>
    <!-- Backdrop Overlay -->
    <div 
      v-if="isCartOpen" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300"
      @click="toggleCart"
    ></div>

    <!-- Sidebar Panel -->
    <div 
      class="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col"
      :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Header -->
      <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 class="text-xl font-bold text-dark flex items-center gap-2">
          <i class="fas fa-shopping-bag text-primary"></i> Keranjang
        </h3>
        <button 
          @click="toggleCart"
          class="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-5 space-y-4">
        <div v-if="cart.length === 0" class="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
            <i class="fas fa-shopping-basket"></i>
          </div>
          <p class="font-medium">Keranjang kamu masih kosong</p>
          <button @click="toggleCart" class="text-primary font-medium hover:underline text-sm">
            Mulai Pesan Sekarang
          </button>
        </div>

        <div 
          v-else
          v-for="(item, index) in cart" 
          :key="index"
          class="flex gap-4 p-3 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow"
        >
          <!-- Item Info -->
          <div class="flex-1">
            <h4 class="font-bold text-dark text-sm">{{ item.name }}</h4>
            <p class="text-primary font-semibold text-xs mt-1">{{ formatRupiah(item.price) }}</p>
            <p v-if="item.notes" class="text-xs text-gray-500 mt-1 italic bg-gray-50 p-1 rounded">
              "{{ item.notes }}"
            </p>
          </div>

          <!-- Actions -->
          <div class="flex flex-col items-end justify-between gap-2">
            <button @click="removeFromCart(index)" class="text-red-400 hover:text-red-600 text-xs">
              <i class="fas fa-trash"></i>
            </button>
            <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button 
                @click="updateQuantity(index, -1)"
                class="w-6 h-6 bg-white rounded shadow-sm text-xs font-bold hover:bg-gray-200 transition-colors"
              >-</button>
              <span class="text-xs font-medium w-4 text-center">{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(index, 1)"
                class="w-6 h-6 bg-white rounded shadow-sm text-xs font-bold hover:bg-gray-200 transition-colors"
              >+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="cart.length > 0" class="p-5 border-t border-gray-100 bg-gray-50">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600 font-medium">Total Pembayaran</span>
          <span class="text-xl font-bold text-primary">{{ formatRupiah(cartTotal) }}</span>
        </div>
        <button 
          @click="handleCheckout"
          class="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-green-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Lanjut Checkout <i class="fas fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>
  </div>
</template>