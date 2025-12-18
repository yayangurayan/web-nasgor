<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCart } from '@/composables/useCart';

const { cartCount, toggleCart } = useCart();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Handle scroll effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const navLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Menu', href: '#menu' },
  { name: 'Tentang Kami', href: '#about' },
  { name: 'Kontak', href: '#footer' },
];

const scrollToSection = (href) => {
  isMobileMenuOpen.value = false;
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <header 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="[isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4']"
  >
    <div class="container mx-auto px-4 flex justify-between items-center">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
          <i class="fas fa-utensils"></i>
        </div>
        <div class="leading-tight">
          <h1 class="font-bold text-lg text-primary" :class="{ 'text-white': !isScrolled && !isMobileMenuOpen }">Warung Nasgor</h1>
          <span class="text-sm font-medium text-secondary">Bu Rina</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a 
          v-for="link in navLinks" 
          :key="link.name"
          :href="link.href"
          @click.prevent="scrollToSection(link.href)"
          class="font-medium hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
          :class="[isScrolled ? 'text-dark' : 'text-white drop-shadow-md']"
        >
          {{ link.name }}
        </a>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <!-- Cart Button -->
        <button 
          @click="toggleCart"
          class="relative p-2 transition-transform hover:scale-110 active:scale-95"
          :class="[isScrolled ? 'text-dark' : 'text-white drop-shadow-md']"
        >
          <i class="fas fa-shopping-cart text-xl"></i>
          <span 
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce"
          >
            {{ cartCount }}
          </span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden text-2xl focus:outline-none"
          :class="[isScrolled ? 'text-dark' : 'text-white']"
        >
          <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div 
      v-show="isMobileMenuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col p-4 gap-4 animate-fade-in-down"
    >
      <a 
        v-for="link in navLinks" 
        :key="link.name"
        :href="link.href"
        @click.prevent="scrollToSection(link.href)"
        class="text-dark font-medium p-2 hover:bg-gray-50 rounded-lg hover:text-primary transition-colors"
      >
        {{ link.name }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>