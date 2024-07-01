<script>
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
  <a class="navbar-brand" href="#">Boolfolio</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
    <ul class="navbar-nav d-flex gap-3">

      <li class="nav-item active">
        <router-link :to="{ name: 'home'}">
            Home
        </router-link>
      </li>

      <li class="nav-item">
        <router-link :to="{ name: 'projects'}">
                Progetti
            </router-link>
      </li>
    </ul>
  </div>
</nav>
</template>