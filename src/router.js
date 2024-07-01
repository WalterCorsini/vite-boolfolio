import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import ProjectsPage from './pages/ProjectsPage.vue';
import SingleProject from './pages/SingleProject.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name:'home',
            component: HomePage

        },
        {
            path:'/projects',
            name:'projects',
            component:ProjectsPage
        },
        {
            path:'/singleproject/:slug',
            name:'singleproject',
            component:SingleProject
        },
        {
            path:'/notfound',
            name:'notfound',
            component:NotFoundPage
        },
    ]
});


export {router};