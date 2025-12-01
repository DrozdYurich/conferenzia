<template>
    <div class="stats-container">
      <div class="stats-grid">
        <div class="stat-card" :class="getRiskClass(data.data['Экономическая детерминация'])">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">Экономическая детерминация</div>
            <div class="stat-value">{{ formatNumber(data.data["Экономическая детерминация"]) }}</div>
            <div class="stat-progress">
              <div class="progress-bar" :style="{ width: (data.data['Экономическая детерминация'] * 100) + '%' }"></div>
            </div>
            <div class="stat-description">{{ getRiskDescription(data.data['Экономическая детерминация']) }}</div>
          </div>
        </div>
    
        <div class="stat-card" :class="getRiskClass(data.data['Абсентеистские настроения'])">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">Абсентеистские настроения</div>
            <div class="stat-value">{{ formatNumber(data.data["Абсентеистские настроения"]) }}</div>
            <div class="stat-progress">
              <div class="progress-bar" :style="{ width: (data.data['Абсентеистские настроения'] * 100) + '%' }"></div>
            </div>
            <div class="stat-description">{{ getRiskDescription(data.data['Абсентеистские настроения']) }}</div>
          </div>
        </div>
    
        <div class="stat-card" :class="getRiskClass(data.data['Городская среда'])">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">Городская среда</div>
            <div class="stat-value">{{ formatNumber(data.data["Городская среда"]) }}</div>
            <div class="stat-progress">
              <div class="progress-bar" :style="{ width: (data.data['Городская среда'] * 100) + '%' }"></div>
            </div>
            <div class="stat-description">{{ getRiskDescription(data.data['Городская среда']) }}</div>
          </div>
        </div>
    
        <div class="stat-card" :class="getRiskClass(data.data['Действия властей, подрывающие авторитет'])">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">Действия властей</div>
            <div class="stat-value">{{ formatNumber(data.data["Действия властей, подрывающие авторитет"]) }}</div>
            <div class="stat-progress">
              <div class="progress-bar" :style="{ width: (data.data['Действия властей, подрывающие авторитет'] * 100) + '%' }"></div>
            </div>
            <div class="stat-description">{{ getRiskDescription(data.data['Действия властей, подрывающие авторитет']) }}</div>
          </div>
        </div>
    
        <div class="stat-card" :class="getRiskClass(data.data['Социальная дифференциация'])">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">Социальная дифференциация</div>
            <div class="stat-value">{{ formatNumber(data.data["Социальная дифференциация"]) }}</div>
            <div class="stat-progress">
              <div class="progress-bar" :style="{ width: (data.data['Социальная дифференциация'] * 100) + '%' }"></div>
            </div>
            <div class="stat-description">{{ getRiskDescription(data.data['Социальная дифференциация']) }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    data: Object,
  });
  
  const formatNumber = (value) => {
    if (value === undefined || value === null) return '0.000';
    return Number(value).toFixed(3);
  };
  
  const getRiskClass = (value) => {
    if (value >= 0.7) return 'high-risk';
    if (value >= 0.3) return 'medium-risk';
    return 'low-risk';
  };
  
  const getRiskDescription = (value) => {
    if (value >= 0.7) return 'Высокий риск';
    if (value >= 0.3) return 'Средний риск';
    return 'Низкий риск';
  };
  </script>
  
  <style scoped>
  /* Основные стили */
  .stats-container {
    padding: 12px;
    background: linear-gradient(135deg, #0a192f 0%, #0d1b2a 100%);
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 12px;
    margin: 0 auto;
  }
  
  /* Карточка статистики */
  .stat-card {
    background: linear-gradient(145deg, #1a365d 0%, #15325c 100%);
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 20, 40, 0.3),
                0 1px 2px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(56, 178, 172, 0.1);
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    min-height: 140px;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #4299e1, #38b2ac);
  }
  
  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 20, 40, 0.4),
                0 2px 4px rgba(0, 0, 0, 0.1);
    border-color: rgba(56, 178, 172, 0.2);
  }
  
  /* Иконка */
  .stat-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: rgba(56, 178, 172, 0.08);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #38b2ac;
    margin-top: 2px;
  }
  
  /* Содержимое карточки */
  .stat-content {
    color: #e2e8f0;
    flex: 1;
    min-width: 0; /* Для правильного обрезания текста */
  }
  
  .stat-label {
    font-size: 14px;
    font-weight: 600;
    color: #cbd5e0;
    margin-bottom: 8px;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .stat-value {
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, #4299e1, #38b2ac);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  
  /* Прогресс бар */
  .stat-progress {
    height: 6px;
    background: rgba(203, 213, 224, 0.08);
    border-radius: 3px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #4299e1, #38b2ac);
    border-radius: 3px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  /* Описание */
  .stat-description {
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    background: rgba(56, 178, 172, 0.1);
    border-radius: 12px;
    display: inline-block;
    color: #38b2ac;
    border: 1px solid rgba(56, 178, 172, 0.15);
  }
  
  /* Стили для разных уровней риска */
  .high-risk .stat-description {
    background: rgba(245, 101, 101, 0.1);
    color: #f56565;
    border-color: rgba(245, 101, 101, 0.15);
  }
  
  .high-risk .progress-bar {
    background: linear-gradient(90deg, #f56565, #ed8936);
  }
  
  .high-risk::before {
    background: linear-gradient(90deg, #f56565, #ed8936);
  }
  
  .medium-risk .stat-description {
    background: rgba(237, 137, 54, 0.1);
    color: #ed8936;
    border-color: rgba(237, 137, 54, 0.15);
  }
  
  .medium-risk .progress-bar {
    background: linear-gradient(90deg, #ed8936, #ecc94b);
  }
  
  .medium-risk::before {
    background: linear-gradient(90deg, #ed8936, #ecc94b);
  }
  
  .low-risk .stat-description {
    background: rgba(72, 187, 120, 0.1);
    color: #48bb78;
    border-color: rgba(72, 187, 120, 0.15);
  }
  
  .low-risk .progress-bar {
    background: linear-gradient(90deg, #48bb78, #38b2ac);
  }
  
  .low-risk::before {
    background: linear-gradient(90deg, #48bb78, #38b2ac);
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 10px;
    }
    
    .stat-card {
      padding: 14px;
      gap: 12px;
      min-height: 130px;
    }
    
    .stat-icon {
      width: 44px;
      height: 44px;
    }
    
    .stat-value {
      font-size: 26px;
    }
    
    .stat-label {
      font-size: 13px;
    }
  }
  
  @media (max-width: 480px) {
    .stats-container {
      padding: 10px;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    
    .stat-card {
      padding: 14px 16px;
      gap: 14px;
      min-height: 120px;
    }
    
    .stat-value {
      font-size: 24px;
    }
    
    .stat-label {
      font-size: 14px;
      -webkit-line-clamp: 1;
    }
    
    .stat-icon {
      width: 42px;
      height: 42px;
    }
  }
  
  /* Очень маленькие экраны */
  @media (max-width: 360px) {
    .stat-card {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 16px 12px;
      gap: 12px;
    }
    
    .stat-icon {
      margin-bottom: 4px;
    }
    
    .stat-content {
      width: 100%;
    }
    
    .stat-label {
      -webkit-line-clamp: 2;
    }
  }
  </style>