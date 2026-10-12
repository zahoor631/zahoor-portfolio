<template>
  <canvas ref="canvasRef" class="globe-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const canvasRef = ref(null);
let scene, camera, renderer, globe, animationId;
let mouseX = 0, mouseY = 0;

const handleMouseMove = (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
};

const handleResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  const canvas = canvasRef.value;

  // === Scene Setup ===
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // === 3D Network Globe — Right Shifted & Slightly Smaller ===
  const globeGeo = new THREE.SphereGeometry(1.9, 32, 32);
  const globeMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.14,
  });
  globe = new THREE.Mesh(globeGeo, globeMat);
  // ✅ Right shift — text ke upar overlap nahi hoga
  globe.position.x = 1.2;
  scene.add(globe);

  // === Network Nodes (dots on globe) ===
  const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });

  const nodeCount = 80;
  const positions = [];

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount);
    const theta = Math.sqrt(nodeCount * Math.PI) * phi;
    const x = 1.9 * Math.cos(theta) * Math.sin(phi);
    const y = 1.9 * Math.sin(theta) * Math.sin(phi);
    const z = 1.9 * Math.cos(phi);

    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(x, y, z);
    globe.add(node);
    positions.push({ x, y, z });

    // Random glow dots
    if (i % 3 === 0) {
      const glowNode = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 8, 8),
        glowMat
      );
      glowNode.position.set(x * 1.02, y * 1.02, z * 1.02);
      globe.add(glowNode);
    }
  }

  // === Connection Lines (network feel) ===
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.12,
  });

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const p1 = positions[i];
      const p2 = positions[j];
      const dist = Math.sqrt(
        Math.pow(p1.x - p2.x, 2) +
          Math.pow(p1.y - p2.y, 2) +
          Math.pow(p1.z - p2.z, 2)
      );
      if (dist < 0.7) {
        const points = [
          new THREE.Vector3(p1.x, p1.y, p1.z),
          new THREE.Vector3(p2.x, p2.y, p2.z),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        globe.add(line);
      }
    }
  }

  // === Outer Glow Rings — Right Shifted Too ===
  const ringGeo = new THREE.TorusGeometry(2.3, 0.008, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.35,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.5;
  ring.position.x = 1.2;
  scene.add(ring);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.6, 0.005, 16, 100),
    new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.22,
    })
  );
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = Math.PI / 4;
  ring2.position.x = 1.2;
  scene.add(ring2);

  // === Background Particles (floating stars) ===
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 20;
    particlePositions[i + 1] = (Math.random() - 0.5) * 20;
    particlePositions[i + 2] = (Math.random() - 0.5) * 20;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.025,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // === Camera ===
  camera.position.z = 5.5;

  // === Animation ===
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    // Globe rotation (smooth)
    globe.rotation.y += 0.0025;
    globe.rotation.x += (mouseY * 0.2 - globe.rotation.x) * 0.05;
    globe.rotation.y += mouseX * 0.0015;

    // Rings rotation
    ring.rotation.z += 0.0008;
    ring2.rotation.z -= 0.0006;

    // Particles slow rotation
    particles.rotation.y += 0.0002;
    particles.rotation.x += 0.0001;

    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', handleResize);
  if (renderer) renderer.dispose();
  if (globe) {
    globe.geometry.dispose();
    globe.material.dispose();
  }
});
</script>

<style scoped>
.globe-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.65;   /* Globe subtle, text crisp */
}

/* Mobile — globe ko center rakhein */
@media (max-width: 768px) {
  .globe-canvas {
    opacity: 0.4;
  }
}
</style>