<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';
import { store } from '../store';

export default {
  components: {
    AppCard,
    store,
  },
  data() {
    return {
      projects: [],
      types: [],
      numberPages: 1,
      curPage: "",
      selectedCategory:"",
    };
  },
  created() {
    this.curPage = 1;
    this.loadCurrentPage();
  },
  methods: {
    loadCurrentPage() {
      const params = {
        page: this.curPage,
      }
      if(this.selectedCategory !== ""){
        params.type_id = this.selectedCategory;
      }
      axios.get(`${store.apiBaseUrl}/api/project`, { 
        params,
      })
        .then(response => {
          this.selectedTypes();
          this.projects = response.data.response.data;
          this.numberPages = response.data.response.last_page;
        });
    },

    selectedTypes() {
      axios.get(`${store.apiBaseUrl}/api/types`)
        .then(response => {
          this.types = response.data.results;
        });
    },

    showPrev() {
      if (this.curPage > 1) {
        this.curPage--;
      }
      this.loadCurrentPage();
    },

    showNext() {
      if (this.curPage < this.numberPages) {
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

    <div class="pt-2 text-center">
      <!-- Filter Type -->
       <form action="">
       <select aria-label="Seleziona tipologia" @change="loadCurrentPage()" v-model="selectedCategory">
         <option value="">Filtra per Tipologia</option>
         <option :value="type.id" v-for="(type) in types">{{ type.name }}</option>
       </select>
       </form>
      <!-- Filter Type -->
    </div>

    <!-- pagination -->
    <nav aria-label="Page navigation" class="py-5">
      <ul class="pagination d-flex justify-content-center">

        <!-- disabled only curpage is = of 1 -->
        <li :class="{ disabled: curPage === 1 }" @click.prevent="showPrev()">
          &leftarrow;
        </li>

        <!-- show link page and use class active when curPage === page -->
        <li v-for="page in numberPages" :key="page" :class="{ active: curPage === page }"
          @click.prevent="changePage(page)">
          {{ page }}
        </li>

        <!-- disabled only curpage is = of lastpage -->
        <li :class="{ disabled: curPage === numberPages }" @click.prevent="showNext()">
          &RightArrow;
        </li>
      </ul>
    </nav>
    <!-- /pagination -->


    <!-- card container -->
    <div class="container d-flex justify-content-center flex-wrap gap-3 m-auto">

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
        <li :class="{ diabled: curPage === 1 }" @click.prevent="showPrev()">
          &leftarrow;
        </li>

        <!-- show link page and use class active when curPage === page -->
        <li v-for="page in numberPages" :key="page" :class="{ active: curPage === page }"
          @click.prevent="changePage(page)">
          {{ page }}
        </li>

        <!-- disabled only curpage is = of lastpage -->
        <li :class="{ disabled: curPage === numberPages }" @click.prevent="showNext()">
          &RightArrow;
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

div {
  margin: 0;
  padding: 0;
}

li:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

li:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

li {
  text-align: center;
  display: inline-block;
  width: 40px;
  aspect-ratio: 1;
  line-height: 40px;
  background-color: black !important;
  border: 1px solid gray;
  color: white !important;
}

li.active {
  background-color: gray !important;
}
</style>