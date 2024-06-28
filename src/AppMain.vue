<script>
import axios from 'axios';
export default{
    data(){
        return{
            projects:[],
        }
    },
    created(){
        axios.get('http://127.0.0.1:8000/api/project')
       .then(resp => {
            // console.log(resp.data.response);
            this.projects = resp.data.response;
        });
    }
}
</script>

<template>
<p v-for="curProject in projects"> {{curProject.title}} </p>
</template>

<style lang="scss" scoped>

</style>