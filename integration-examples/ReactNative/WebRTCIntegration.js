import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, Alert } from 'react-native';

/**
 * WebRTC Integration Component for React Native
 * 
 * Этот компонент использует WebView для интеграции WebRTC звонков
 * 
 * Требования:
 * - react-native-webview: npm install react-native-webview
 * - AsyncStorage для хранения данных пользователя
 * 
 * Установка зависимостей:
 * npm install react-native-webview @react-native-async-storage/async-storage  
 */

const WebRTCIntegration = ({ userData, token }) => {
  const webViewRef = useRef(null);

  // HTML страница с embed скриптом
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebRTC Calls</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #f5f5f5;
            }
            .container {
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: column;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                text-align: center;
                font-weight: 600;
            }
            .content {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
            }
            .status {
                text-align: center;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                WebRTC Звонки
            </div>
            <div class="content">
                <div class="status">
                    <p>Загрузка WebRTC...</p>
                </div>
            </div>
        </div>

        <script>
            // Данные пользователя из React Native
            const userData = ${JSON.stringify(userData)};
            const token = '${token}';
            
            // Сохраняем в localStorage для совместимости
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('auth_token', token);
            
            // Загружаем embed скрипт
            const script = document.createElement('script');
            const version = '20250818-023';
            script.src = 'https://webrtc.b2bsklad.uz/embed/webrtc-embed-' + version + '.js?nocache=' + Date.now() + '&v=' + version;
            
            // Настраиваем атрибуты
            script.setAttribute('data-user-name', userData.name || 'User');
            script.setAttribute('data-user-id', userData.user_id || userData.id);
            script.setAttribute('data-user-avatar', userData.avatar_url || '');
            script.setAttribute('data-user-token', token);
            
            script.onload = () => {
                console.log('WebRTC script loaded');
                // Уведомляем React Native о готовности
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'WEBRTC_READY'
                }));
            };
            
            script.onerror = (error) => {
                console.error('Failed to load WebRTC script:', error);
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'WEBRTC_ERROR',
                    error: error.message
                }));
            };
            
            document.head.appendChild(script);
            
            // Обработка сообщений от embed скрипта
            window.addEventListener('message', (event) => {
                if (event.data && typeof event.data === 'object') {
                    // Пересылаем сообщения в React Native
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'WEBRTC_MESSAGE',
                        data: event.data
                    }));
                }
            });
        </script>
    </body>
    </html>
  `;

  // Обработка сообщений от WebView
  const handleMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      
      switch (message.type) {
        case 'WEBRTC_READY':
          console.log('WebRTC ready');
          break;
          
        case 'WEBRTC_ERROR':
          console.error('WebRTC error:', message.error);
          Alert.alert('Ошибка', 'Не удалось загрузить WebRTC');
          break;
          
        case 'WEBRTC_MESSAGE':
          // Обработка сообщений от WebRTC
          console.log('WebRTC message:', message.data);
          break;
          
        default:
          console.log('Unknown message:', message);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default WebRTCIntegration;
