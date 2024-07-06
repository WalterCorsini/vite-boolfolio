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
      technologies: [],
      numberPages: 1,
      curPage: "",
      selectedType: "",
      selectedTechnology: "",
    };
  },
  created() {
    this.curPage = 1;
    this.loadCurrentPage();
    this.listTypes();
    this.listTechnologies();
  },
  methods: {
    loadCurrentPage() {
      // params curPace
      const params = {
        page: this.curPage,
      }

      // params Type
      if (this.selectedType !== "") {
        params.type_id = this.selectedType;
      }

      // params Technology
      if (this.selectedTechnology !== "") {
        params.technology_id = this.selectedTechnology;
      }

      // call
      axios.get(`${store.apiBaseUrl}/api/project`, {
        params,
      })
        // resp
        .then(response => {
          this.projects = response.data.response.data;
          this.numberPages = response.data.response.last_page;
        });
    },

    // list Type
    listTypes() {
      axios.get(`${store.apiBaseUrl}/api/types`)
        .then(response => {
          this.types = response.data.results;
        });
    },

    // list Technologies
    listTechnologies() {
      axios.get(`${store.apiBaseUrl}/api/technologies`)
        .then(response => {
          this.technologies = response.data.results;
        });
    },

    // previous page
    showPrev() {
      if (this.curPage > 1) {
        this.curPage--;
      }
      this.loadCurrentPage();
    },

    // next page
    showNext() {
      if (this.curPage < this.numberPages) {
        this.curPage++;
      }
      this.loadCurrentPage();
    },

    // change page on click
    changePage(direction) {
      this.curPage = direction;
      this.loadCurrentPage();
    },

  },
};
</script>

<template>
  <div class="container-fluid">

    <div class="pt-2 text-center d-flex gap-2 justify-content-center">

      <!-- Filter Type -->
      <form action="">
        <select aria-label="Seleziona tipologia" @change="loadCurrentPage()" v-model="selectedType">
          <option value="">Filtra per Tipologia</option>
          <option :value="type.id" v-for="(type) in types">{{ type.name }}</option>
        </select>
      </form>
      <!-- Filter Type -->

      <!-- Filter Technology -->
      <form action="">
        <select aria-label="Seleziona tecnologia" @change="loadCurrentPage()" v-model="selectedTechnology">
          <option value="">Filtra per Tecnologia</option>
          <option :value="technology.id" v-for="(technology) in technologies">{{ technology.name }}</option>
        </select>
      </form>
      <!-- Filter Technology -->
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