// ===== 3D Tilt Effect Helper =====
// Kisi bhi card par lagane ke liye:
// 1. Card par class add karein: "tilt-card"
// 2. Card ke andar sabse pehle: <div class="card-shine"></div>
// 3. Events add karein: @mousemove="tilt" @mouseleave="resetTilt"
// 4. Script mein import karein: import { tilt, resetTilt } from '../utils/tilt.js'

export const tilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxTilt = 10;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = ((centerY - y) / centerY) * maxTilt;

    // Shine position update
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

    card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateZ(15px)
    scale3d(1.02, 1.02, 1.02)
  `;
    card.style.transition = 'transform 0.1s ease-out';
};

export const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    translateZ(0)
    scale3d(1, 1, 1)
  `;
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
};