<template>
  <div class="home text-center">
    <img id="site-logo" class="mb-4" alt=" logo" src="../assets/logov2.png">
    
      <div v-if="user">
                            connecté en tant que {{ user.username }}
                            <button v-on:click="logoutUser()" class="btn btn-warning btn-sm">Déconnexion</button>
                        </div>
                        <!-- <Menu/> -->
    <Login v-if="user==null" msg="Connexion" v-on:user-authenticated="onUserAuthenticated"> </Login>
    <Listes v-if="user!=null"> </Listes>
  </div>
</template>

<script>
// @ is an alias to /src
// import Menu from '@/components/Menu.vue'
import Login from '@/components/Login.vue'
import Listes from '@/components/Listes.vue'
export default {
  name: 'Home',
  components: {
    Login,
    Listes
        },
        props: ['entrypoint'],
        methods: {
          logoutUser(){
            console.log("test logout")
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.user = undefined;
            this.$store.state.user = null;
          },
          
          initializeUser(){
            // console.log(localStorage.user)
            if(this.getCookie("token") && localStorage.user != undefined){
              // console.log(localStorage.user)
               this.onUserAuthenticated(localStorage.user) 
            }
  
                      
              },
           getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
},
            onUserAuthenticated(userUri) {
              console.log("test onUserAuthenticated")
              // console.log(userUri)
                this.$api
                    .get(userUri, {
                      headers: {
                        'authorization' : `Bearer ${this.getCookie("token")}`
                      }
                    })
                    .then(response => {this.$store.state.user = response.data
                    console.log(this.$store.state.user)
                    this.$store.commit('setListes',response.data.listes)
                    // console.log(response.data.listes[0].nom)
                    })
                    .catch(error=>{
                    console.log(error);
                    if(error.response.data.error){
                        this.error = error.response.data.error;
                    }else{
                        this.error="Erreur serveur";
                    }
                })
            }
        },
        data() {
            return {
                // user: null
            }
        },
        computed: {
            user: function(){
                console.log(this.$store.state.user)
                return this.$store.state.user;
            }
          
        },
         mounted: function () { 
              this.initializeUser();
               
            }
         
    }
</script>
<style scoped>

</style>