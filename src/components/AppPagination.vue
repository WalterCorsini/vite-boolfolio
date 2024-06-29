<script>
export default {
    props: {
        curPage: Number,
        numberPages: Number,
    },
    methods: {
        // send in AppMain the new currentPage
        changePage(direction) {
            const newPage = direction;
            if (newPage > 0 && newPage <= this.numberPages) {
                this.$emit('page-change', newPage);
            }
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
                <li class="page-item" v-for="page in numberPages" :key="page" :class="{active: curPage === page}">
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
