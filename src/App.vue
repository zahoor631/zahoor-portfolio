<template>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Education />
    <Projects />
    <NetworkingLabs />
    <Certifications />
    <Training />
    <Contact />
  </main>
  <Footer />

  <!-- 🤖 AI Chat — floating button, bottom-right -->
  <AIChat />
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Experience from './components/Experience.vue'
import Education from './components/Education.vue'
import Projects from './components/Projects.vue'
import NetworkingLabs from './components/NetworkingLabs.vue'
import Certifications from './components/Certifications.vue'
import Training from './components/Training.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import AIChat from './components/AIChat.vue'

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})
</script>