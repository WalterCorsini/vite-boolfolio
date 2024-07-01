Iniziate installando il router di vue. Create due pagine statiche, ad esempio, Home e About us e create il file router.js dove dovrete impostare le rotte corrispondenti alle due pagine create. Inserite il router nel file main.js in modo da renderlo disponibile a livello di tutta l'applicazione. Nel file App.vue impostate il tag <router-view> che sarà il punto di inserimento di diverse pagine.
A questo punto potete inserire le voci delle pagine nel menu di navigazione e testare il tutto.
Infine create la pagina dei progetti e spostate il codice scritto venerdì in questa pagina, aggiornando gli import dei componenti. Collegate la pagina al router e testate il tutto.
Bonus:
Aggiungere la pagina singolo post, creando prima api corrispondente.


AppPagination
<script>
export default {
    props: {
        curPage: Number,
        numberPages: Number,
    },
    methods: {
        changePage(direction) {
            console.log(direction,this.curPage);
            const newPage = direction;
            if (newPage > 0 && newPage <= this.numberPages) {
                this.$emit('page-change', newPage);
            }
            this.curPage=direction;
        },
    },
};
</script>

<template>

    <!-- container pagination -->
    <div class="d-flex justify-content-center pt-4">

        <!-- pagination -->
        <nav aria-label="Page navigation">
            <ul class="pagination">

                <!-- show only curpage is > of 1 -->
                <li class="page-item" v-if="curPage > 1">
                    <a class="page-link" @click.prevent="changePage(curPage - 1)">Previous</a>
                </li>

                <!-- show link page and use class active when curPage === page -->
                <li class="page-item" v-for="page in numberPages" :key="page" :class="{ active: curPage === page}">
                    <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
                </li>

                <!-- show only curpage is < of lastpage -->
                <li class="page-item" v-if="curPage < numberPages">
                    <a class="page-link" @click.prevent="changePage(curPage + 1)">Next</a>
                </li>
            </ul>
        </nav>
        <!-- /pagination -->

    </div>
    <!-- /container pagination -->

</template>

<style lang="scss" scoped>
div{
    margin: 0;
    padding: 0;
}

.page-link{
    background-color: black;
    color: white;
    border: 0
}

ul{
    border: 0;
}

</style>