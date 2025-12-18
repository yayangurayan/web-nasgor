<script setup>
import { ref, computed } from 'vue';
import { useCart } from '@/composables/useCart';
import { useCurrency } from '@/composables/useCurrency';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);
const { cart, cartTotal, clearCart } = useCart();
const { formatRupiah } = useCurrency();

// Form State
const form = ref({
  name: '',
  phone: '',
  paymentMethod: 'transfer',
  orderNotes: ''
});

const isSubmitting = ref(false);

const isValid = computed(() => {
  return form.value.name.length > 2 && form.value.phone.length > 9;
});

const submitOrder = () => {
  if (!isValid.value) return;
  isSubmitting.value = true;

  // Construct WhatsApp Message
  let message = `Halo Warung Nasgor Bu Rina, saya *${form.value.name}* ingin memesan:\n\n`;
  
  cart.value.forEach((item, idx) => {
    message += `${idx + 1}. ${item.name} (${item.quantity}x)\n`;
    if (item.notes) message += `   Catatan: ${item.notes}\n`;
    message += `   Harga: ${formatRupiah(item.price * item.quantity)}\n\n`;
  });

  message += `==========================\n`;
  message += `*Total: ${formatRupiah(cartTotal.value)}*\n`;
  message += `==========================\n\n`;
  
  message += `*Data Pemesan:*\n`;
  message += `Nama: ${form.value.name}\n`;
  message += `No. HP: ${form.value.phone}\n`;
  message += `Metode Bayar: ${form.value.paymentMethod === 'transfer' ? 'Transfer Bank' : 'QRIS'}\n`;
  
  if (form.value.orderNotes) {
    message += `Catatan Tambahan: ${form.value.orderNotes}\n`;
  }

  // Encode & Open WA
  const whatsappUrl = `https://wa.me/6285789340632?text=${encodeURIComponent(message)}`;
  
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    clearCart();
    isSubmitting.value = false;
    emit('close');
    // Reset Form
    form.value = { name: '', phone: '', paymentMethod: 'transfer', orderNotes: '' };
  }, 1000);
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[80] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>

    <!-- Modal Content -->
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-pop-in flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="bg-primary p-4 text-white text-center relative">
        <h3 class="font-bold text-lg">Konfirmasi Pesanan</h3>
        <button @click="$emit('close')" class="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 p-2 rounded-full transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 overflow-y-auto">
        <div class="space-y-4">
          <!-- Input Nama -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-user"></i></span>
              <input 
                v-model="form.name"
                type="text" 
                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Nama Anda"
              >
            </div>
          </div>

          <!-- Input HP -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><i class="fab fa-whatsapp"></i></span>
              <input 
                v-model="form.phone"
                type="tel" 
                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="08xxxxxxxxxx"
              >
            </div>
          </div>

          <!-- Metode Bayar -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Metode Pembayaran</label>
            <div class="grid grid-cols-2 gap-3">
              <div 
                @click="form.paymentMethod = 'transfer'"
                class="border rounded-lg p-3 cursor-pointer transition-all flex flex-col items-center gap-2 text-center"
                :class="form.paymentMethod === 'transfer' ? 'border-primary bg-green-50 text-primary' : 'border-gray-200 hover:border-gray-400'"
              >
                <i class="fas fa-exchange-alt text-xl"></i>
                <span class="text-sm font-medium">Transfer Bank</span>
              </div>
              <div 
                @click="form.paymentMethod = 'qris'"
                class="border rounded-lg p-3 cursor-pointer transition-all flex flex-col items-center gap-2 text-center"
                :class="form.paymentMethod === 'qris' ? 'border-primary bg-green-50 text-primary' : 'border-gray-200 hover:border-gray-400'"
              >
                <i class="fas fa-qrcode text-xl"></i>
                <span class="text-sm font-medium">Scan QRIS</span>
              </div>
            </div>
          </div>

          <!-- Summary Info Payment -->
          <div class="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 flex gap-2">
            <i class="fas fa-info-circle mt-0.5"></i>
            <p>
              Instruksi pembayaran lengkap (Nomor Rekening / QR Code) akan diberikan via WhatsApp setelah Anda mengirim pesanan.
            </p>
          </div>

          <!-- Catatan Order -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan (Opsional)</label>
            <textarea 
              v-model="form.orderNotes"
              rows="2" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
              placeholder="Pesan khusus untuk penjual..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-100 bg-gray-50">
        <button 
          @click="submitOrder"
          :disabled="!isValid || isSubmitting"
          class="w-full bg-success text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <span v-if="isSubmitting"><i class="fas fa-spinner fa-spin"></i> Memproses...</span>
          <span v-else><i class="fab fa-whatsapp text-lg"></i> Kirim Pesanan Sekarang</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pop-in {
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>