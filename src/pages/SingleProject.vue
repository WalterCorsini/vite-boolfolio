<script>
import axios from 'axios';
export default{
    data(){
        return{
            project: null,
        }
    },
    created(){
        const slug = this.$route.params.slug;
            axios.get(`http://127.0.0.1:8000/api/show/${slug}`)
               .then((resp) => {
                    console.log(resp.data);
                })
               .catch((error) => {
                    if(error.response.status === 404){
                        console.log("no project");
                        this.$router.push({name: 'notfound'});   
                    }
                });
    },
};
</script>

<template>
    <h1>single project</h1>
</template>