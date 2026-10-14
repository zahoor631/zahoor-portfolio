<template>
  <div class="network-universe">
    <canvas ref="canvasRef"></canvas>
    
    <!-- Node Label Tooltip -->
    <div
      v-if="hoveredNode"
      class="node-tooltip"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    >
      <i :class="hoveredNode.icon"></i>
      {{ hoveredNode.label }}
      <span class="hint">Click to explore</span>
    </div>

    <!-- Info Panel (jab node click ho) -->
    <Transition name="slide">
      <div v-if="selectedNode" class="info-panel">
        <button class="close-btn" @click="selectedNode = null">✕</button>
        <div class="info-header">
          <i :class="selectedNode.icon"></i>
          <h2>{{ selectedNode.label }}</h2>
        </div>
        <p>{{ selectedNode.description }}</p>
        <ul>
          <li v-for="item in selectedNode.items" :key="item">{{ item }}</li>
        </ul>
        <button class="explore-btn" @click="goToSection(selectedNode.section)">
          View Full Section →
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const canvasRef = ref(null);
const hoveredNode = ref(null);
const selectedNode = ref(null);
const mouseX = ref(0);
const mouseY = ref(0);

let scene, camera, renderer, raycaster, mouse;
let globe, animationId;
let nodeMeshes = [];

// === Node Data ===
const nodesData = [
  {
    label: 'Education',
    icon: 'fa-solid fa-graduation-cap',
    color: 0x00d4ff,
    section: 'education',
    description: 'My academic background and qualifications.',
    items: ['BS Computer Science', 'Network certifications', 'Continuous learning'],
  },
  {
    label: 'Experience',
    icon: 'fa-solid fa-briefcase',
    color: 0x7c3aed,
    section: 'experience',
    description: 'Professional journey in IT and networking.',
    items: ['IT Support Specialist', 'Network Engineer', 'Shipyard IT Systems'],
  },
  {
    label: 'Projects',
    icon: 'fa-solid fa-diagram-project',
    color: 0x10b981,
    section: 'projects',
    description: 'Hands-on projects and implementations.',
    items: ['Network Setup', 'Server Configuration', 'CCTV Installation'],
  },
  {
    label: 'Skills',
    icon: 'fa-solid fa-network-wired',
    color: 0xf59e0b,
    section: 'skills',
    description: 'Technical expertise and tools.',
    items: ['TCP/IP & Routing', 'Windows Server', 'Linux', 'Security'],
  },
  {
    label: 'Certifications',
    icon: 'fa-solid fa-certificate',
    color: 0xef4444,
    section: 'certifications',
    description: 'Professional certifications.',
    items: ['PEC Registered', 'Cisco Networking', 'Microsoft Certified'],
  },
  {
    label: 'Contact',
    icon: 'fa-solid fa-envelope',
    color: 0x06b6d4,
    section: 'contact',
    description: 'Get in touch with me.',
    items: ['Email', 'LinkedIn', 'GitHub'],
  },
];

const emit = defineEmits(['navigate']);

const goToSection = (section) => {
  emit('navigate', section);
  selectedNode.value = null;
};

