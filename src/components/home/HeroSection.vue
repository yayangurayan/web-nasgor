<script setup>
import BaseButton from '@/components/common/BaseButton.vue';

const scrollToMenu = () => {
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <section id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image dengan Overlay -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1603133872878-684f208fb74b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
        alt="Nasi Goreng Background" 
        class="w-full h-full object-cover animate-scale-slow"
      />
    </div>

    <!-- Content -->
    <div class="container relative z-20 text-center px-4">
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, type: 'spring' } }"
      >
        <span class="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary border border-secondary mb-4 text-sm font-semibold tracking-wider backdrop-blur-sm">
          EST. 2010
        </span>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Rasakan Kelezatan <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">Nasi Goreng Khas</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed shadow-black drop-shadow-md">
          Bumbu racikan rahasia Bu Rina yang melegenda. Pedasnya pas, gurihnya bikin nagih, harganya bersahabat.
        </p>
        
        <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
          <BaseButton variant="secondary" size="lg" @click="scrollToMenu">
            Pesan Sekarang <i class="fas fa-arrow-right ml-2"></i>
          </BaseButton>
          <a href="#about" class="text-white hover:text-secondary font-medium transition-colors border-b border-transparent hover:border-secondary pb-1">
            Tentang Kami
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center animate-bounce z-20 opacity-80">
      <span class="text-xs font-light tracking-widest mb-2 uppercase">Scroll</span>
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>
</template>

<style scoped>
.animate-scale-slow {
  animation: scaleSlow 20s linear infinite alternate;
}

@keyframes scaleSlow {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}
</style>