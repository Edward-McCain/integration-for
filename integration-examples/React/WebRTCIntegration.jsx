import React, { useEffect } from 'react';

/**
 * WebRTC Integration Component for React
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

const WebRTCIntegration = () => {
  useEffect(() => {
    console.log('newRTC:: WebRTC Integration component mounted');
    
    // Получаем данные пользователя из localStorage
    const userDataStr = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    
    if (!userDataStr) {
      console.error('newRTC:: No user data available in localStorage');
      return;
    }
    
    let userData;
    try {
      userData = JSON.parse(userDataStr);
      console.log('newRTC:: User data from localStorage:', userData);
    } catch (error) {
      console.error('newRTC:: Error parsing user data:', error);
      return;
    }

    // Загружаем API-First embed скрипт
    const script = document.createElement('script');
    const version = '20250818-023'; // ПРИНУДИТЕЛЬНАЯ ОЧИСТКА КЭША
    script.src = `https://webrtc.b2bsklad.uz/embed/webrtc-embed-${version}.js?nocache=${Date.now()}&v=${version}`;
    
    // Определяем userId из разных возможных ключей
    const userId = userData.user_id || userData.id || userData.uuid || null;
    const userName = userData.name || (userData.first_name + ' ' + (userData.last_name || ''));
    
    console.log('newRTC:: Resolved userId:', userId);
    console.log('newRTC:: Resolved userName:', userName);
    
    if (!userId) {
      console.error('newRTC:: No valid userId found in userData:', userData);
      return;
    }
    
    // Настраиваем атрибуты скрипта
    script.setAttribute('data-user-name', userName);
    script.setAttribute('data-user-id', userId);
    script.setAttribute('data-user-avatar', userData.avatar_url ? `https://yourdomain.com${userData.avatar_url}` : '');
    script.setAttribute('data-user-token', token || '');
    
    script.onload = () => {
      console.log('newRTC:: API-First embed script loaded!');
    };

    script.onerror = (error) => {
      console.error('newRTC:: Failed to load API-First embed script:', error);
    };

    document.head.appendChild(script);

    // Cleanup при размонтировании компонента
    return () => {
      // Удаляем скрипт при размонтировании
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []); // Пустой массив зависимостей - выполняется только при монтировании 

  return (
    <div>
      {/* Контейнер создается автоматически embed скриптом */}
    </div>
  );
};

export default WebRTCIntegration;
