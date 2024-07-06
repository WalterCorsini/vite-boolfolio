<script>
import axios from 'axios'; store
import { store } from '../store';
import AppCard from '../components/AppCard.vue';


export default {
    components: {
        AppCard,
    },
    data() {
        return {
            projects: [],
            store
        }
    },
    created() {
        const params = {
            last_project: 1,
        }
        axios.get(`${store.apiBaseUrl}/api/project`, {
            params,
        })
            // resp
            .then(response => {
                this.projects = response.data.response;
            });
    }
}
</script>

<template>
    <h1 class="text-center mt-5">
        &star; Visualizza i progetti piu recenti &star;
    </h1>
    <div class="container mt-5">
        <div class="row justify-content-center gap-3">
            <!-- card -->
            <div v-for="curProject in projects" class="card mt-3" style="width: 18rem;">
                <AppCard :project="curProject" />
            </div>
            <!-- card -->
        </div>

    </div>
</template>