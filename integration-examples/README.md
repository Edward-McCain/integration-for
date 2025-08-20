# WebRTC Integration Examples

Готовые файлы интеграции WebRTC звонков для разных платформ.

## 📁 Структура файлов

```
integration-examples/
├── React/
│   └── WebRTCIntegration.jsx          # React компонент
├── ReactNative/
│   └── WebRTCIntegration.js           # React Native компонент
├── Vue3/
│   └── WebRTCIntegration.vue          # Vue 3 компонент
├── nginx/
│   └── nginx-config.conf              # Nginx конфигурация
├── html/
│   └── index.html                     # Пример HTML с CSP
└── README.md                          # Этот файл
```

## 🚀 Быстрый старт

### 1. Выберите платформу
- **React**: `React/WebRTCIntegration.jsx`
- **Vue 3**: `Vue3/WebRTCIntegration.vue`
- **React Native**: `ReactNative/WebRTCIntegration.js`

### 2. Настройте сервер
- **Nginx**: Используйте `nginx/nginx-config.conf`
- **HTML**: Добавьте CSP мета-тег из `html/index.html`

### 3. Добавьте компонент в приложение

## 📋 Требования

### Данные пользователя
В localStorage должны быть:
```javascript
// Объект пользователя
localStorage.setItem('user', JSON.stringify({
  user_id: "uuid-пользователя",
  name: "Имя пользователя",
  avatar_url: "/path/to/avatar.jpg"
}));

// Токен авторизации
localStorage.setItem('auth_token', "your-auth-token");
```

### Серверные требования
- **HTTPS** обязателен для WebRTC
- **CSP** должен разрешать WebSocket (`wss:`, `ws:`)
- **CORS** настроен для `webrtc.b2bsklad.uz`

## 🔧 Настройка по платформам

### React
```jsx
import WebRTCIntegration from './WebRTCIntegration';

function App() {
  return (
    <div>
      <WebRTCIntegration />
      {/* Ваше приложение */}
    </div>
  );
}
```

### Vue 3
```vue
<template>
  <div>
    <WebRTCIntegration />
    <!-- Ваше приложение -->
  </div>
</template>

<script setup>
import WebRTCIntegration from './WebRTCIntegration.vue'
</script>
```

### React Native
```jsx
import WebRTCIntegration from './WebRTCIntegration';

const userData = {
  user_id: "user-uuid",
  name: "User Name",
  avatar_url: "https://example.com/avatar.jpg"
};

function App() {
  return (
    <WebRTCIntegration 
      userData={userData}
      token="your-auth-token"
    />
  );
}
```

## 🌐 Nginx конфигурация

### Обязательные настройки

1. **CSP заголовок**:
```nginx
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'; connect-src 'self' http: https: wss: ws: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' http: https:; style-src 'self' 'unsafe-inline' http: https:; img-src 'self' data: blob: http: https:; media-src 'self' data: blob: http: https:;" always;
```

2. **HTTPS обязателен**:
```nginx
server {
    listen 443 ssl http2;
    # SSL настройки...
}
```

## 📱 HTML мета-тег

Добавьте в `<head>`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' http: https: data: blob: 'unsafe-inline'; connect-src 'self' http: https: wss: ws: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' http: https:; style-src 'self' 'unsafe-inline' http: https:; img-src 'self' data: blob: http: https:; media-src 'self' data: blob: http: https:;">
```

## 🔌 API функции

После загрузки компонента доступны глобальные функции:

```javascript
// Инициация звонка
window.callUser(userId, callType); // callType: 'video' | 'audio'

// Завершение звонка
window.endCall(callId);

// Отмена звонка
window.cancelCall(callId);
```

## 🐛 Отладка

### Проверьте консоль браузера:
- ✅ `WebRTC Integration component mounted`
- ✅ `API-First embed script loaded!`
- ✅ `WebSocket connected`

### Частые проблемы:
1. **CSP ошибки**: Проверьте nginx конфигурацию
2. **CORS ошибки**: Убедитесь что HTTPS настроен
3. **Нет данных пользователя**: Проверьте localStorage

## 📞 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера
2. Убедитесь что все требования выполнены
3. Проверьте версию embed скрипта (обновите при необходимости)

## 🔄 Обновления

Для обновления embed скрипта:
1. Измените версию в компоненте
2. Обновите URL скрипта
3. Очистите кэш браузера
