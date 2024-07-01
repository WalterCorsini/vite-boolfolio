<script>
import axios from 'axios';
export default {
    data() {
        return {
            project: null,
            baseSrc: "http://127.0.0.1:8000/storage"
        }
    },
    created() {
        const slug = this.$route.params.slug;
        axios.get(`http://127.0.0.1:8000/api/show/${slug}`)
            .then((resp) => {
                console.log(resp.data.result);
                this.project = resp.data.result;
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    console.log("no project");
                    this.$router.push({ name: 'notfound' });
                }
            });
    },
};
</script>

<template>
    <h1 class="text-center mt-5">Dettagli</h1>
    <div class="container mt-5 d-flex">
        <div class="col-8">
            <p>
                <strong>Titolo:</strong>
                {{ project.title }}
            </p>
            <p>
                <strong>Descrizione:</strong>
                {{ project.description }}
            </p>
            <p>
                <strong>Slug:</strong>
                {{ project.slug }}
            </p>
            <p v-if="project.type">
                <strong>Type:</strong>
                {{ project.type.name }}
            </p>
            <ul v-if="project.technologies.length > 0">
                <li>
                    <strong>
                        technologie:
                    </strong>
                    <ul>
                        <li v-for="technology in project.technologies">
                            <strong>{{ technology.name }} :</strong>
                            {{ technology.description }}
                        </li>
                    </ul>
                </li>
            </ul>

        </div>

        <div class="right-col col-4">
            <!-- dynamic image -->
            <img class="card-img-top" :src="project.cover_image ?
                `${baseSrc}/${project.cover_image}` :
                '../src/assets/img/no-img.jpg'" alt="Card image cap">
            <!-- /dynamic image -->
        </div>

    </div>

</template>

<style lang="scss" scoped>
img {
    width: 300px;
    aspect-ratio: 1;
}
</style>