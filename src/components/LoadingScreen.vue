<template>
  <Transition name="loading-fade">
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <div class="hexagon-loader">
          <div class="hex"></div>
          <div class="hex"></div>
          <div class="hex"></div>
        </div>

        <div class="loading-logo">ZI</div>

        <p class="loading-text">
          Initializing Network<span class="dots">...</span>
        </p>

        <div class="loading-bar">
          <div class="loading-bar-fill" :style="{ width: progress + '%' }"></div>
        </div>

        <p class="loading-percent">{{ Math.floor(progress) }}%</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);
const progress = ref(0);

onMounted(() => {
  const interval = setInterval(() => {
    progress.value += Math.random() * 15;
    if (progress.value >= 100) {
      progress.value = 100;
      clearInterval(interval);
      setTimeout(() => {
        isLoading.value = false;
      }, 400);
    }
  }, 150);

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: radial-gradient(circle at center, #0a0e1a 0%, #000000 100%);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.hexagon-loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.hex {
  position: absolute;
  inset: 0;
  border: 2px solid #00d4ff;
  border-radius: 50%;
  border-top-color: transparent;
  border-right-color: transparent;
  animation: spin 1.2s linear infinite;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.hex:nth-child(2) {
  inset: 10px;
  border-color: #7c3aed;
  border-top-color: transparent;
  border-right-color: transparent;
  animation-duration: 1.5s;
  animation-direction: reverse;
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
}

.hex:nth-child(3) {
  inset: 20px;
  border-color: #00d4ff;
  border-top-color: transparent;
  border-right-color: transparent;
  animation-duration: 1.8s;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-logo {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
  animation: pulse-logo 1.5s ease-in-out infinite;
}

@keyframes pulse-logo {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.98); }
}

.loading-text {
  color: #00d4ff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.dots {
  animation: dots 1.5s steps(4) infinite;
}

@keyframes dots {
  0%, 20% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.loading-bar {
  width: 240px;
  height: 3px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.loading-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #7c3aed);
  border-radius: 999px;
  transition: width 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.7);
}

.loading-percent {
  color: #8b95a8;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
}

.loading-fade-leave-active {
  transition: opacity 0.6s ease;
}

.loading-fade-leave-to {
  opacity: 0;
}
</style>