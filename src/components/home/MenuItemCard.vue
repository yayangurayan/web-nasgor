<script setup>
import { ref } from 'vue';
import { useCart } from '@/composables/useCart';
import { useCurrency } from '@/composables/useCurrency';
import BaseButton from '@/components/common/BaseButton.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const { addToCart } = useCart();
const { formatRupiah } = useCurrency();
const notes = ref('');
const isAdded = ref(false);

const handleAddToCart = () => {
  addToCart(props.item, notes.value);
  isAdded.value = true;
  notes.value = ''; // Reset notes
  
  // Feedback visual
  setTimeout(() => {
    isAdded.value = false;
  }, 2000);
};
</script>

<template>
  <div 
    class="bg-white rounded-2xl overflow-hidden shadow-custom hover:shadow-hover transition-all duration-300 group flex flex-col h-full border border-gray-100"
    v-motion-slide-visible-once-bottom
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
      <!-- Badge Best Seller -->
      <div v-if="item.isBestSeller" class="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-md">
        <i class="fas fa-star mr-1"></i> Favorit
      </div>
      
      <!-- Placeholder Icon (Gunakan gambar asli jika ada) -->
      <div class="text-gray-300 group-hover:scale-110 transition-transform duration-500">
         <i class="fas fa-utensils text-5xl"></i>
      </div>
      
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span class="text-white font-medium text-sm">Lihat Detail</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold text-dark leading-tight group-hover:text-primary transition-colors">
          {{ item.name }}
        </h3>
        <span class="font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg text-sm whitespace-nowrap">
          {{ formatRupiah(item.price) }}
        </span>
      </div>
      
      <p class="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
        {{ item.description }}
      </p>

      <!-- Input Notes -->
      <div class="mb-4">
        <textarea 
          v-model="notes"
          placeholder="Catatan (cth: Pedas level 3, tanpa acar)" 
          class="w-full text-xs p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none bg-gray-50 resize-none h-16 transition-colors"
        ></textarea>
      </div>

      <!-- Action Button -->
      <button 
        @click="handleAddToCart"
        class="w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2"
        :class="isAdded ? 'bg-success text-white' : 'bg-dark text-white hover:bg-primary'"
      >
        <i :class="isAdded ? 'fas fa-check' : 'fas fa-shopping-cart'"></i>
        {{ isAdded ? 'Masuk Keranjang' : 'Tambah Pesanan' }}
      </button>
    </div>
  </div>
</template>