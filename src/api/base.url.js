export const BASE_URL = (function() {
  let url = '';
  switch (process.env.NODE_ENV) {
    case 'development':
      url = 'http://localhost:8080/api'; //这里是本地的请求url
      break;
    case 'production':
      url = 'http://192.168.0.21:8080'; //生产环境url

      break;
  }
  return url;
})();
