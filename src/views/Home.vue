<template>
  <div class="home text-center">
    <img id="site-logo" alt="Vue logo" src="../assets/logo.png">
      <span v-if="user">
                            connecté en tant que {{ user.username }}
                            <a href="/logout" class="btn btn-warning btn-sm">Déconnexion</a>
                        </span>
    <Login msg="Connexion" v-on:user-authenticated="onUserAuthenticated"> </Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login
        },
        props: ['entrypoint'],
        methods: {
            onUserAuthenticated(userUri) {
                this.$api
                    .get(userUri)
                    .then(response => (this.user = response.data))
            }
        },
        data() {
            return {
                user: null
            }
        },
         mounted() {
            if (window.user) {
                this.user = window.user;
            }
         }
    }
</script>
