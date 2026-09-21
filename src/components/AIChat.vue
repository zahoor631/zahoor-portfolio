<template>
  <div class="ai-chat-wrapper">
    <!-- Chat window -->
    <div class="chat-window" :class="{ open: isOpen }">
      <div class="chat-header">
        <span>Zahoor's AI Assistant</span>
        <button @click="isOpen = false">✕</button>
      </div>
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
          {{ msg.content }}
        </div>
        <div v-if="isLoading" class="message assistant">Thinking...</div>
      </div>
      <div class="chat-input">
        <input 
          v-model="userInput" 
          @keyup.enter="sendMessage" 
          placeholder="Ask something about Zahoor..."
          :disabled="isLoading"
        />
        <button @click="sendMessage" :disabled="isLoading">Send</button>
      </div>
    </div>

    <!-- Floating button -->
    <button class="chat-toggle" @click="isOpen = !isOpen">
      <i class="fa-solid fa-comment-dots"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const userInput = ref('')
const messages = ref([
  { role: 'assistant', content: 'Hi! I am Zahoor\'s AI assistant. Ask me about his skills, experience, or projects!' }
])
const isLoading = ref(false)
const messagesContainer = ref(null)

// ⚠️ Replace this with your Groq API Key
const GROQ_API_KEY = 'gsk_xxxxxxxxxxxxxxxxxxxxxx'

// 🧠 Your "background knowledge" — teach the AI about yourself
const systemContext = `You are the AI assistant for Zahoor Illahi's portfolio. Answer questions concisely and professionally.
Here is Zahoor's information:
- Role: IT Support & Network Engineer
- Skills: Cisco Networking, Windows Server, Linux, IT Support, VLANs, OSPF, Active Directory
- Certifications: CCNA, Google IT Support, CompTIA A+
- Email: zahoorillahi117@gmail.com
- Location: Pakistan
Do not discuss topics unrelated to Zahoor's professional background.`

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const userText = userInput.value
  messages.value.push({ role: 'user', content: userText })
  userInput.value = ''
  isLoading.value = true

  await scrollToBottom()

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemContext },
          ...messages.value.map(m => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    const data = await response.json()
    if (data.choices && data.choices[0]) {
      messages.value.push({ role: 'assistant', content: data.choices[0].message.content })
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    messages.value.push({ role: 'assistant', content: 'Sorry, something went wrong. Please try again.' })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
/* === Floating button === */
.chat-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #7c3aed);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
  transition: transform 0.2s;
}
.chat-toggle:hover { transform: scale(1.1); }

/* === Chat window === */
.chat-window {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  width: 360px;
  max-width: calc(100vw - 4rem);
  height: 500px;
  max-height: 70vh;
  background: #151c2c;
  border: 1px solid #1f2a3d;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  z-index: 9998;
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  transition: all 0.25s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
.chat-window.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.chat-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #1f2a3d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}
.chat-header button {
  background: none;
  border: none;
  color: #8b95a8;
  font-size: 1.2rem;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.message {
  padding: 0.6rem 1rem;
  border-radius: 12px;
  max-width: 85%;
  font-size: 0.9rem;
  line-height: 1.5;
  word-wrap: break-word;
}
.message.user {
  background: #00d4ff;
  color: #0a0e1a;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}
.message.assistant {
  background: #1f2a3d;
  color: #e5e9f0;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.chat-input {
  display: flex;
  padding: 0.75rem;
  gap: 0.5rem;
  border-top: 1px solid #1f2a3d;
}
.chat-input input {
  flex: 1;
  background: #0a0e1a;
  border: 1px solid #1f2a3d;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  color: #e5e9f0;
  font-size: 0.9rem;
}
.chat-input input:focus { outline: none; border-color: #00d4ff; }
.chat-input button {
  background: #00d4ff;
  color: #0a0e1a;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.chat-input button:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 480px) {
  .chat-window {
    right: 1rem;
    left: 1rem;
    width: auto;
    bottom: 5.5rem;
  }
  .chat-toggle {
    right: 1rem;
    bottom: 1rem;
  }
}
</style>