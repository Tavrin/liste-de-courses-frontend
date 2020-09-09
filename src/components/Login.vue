<template>
<div class="login">
    <h1 class="text-center">{{msg}}</h1>
    <form v-on:submit.prevent="handleSubmit">
        <div v-if="error" class="alert alert-danger">
            {{error}}
        </div>
    <div class="form-group">
                <label>Nom d'utilisateur</label>
                <input type="text" v-model="username" placeholder="Nom d'utilisateur" class="form-control form-control" />
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" v-model="password" placeholder="Mot de passe" id="passwd" class="form-control form-control" />
            </div>

            <button type="submit" v-bind:class="{ disabled: isLoading }" class="btn btn-dark btn-lg btn-block">Connexion</button>
            </form>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
      return {
          username:'',
          password:'',
          error:'',
          isLoading: false

      }
  },
  props: {
    msg: String,
  },
  methods:{
      handleSubmit(){
         
          this.isLoading = true;
          this.error="";
          this.$store.commit("setError",'')

            this.$api
                .post("/login",{
                        username: this.username,
                        password: this.password
                })
                .then(response=>{
                    // console.log(response)
                    document.cookie = `token=${response.data.token}; max-age=3600`
                    var userLocation =  response.data.user.location;
                    localStorage.user =userLocation;
                    this.$store.commit("setCurrentUser", userLocation)
                    this.$emit('user-authenticated', userLocation);
                    // console.log(response.data.user.location)
                        this.email = '';
                        this.password = '';
                })
                .catch(error=>{
                    console.log(error);
                    if(error.response.data.message){
                        this.error = error.response.data.message;
                        
                         this.$store.commit("setError",error.response.data.message)
                          console.log(this.$store.state.error)
                    }else{
                        this.error="Erreur serveur";
                    }
                }).finally(() => {
                        this.isLoading = false;
                    })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    padding: 1rem;
    margin: 0 auto;
    background-color: white;
    max-width: 22rem;
    border-radius: 15px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
