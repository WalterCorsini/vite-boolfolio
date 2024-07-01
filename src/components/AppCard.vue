<script>
export default{
    props:{
        project: Object,
    },
    data(){
        return{
            //  pre src imgage 
            baseSrc: "http://127.0.0.1:8000/storage"
        }
    }
}
</script>

<template>

<!-- card -->
<router-link :to="{name : 'singleproject', params: {slug: project.slug }}" class="text-decoration-none">
<div class="card w-100 h-50">

    <!-- dynamic image -->
    <img class="card-img-top"
        :src="project.cover_image ?
        `${baseSrc}/${project.cover_image}` :
        './src/assets/img/no-img.jpg'" alt="Card image cap">
    <!-- /dynamic image -->

    <!-- card text -->
    <div class="card-body">

        <!-- title -->
        <h5 class="card-title">{{ project.title }}</h5>

        <!-- description -->
        <p class="card-text"> {{ project.description }}</p>

        <!-- type -->
        <div v-if="project.type">
            <span><strong> Tipologia: </strong></span>
            <span class="badge text-black" :style="{ backgroundColor: project.type.color}"> {{ project.type.name }}</span>
        </div>
        <!-- /type -->

        <!-- technologies -->
        <div v-if="project.technologies">
            <span><strong>Tecnologie: </strong></span>
            <span v-for="technology, index in project.technologies" :key="index">
                <span>
                    {{ technology.name }}
                </span>
                <span  v-if="index !== project.technologies.length - 1"> ,</span>
            </span>
        </div>
        <!-- /technologies -->

    </div>
    <!-- /card text -->

</div>
<!-- /card -->
</router-link>

</template>

<style lang="scss" scoped>
img{
    width: 100%;
    aspect-ratio: 1;
}
</style>