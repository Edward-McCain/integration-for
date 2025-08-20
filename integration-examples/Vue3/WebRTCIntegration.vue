<template>
  <!-- Этот компонент только загружает embed скрипт -->
  <!-- Контейнер создается автоматически embed скриптом -->
  <div></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

/**
 * WebRTC Integration Component for Vue 3 
 * 
 * Этот компонент загружает embed скрипт для WebRTC звонков
 * Контейнер создается автоматически embed скриптом
 * 
 * Требования:
 * - В localStorage должен быть объект 'user' с данными пользователя
 * - В localStorage должен быть 'auth_token' с токеном авторизации
 * 
 * Структура user объекта:
 * {
 *   user_id: "uuid",
 *   name: "User Name",
 *   avatar_url: "/path/to/avatar.jpg"
 * }
 */

let scriptElement = null

onMounted(() => {
  console.log('newRTC:: WebRTC Integration component mounted')
  
  // Получаем данные пользователя из localStorage
  const userDataStr = localStorage.getItem('user')
  const token = localStorage.getItem('auth_token')
  
  if (!userDataStr) {
    console.error('newRTC:: No user data available in localStorage')
    return
  }
  
  let userData
  try {
    userData = JSON.parse(userDataStr)
    console.log('newRTC:: User data from localStorage:', userData)
  } catch (error) {
    console.error('newRTC:: Error parsing user data:', error)
    return
  }

  // Загружаем API-First embed скрипт
  scriptElement = document.createElement('script')
  const version = '20250818-023' // ПРИНУДИТЕЛЬНАЯ ОЧИСТКА КЭША
  scriptElement.src = `https://webrtc.b2bsklad.uz/embed/webrtc-embed-${version}.js?nocache=${Date.now()}&v=${version}`
  
  // Определяем userId из разных возможных ключей
  const userId = userData.user_id || userData.id || userData.uuid || null
  const userName = userData.name || (userData.first_name + ' ' + (userData.last_name || ''))
  
  console.log('newRTC:: Resolved userId:', userId)
  console.log('newRTC:: Resolved userName:', userName)
  
  if (!userId) {
    console.error('newRTC:: No valid userId found in userData:', userData)
    return
  }
  
  // Настраиваем атрибуты скрипта
  scriptElement.setAttribute('data-user-name', userName)
  scriptElement.setAttribute('data-user-id', userId)
  scriptElement.setAttribute('data-user-avatar', userData.avatar_url ? `https://yourdomain.com${userData.avatar_url}` : '')
  scriptElement.setAttribute('data-user-token', token || '')
  
  scriptElement.onload = () => {
    console.log('newRTC:: API-First embed script loaded!')
  }

  scriptElement.onerror = (error) => {
    console.error('newRTC:: Failed to load API-First embed script:', error)
  }

  document.head.appendChild(scriptElement)
})

onUnmounted(() => {
  // Удаляем скрипт при размонтировании компонента
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement)
    scriptElement = null
  }
})
</script>

<style scoped>
/* Контейнер создается автоматически embed скриптом */
</style>
