import { createApp } from 'vue'
import App from './App.vue'

// import './assets/css/campus.css'; //기존 css 파일
// import './assets/css/style.css'; //기존 css 파일

import './assets/styles/main.scss'

import router from './router'
import { createPinia } from 'pinia'

// ✅ 공통 컴포넌트 import
import CommonButton from '@/components/CommonButton.vue'

const app = createApp(App)  // 먼저 변수에 담아야 함
const pinia = createPinia()

app.use(router)
app.use(pinia)

// ✅ 공통 컴포넌트 등록
app.component('CommonButton', CommonButton)
app.mount('#app')

// 전역변수 등록
// 이미지경로
app.config.globalProperties.IMAGE_URL = process.env.VUE_APP_IMAGE_SERVER_URL;

console.log(process.env); 
console.log("개발 서버 URL:", process.env.VUE_APP_API_SERVER_URL);
