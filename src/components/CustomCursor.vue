<template>
  <div ref="dotRef" class="cursor-dot"></div>
  <div ref="ringRef" class="cursor-ring"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const dotRef = ref(null);
const ringRef = ref(null);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let animationId;

const handleMouseMove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (dotRef.value) {
    dotRef.value.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }

  // Hover detection
  const target = e.target;
  const isHoverable = target.closest('a, button, .tilt-card, .btn, input, textarea');

  if (ringRef.value) {
    if (isHoverable) {
      ringRef.value.classList.add('cursor-hover');
    } else {
      ringRef.value.classList.remove('cursor-hover');
    }
  }
};

const animate = () => {
  // Smooth ring following
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  if (ringRef.value) {
    ringRef.value.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  }

  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: #00d4ff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.9),
              0 0 30px rgba(0, 212, 255, 0.5);
  transition: width 0.2s, height 0.2s;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(0, 212, 255, 0.7);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  transition: width 0.25s, height 0.25s, border-color 0.25s, background 0.25s;
}

.cursor-ring.cursor-hover {
  width: 60px;
  height: 60px;
  border-color: rgba(124, 58, 237, 0.9);
  background: rgba(0, 212, 255, 0.08);
}

/* Mobile — cursor hide */
@media (max-width: 768px) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}
</style>