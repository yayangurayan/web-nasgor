<script setup>
</script>

<template>
  <section id="about" class="py-20 bg-white scroll-mt-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <!-- Image Content -->
        <div class="w-full lg:w-1/2" v-motion-slide-visible-once-left>
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1512054502232-120fea300730?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Koki Memasak" 
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <div class="flex items-center gap-4">
                <i class="fas fa-quote-left text-3xl text-secondary"></i>
                <p class="font-medium italic">"Kami memasak dengan hati untuk memberikan rasa yang sampai ke hati pelanggan."</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="w-full lg:w-1/2" v-motion-slide-visible-once-right>
          <span class="text-primary font-bold tracking-wider uppercase text-sm">Cerita Kami</span>
          <h2 class="text-3xl md:text-4xl font-bold text-dark mt-2 mb-6">
            Penyaji Nasi Goreng Legendaris <br/>
            <span class="text-secondary">Sejak Tahun 2010</span>
          </h2>
          
          <div class="space-y-4 text-gray-600 leading-relaxed text-justify">
            <p>
              Berawal dari sebuah gerobak sederhana, <strong>Warung Nasi Goreng Bu Rina</strong> kini telah menjadi ikon kuliner malam di Tanjungbalai. Rahasia kami terletak pada "Bumbu Induk" yang diracik sendiri dengan 12 macam rempah pilihan, menciptakan aroma yang khas dan rasa yang konsisten.
            </p>
            <p>
              Kami percaya bahwa makanan enak tidak harus mahal. Prinsip inilah yang kami pegang teguh untuk terus melayani pelanggan setia kami dari berbagai kalangan. Setiap piring yang kami sajikan adalah bukti dedikasi kami terhadap cita rasa nusantara.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-6 mt-8">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                <i class="fas fa-leaf"></i>
              </div>
              <div>
                <h4 class="font-bold text-dark">Bahan Segar</h4>
                <p class="text-sm text-gray-500">Belanja setiap pagi pasar tradisional.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mt-1">
                <i class="fas fa-fire"></i>
              </div>
              <div>
                <h4 class="font-bold text-dark">Dimasak Dadakan</h4>
                <p class="text-sm text-gray-500">Selalu hangat langsung dari wajan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>