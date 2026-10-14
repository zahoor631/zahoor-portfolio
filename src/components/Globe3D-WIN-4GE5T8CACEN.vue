<template>
  <canvas ref="canvasRef" class="globe-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const canvasRef = ref(null);
let scene, camera, renderer, globe, ring1, ring2, animationId;
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

  // === Main Globe ===
  const globeGeo = new THREE.SphereGeometry(2, 32, 32);
  const globeMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });
  globe = new THREE.Mesh(globeGeo, globeMat);
  scene.add(globe);

  // === Network Nodes ===
  const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x66eaff });

  const nodeCount = 80;
  const positions = [];

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount);
    const theta = Math.sqrt(nodeCount * Math.PI) * phi;
    const x = 2 * Math.cos(theta) * Math.sin(phi);
    const y = 2 * Math.sin(theta) * Math.sin(phi);
    const z = 2 * Math.cos(phi);

    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(x, y, z);
    globe.add(node);
    positions.push({ x, y, z });

    if (i % 3 === 0) {
      const glowNode = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        glowMat
      );
      glowNode.position.set(x * 1.02, y * 1.02, z * 1.02);
      globe.add(glowNode);
    }
  }

  // === Connection Lines ===
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.15,
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

  // === Outer Rings ===
  ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.008, 16, 100),
    new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.4,
    })
  );
  ring1.rotation.x = Math.PI / 2.5;
  scene.add(ring1);

  ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.7, 0.005, 16, 100),
    new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.25,
    })
  );
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = Math.PI / 4;
  scene.add(ring2);

  camera.position.z = 5;

  // === Animate ===
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    globe.rotation.y += 0.003;
    globe.rotation.x += (mouseY * 0.3 - globe.rotation.x) * 0.05;
    globe.rotation.y += mouseX * 0.002;

    ring1.rotation.z += 0.001;
    ring2.rotation.z -= 0.0008;

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
  if (ring1) {
    ring1.geometry.dispose();
    ring1.material.dispose();
  }
  if (ring2) {
    ring2.geometry.dispose();
    ring2.material.dispose();
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
}
</style>