import { createApp } from 'vue'
import './sass/general.scss';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { router } from './router';

createApp(App).use(router).mount('#app');
