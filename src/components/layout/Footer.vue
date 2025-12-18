<script setup>
// Footer logic jika ada
</script>

<template>
  <footer id="footer" class="bg-dark text-white pt-16 pb-8 rounded-t-[3rem] mt-12">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <i class="fas fa-utensils text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-secondary">Bu Rina</h3>
          </div>
          <p class="text-gray-300 leading-relaxed">
            Menyajikan nasi goreng dengan resep warisan keluarga yang menjadi andalan rumahan. Rasa bintang lima, harga kaki lima.
          </p>
        </div>

        <!-- Jam Operasional -->
        <div>
          <h4 class="text-xl font-bold mb-6 border-b-2 border-primary inline-block pb-2">Jam Buka</h4>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center justify-between">
              <span>Senin - Jumat</span>
              <span class="font-semibold text-white">10:00 - 22:00</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Sabtu - Minggu</span>
              <span class="font-semibold text-white">12:00 - 23:00</span>
            </li>
          </ul>
        </div>

        <!-- Kontak -->
        <div>
          <h4 class="text-xl font-bold mb-6 border-b-2 border-primary inline-block pb-2">Kontak Kami</h4>
          <div class="space-y-4 text-gray-300">
            <div class="flex items-start gap-3">
              <i class="fas fa-map-marker-alt mt-1 text-accent"></i>
              <span>Simpang Pancakarsa,<br>Kota Tanjungbalai</span>
            </div>
            <div class="flex items-center gap-3">
              <i class="fab fa-whatsapp text-accent"></i>
              <span>0857-8934-0632</span>
            </div>
            
            <!-- Socials -->
            <div class="flex gap-4 mt-6">
              <a href="#" class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i class="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Warung Nasi Goreng Bu Rina. Dibuat dengan <i class="fas fa-heart text-red-500"></i> oleh Vibe Coder.</p>
      </div>
    </div>
  </footer>
</template>