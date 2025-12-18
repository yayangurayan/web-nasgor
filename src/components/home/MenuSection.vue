<script setup>
import { ref, computed } from 'vue';
import { menuItems } from '@/data/menuItems';
import MenuItemCard from './MenuItemCard.vue';

const activeCategory = ref('semua');

const categories = [
  { id: 'semua', label: 'Semua Menu' },
  { id: 'makanan', label: 'Makanan' },
  { id: 'minuman', label: 'Minuman' }
];

const filteredMenu = computed(() => {
  if (activeCategory.value === 'semua') {
    return menuItems;
  }
  return menuItems.filter(item => item.category === activeCategory.value);
});
</script>

<template>
  <section id="menu" class="py-20 bg-gray-50 scroll-mt-20">
    <div class="container mx-auto px-4">
      <!-- Section Title -->
      <div class="text-center mb-12" v-motion-fade-visible-once>
        <span class="text-secondary font-bold tracking-wider uppercase text-sm">Pilihan Terbaik</span>
        <h2 class="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4 relative inline-block">
          Daftar Menu Kami
          <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-secondary rounded-full"></span>
        </h2>
        <p class="text-gray-500 max-w-xl mx-auto">
          Nikmati berbagai pilihan hidangan lezat yang kami siapkan khusus untuk memanjakan lidah Anda.
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex justify-center gap-3 mb-10 flex-wrap" v-motion-fade-visible-once>
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="activeCategory = cat.id"
          class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
          :class="activeCategory === cat.id 
            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 transform scale-105' 
            : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary'"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Grid Menu -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <MenuItemCard 
          v-for="item in filteredMenu" 
          :key="item.id" 
          :item="item"
        />
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredMenu.length === 0" class="text-center py-12 text-gray-400">
        <i class="fas fa-search text-4xl mb-3"></i>
        <p>Menu tidak ditemukan untuk kategori ini.</p>
      </div>
    </div>
  </section>
</template>