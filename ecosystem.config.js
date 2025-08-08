module.exports = {
  apps: [
    {
      name: 'ars-crm-backend',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // Автоматический перезапуск при изменении файлов
      watch: ['dist'],
      ignore_watch: ['node_modules', 'logs'],
      // Настройки для production
      max_restarts: 10,
      min_uptime: '10s',
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      // Переменные окружения
      env_file: '.env'
    }
  ]
};