onMounted(() => {
  const canvas = canvasRef.value;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // === Main Globe ===
  const globeGeo = new THREE.SphereGeometry(2, 32, 32);
  const globeMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  globe = new THREE.Mesh(globeGeo, globeMat);
  scene.add(globe);

  // === Small Background Nodes ===
  for (let i = 0; i < 60; i++) {
    const phi = Math.acos(-1 + (2 * i) / 60);
    const theta = Math.sqrt(60 * Math.PI) * phi;
    const x = 2 * Math.cos(theta) * Math.sin(phi);
    const y = 2 * Math.sin(theta) * Math.sin(phi);
    const z = 2 * Math.cos(phi);

    const dotGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.5 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(x, y, z);
    globe.add(dot);
  }

  // === Main Clickable Nodes ===
  nodesData.forEach((nodeData, i) => {
    const phi = Math.acos(-1 + (2 * i) / nodesData.length);
    const theta = Math.sqrt(nodesData.length * Math.PI) * phi;
    const x = 2.2 * Math.cos(theta) * Math.sin(phi);
    const y = 2.2 * Math.sin(theta) * Math.sin(phi);
    const z = 2.2 * Math.cos(phi);

    // Outer glow sphere
    const glowGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: nodeData.color,
      transparent: true,
      opacity: 0.3,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(x, y, z);
    globe.add(glow);

    // Main node
    const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: nodeData.color });
    const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
    nodeMesh.position.set(x, y, z);
    nodeMesh.userData = { ...nodeData, isClickable: true };
    globe.add(nodeMesh);
    nodeMeshes.push(nodeMesh);

    // Pulse animation
    const pulseSpeed = 0.5 + Math.random() * 0.5;
    nodeMesh.userData.pulseSpeed = pulseSpeed;
    glow.userData.isGlow = true;
    glow.userData.pulseSpeed = pulseSpeed;
  });

  // === Outer Rings ===
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.008, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.4 })
  );
  ring1.rotation.x = Math.PI / 2.5;
  scene.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.005, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.25 })
  );
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = Math.PI / 4;
  scene.add(ring2);

  camera.position.z = 5.5;

  // === Raycaster Setup ===
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // === Event Listeners ===
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('click', handleClick);
  window.addEventListener('resize', handleResize);

  // === Animation ===
  const clock = new THREE.Clock();
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    globe.rotation.y += 0.0015;

    // Pulse nodes
    nodeMeshes.forEach((node) => {
      const scale = 1 + Math.sin(elapsed * node.userData.pulseSpeed * 3) * 0.15;
      node.scale.set(scale, scale, scale);
    });

    ring1.rotation.z += 0.0008;
    ring2.rotation.z -= 0.0006;

    // Raycast check
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodeMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      hoveredNode.value = hit.userData;
      canvas.style.cursor = 'pointer';
    } else {
      hoveredNode.value = null;
      canvas.style.cursor = 'default';
    }

    renderer.render(scene, camera);
  };
  animate();
});

const handleMouseMove = (e) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
};

const handleClick = () => {
  if (hoveredNode.value) {
    selectedNode.value = hoveredNode.value;
  }
};

const handleResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('click', handleClick);
  window.removeEventListener('resize', handleResize);
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.network-universe {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Node Tooltip */
.node-tooltip {
  position: fixed;
  background: rgba(10, 14, 26, 0.95);
  border: 1px solid #00d4ff;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  pointer-events: none;
  font-size: 0.9rem;
  z-index: 100;
  transform: translate(15px, -50%);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.node-tooltip .hint {
  font-size: 0.7rem;
  color: #00d4ff;
  opacity: 0.8;
}

/* Info Panel */
.info-panel {
  position: fixed;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 380px;
  max-width: 90vw;
  background: rgba(10, 14, 26, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid #00d4ff;
  border-radius: 16px;
  padding: 2rem;
  z-index: 200;
  color: white;
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.3);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: #00d4ff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(0, 212, 255, 0.2);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-header i {
  font-size: 1.8rem;
  color: #00d4ff;
}

.info-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.info-panel p {
  color: #b0b8c8;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.info-panel ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.info-panel li {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  color: #e5e9f0;
  font-size: 0.95rem;
}

.info-panel li::before {
  content: '▸ ';
  color: #00d4ff;
  margin-right: 0.5rem;
}

.explore-btn {
  width: 100%;
  padding: 0.85rem;
  background: #00d4ff;
  color: #0a0e1a;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
}

.explore-btn:hover {
  background: #0099cc;
  box-shadow: 0 8px 24px rgba(0, 212, 255, 0.4);
}

/* Slide animation */
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(100%);
}

@media (max-width: 768px) {
  .info-panel {
    right: 5%;
    left: 5%;
    width: 90%;
  }
}
</style>