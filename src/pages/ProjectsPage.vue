<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';

export default {
  components: {
    AppCard,
  },
  data() {
    return {
      projects: [],
      numberPages: 1,
      curPage: "",
    };
  },
    created() {
    this.curPage = 1;
    this.loadCurrentPage();
  },
  methods: {
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

    showPrev(){
      if(this.curPage>1){
        this.curPage--;
      }
      this.loadCurrentPage();
    },

    showNext(){
      if(this.curPage < this.numberPages){
        this.curPage++;
      }
      this.loadCurrentPage();
    },

    changePage(direction) {
            this.curPage = direction;
            this.loadCurrentPage();
    },

  },
};
</script>

<template>
  <div class="container-fluid">

        <!-- pagination -->
        <nav aria-label="Page navigation" class="py-5">
            <ul class="pagination d-flex justify-content-center">

                <!-- disabled only curpage is = of 1 -->
                <li class="page-item" :class="{diabled: curPage === 1}">
                    <a class="page-link" @click.prevent="showPrev()"> &leftarrow;</a>
                </li>

                <!-- show link page and use class active when curPage === page -->
                <li class="page-item" v-for="page in numberPages" :key="page" :class="{ active : curPage === page}">
                    <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
                </li>

                <!-- disabled only curpage is = of lastpage -->
                <li class="page-item" :class="{ disabled: curPage === numberPages}">
                    <a class="page-link" @click.prevent="showNext()">&RightArrow;</a>
                </li>
            </ul>
        </nav>
    <!-- /pagination -->

    <!-- card container -->
    <div class="container d-flex flex-wrap gap-3">

      <!-- card -->
      <div v-for="curProject in projects" class="card" style="width: 18rem;">
        <AppCard :project="curProject" />
      </div>
      <!-- card -->

    </div>
    <!-- /card container -->

        <!-- pagination -->
        <nav aria-label="Page navigation" class="py-5">
            <ul class="pagination d-flex justify-content-center">

                <!-- disabled only curpage is = of 1 -->
                <li class="page-item" :class="{diabled: curPage === 1}">
                    <a class="page-link" @click.prevent="showPrev()"> &leftarrow;</a>
                </li>

                <!-- show link page and use class active when curPage === page -->
                <li class="page-item" v-for="page in numberPages" :key="page" :class="{ active : curPage === page}">
                    <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
                </li>

                <!-- disabled only curpage is = of lastpage -->
                <li class="page-item" :class="{ disabled: curPage === numberPages}">
                    <a class="page-link" @click.prevent="showNext()">&RightArrow;</a>
                </li>
            </ul>
        </nav>
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

div{
    margin: 0;
    padding: 0;
}
.page-link{
  background-color: black;
  color: white;
}

</style>