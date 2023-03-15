<template>
  <head>
    <!-- bootstrap -->
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>
    <!-- MDB -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.css" rel="stylesheet" />
  </head>
  <body class="bg-light">
    <!-- header apenas se usuario estiver logado -->
    <header v-if="isLoggedIn()">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#/home">Home</a>
              <a class="nav-link active" href="#/shows">Meus Shows</a>
              <a class="nav-link active" href="#/seguindo">Seguindo</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  
    <div class="container-fluid no-padding fill m-5">
      <!-- rota -->
      <router-view></router-view>
    </div>
  </body>
  <!-- Footer -->
  <footer class="bg-light text-center text-lg-start">
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2023 Copyright:
      <a class="text-dark" href="https://github.com/matheushro">Matheus Oliveira</a>
    </div>
    <!-- Copyright -->
  </footer>
</template>

<script>
  import ShowsCrud from './components/Shows.vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'App',
    Components: {
      ShowsCrud
    },
    mounted() {
      //chama .js 
      let mdBootstrapScript = document.createElement('script')
      mdBootstrapScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.js')
      document.head.appendChild(mdBootstrapScript)
    },
    methods: {
      ...mapGetters(["isLoggedIn"]),//busca getter para verificar login
    }
  }
</script>

<style>
html, body, #app {
  height: 100% !important;
  width: 100% !important;
}
</style>
