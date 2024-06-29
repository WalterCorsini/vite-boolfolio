<script>
import axios from 'axios';
import AppCard from './AppCard.vue';
import AppPagination from './AppPagination.vue';

export default {
  components: {
    AppCard,
    AppPagination,
  },
  data() {
    return {
      projects: [],
      numberPages: 1,
      curPage: "",
    };
  },
  methods: {
    // load Page
    loadCurrentPage() {
      axios.get('http://127.0.0.1:8000/api/project', {
        params: {
          page: this.curPage,
        },
      })
        .then(response => {
          this.projects = response.data.response.data;
          this.numberPages = response.data.response.last_page;
        });
    },

    // Change current page
    changeCurrentPage(newPage) {
      this.curPage = newPage;
      console.log(newPage);
      this.loadCurrentPage();
    },
  },
  
  // call function to load first page
  created() {
    this.curPage = 1;
    this.loadCurrentPage();
  },
};
</script>

<template>

  <div class="container-fluid">

    <!-- pagination -->
    <AppPagination :curPage="curPage" :numberPages="numberPages" @page-change="changeCurrentPage" />
    <!-- /pagination -->

    <!-- card container -->
    <div class="container d-flex flex-wrap gap-3 pt-5 pb-5">

      <!-- card -->
      <div v-for="curProject in projects" class="card" style="width: 18rem;">
        <AppCard :project="curProject" />
      </div>
      <!-- card -->

    </div>
    <!-- /card container -->

    <!-- pagination -->
    <AppPagination :curPage="curPage" :numberPages="numberPages" @page-change="handlePageChange" />
    <!-- /pagination -->

  </div>
  
</template>

<style lang="scss" scoped>
.card-img {
  width: 100%;
  aspect-ratio: 1;
}

.container-fluid {
  padding: 0 !important;
  margin: 0 !important;
  background-color: rgb(66, 66, 66);
}
</style>