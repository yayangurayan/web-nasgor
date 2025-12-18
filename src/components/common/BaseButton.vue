<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, danger, outline
    validator: (value) => ['primary', 'secondary', 'accent', 'danger', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md' // sm, md, lg
  },
  block: {
    type: Boolean,
    default: false
  }
});

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-green-600 focus:ring-primary shadow-lg hover:shadow-xl hover:-translate-y-1',
    secondary: 'bg-secondary text-dark hover:bg-yellow-400 focus:ring-secondary shadow-md hover:shadow-lg hover:-translate-y-1',
    accent: 'bg-accent text-white hover:bg-orange-600 focus:ring-accent shadow-md hover:shadow-lg',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  };

  const width = props.block ? 'w-full' : '';

  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${width}`;
});
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>