<script>
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a class="navbar-brand" href="#">Boolfolio</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul class="navbar-nav d-flex gap-5">

                <li class="nav-item active">
                    <router-link :to="{ name: 'home' }" class="text-decoration-none text-white fs-4">
                        Home
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link :to="{ name: 'projects' }" class="text-decoration-none text-white fs-4">
                        Progetti
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.router-link-active  {
    padding-bottom: 10px;
    border-bottom: 3px solid white;
}
</style>