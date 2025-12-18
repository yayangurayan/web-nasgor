<script setup>
import { ref, onMounted } from 'vue';
import { useCart } from '@/composables/useCart';

// Components
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import MenuSection from '@/components/home/MenuSection.vue';
import AboutSection from '@/components/home/AboutSection.vue';
import CartSidebar from '@/components/cart/CartSidebar.vue';
import CheckoutModal from '@/components/cart/CheckoutModal.vue';

const { initializeCart } = useCart();
const isCheckoutOpen = ref(false);

// Initialize
onMounted(() => {
  initializeCart();
});

const openCheckout = () => {
  isCheckoutOpen.value = true;
};
</script>

<template>
  <div class="antialiased text-dark bg-white">
    <Navbar />
    
    <main>
      <HeroSection />
      <MenuSection />
      <AboutSection />
    </main>

    <Footer />
    
    <!-- Floating Components -->
    <CartSidebar @checkout="openCheckout" />
    <CheckoutModal 
      :is-open="isCheckoutOpen" 
      @close="isCheckoutOpen = false" 
    />

    <!-- WhatsApp Floating Button -->
    <a 
      href="https://wa.me/6285789340632" 
      target="_blank"
      class="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg shadow-green-500/40 flex items-center justify-center text-3xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-pulse-slow"
    >
      <i class="fab fa-whatsapp"></i>
    </a>
  </div>
</template>

<style>
/* Global Animation Utilities if needed */
.animate-pulse-slow {
  animation: pulse 3s infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); transform: scale(1); }
  50% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); transform: scale(1.05); }
}
</style>