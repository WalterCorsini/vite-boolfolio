<script>
import axios from 'axios';
import AppCard from './AppCard.vue';
export default{
    components:{
        AppCard,
    },
    data(){
        return{
            projects:[],

        }
    },
    created(){
        axios.get('http://127.0.0.1:8000/api/project')
       .then(resp => {
            // console.log(resp.data.response.data);
            this.projects = resp.data.response.data;
        });
    }
}
</script>

<template>
    <div class="container d-flex flex-wrap gap-3 pt-5">
        <div v-for="curProject in projects" class="card" style="width: 18rem;">
            <AppCard :project="curProject" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-img{
    width: 100%;
    aspect-ratio: 1;    
}
</style>