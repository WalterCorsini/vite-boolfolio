<script>
import axios from 'axios';
import { store } from '../store';
export default {
    data() {
        return {
            project: null,
            baseSrc: "http://127.0.0.1:8000/storage",
            store
        }
    },
    created() {
        const slug = this.$route.params.slug;
        axios.get(`${this.store.apiBaseUrl}/api/show/${slug}`)
            .then((resp) => {
                console.log(resp.data.result);
                this.project = resp.data.result;
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    console.log("no project");
                    // window.location.href = '/notfound';
                    this.$router.push({ name: 'notfound' });
                }
            });
    },
};
</script>

<template>
    <div v-if="project">

        <!-- title page -->
        <h1 class="text-center mt-5">Dettagli</h1>

        <!-- container -->
        <div class="container mt-5 d-flex">
            <div class="col-8">

                <!-- title record -->
                <p>
                    <strong>Titolo:</strong>
                    {{ project.title }}
                </p>

                <!-- description -->
                <p>
                    <strong>Descrizione:</strong>
                    {{ project.description }}
                </p>

                <!-- slug -->
                <p>
                    <strong>Slug:</strong>
                    {{ project.slug }}
                </p>

                <!-- type -->
                <p v-if="project.type">
                    <strong>Type:</strong>
                    {{ project.type.name }}
                </p>

                <!-- technologies -->
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
                <img class="card-img-top" :src="`${store.apiBaseUrl}/storage/${project.cover_image}`"
                    alt="Card image cap">
                <!-- /dynamic image -->
            </div>

        </div>
        <!-- container -->

    </div>
</template>

<style lang="scss" scoped>
img {
    width: 300px;
    aspect-ratio: 1;
}
</style>