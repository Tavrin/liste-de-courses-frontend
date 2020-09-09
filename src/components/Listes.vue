<template>
<!-- <h1>test</h1> -->
    <div class="listes-zone container">
         <div v-if="getError" class="alert alert-danger">
            {{getError}}
        </div>
        <h1>{{currentPage}}</h1>
        <div class="row">
            <div v-if="listeDetails==null" id="listes-zone-groupe" class="col list-group">
                        <div class="input-group mb-3">
  <div class="input-group-prepend">
    <button class="btn btn-outline-secondary" type="submit"  v-on:click.prevent="addListe" id="button-addon1">Ajouter une liste</button>
  </div>
  <input type="text" class="form-control" v-model="nom" name="produit" placeholder="Nom" aria-label="Ajouter un produit" aria-describedby="button-addon1">
  <!-- <input type="number" aria-label="quantité" v-model="quantity" placeholder="Quantité" class="form-control"> -->

</div>
                <div class="" v-for="liste in getListes" v-bind:key="liste.id">
                    <a href="#" v-on:click.prevent="getListProducts(liste['@id'],liste.nom)" class="list-group-item list-group-item-action d-flex justify-content-between"><span class="text-left">{{liste.nom}}</span><span class="text-right"> {{getListeLength(liste)}} produits</span></a>

                </div>
            </div>
            <div id="listes-zone-details" class="col list-group" v-if='listeDetails!=null'>
                
            <a href="#" v-on:click.prevent="resetProduits" class="list-group-item list-group-item-action mb-4">Revenir aux listes</a>
            
            <div class="input-group mb-3">
  <div class="input-group-prepend">
    <button class="btn btn-outline-secondary" type="submit"  v-on:click.prevent="addProduit" id="button-addon1">Ajouter un produit</button>
  </div>
  <input type="text" class="form-control" v-model="nom" name="produit" placeholder="Nom" aria-label="Ajouter un produit" aria-describedby="button-addon1">
  <input type="number" aria-label="quantité" v-model="quantity" placeholder="Quantité" class="form-control">
   <input type="text" aria-label="Marque" v-model="marque" placeholder="Marque (optionnel)" class="form-control">
    <!-- <input type="text" aria-label="Prix" v-model="prix" placeholder="Prix (optionnel)" class="form-control"> -->
</div>


                    <a href="#" v-for="(produit,index) in getProduits.produits" v-bind:key="produit.id" class="list-group-item list-group-item-action d-flex justify-content-between"><span>{{produit.nom}}</span><span><span class="pr-4">Quantité : {{produit.quantity}}</span><button class="btn btn-danger" v-on:click.prevent="deleteProduit(produit,index)">Supprimer</button></span>  </a>
                <!-- {{produit.nom}} -->
               

            </div>
            </div>
        </div> 
</template>

<script>
export default {
    name:"Listes",

    data: function(){
        return{
            index: null,
            listId: null,
            listeDetails: null,
            currentPage: 'Mes Listes',
            nom:'',
            quantity:null,
            prix: null,
            marque:'',
            newProduit:{},
            newProdArr: []
        }
    },
    mounted: function(){
        // console.log(this.getListes);
    },
    methods: {
        deleteProduit(produit,index){
            this.newProdArr = this.getProduits.produits
            this.newProdArr.splice(index,1)
            console.log(this.newProdArr)
            this.$api
                .delete(produit['@id'],{
                 headers: {
                        'authorization' : `Bearer ${this.$parent.getCookie("token")}`
                 }
                      
                })
                .then(response=>{
                    console.log(response)
                }).catch(error=>{
                    console.log(error)
                })

     
        },
        addProduit(){
              this.$store.commit("setError","")
            // console.log(this.listeDetails)
            console.log(this.nom)
            if(this.nom =='' || this.quantity==null){
                return this.$store.commit("setError","Il manque des données")
            }

            this.newProduit ={
                "nom": this.nom,
                "quantity": parseInt(this.quantity)
            }

            // if(this.prix != null){
            //     console.log(parseFloat(this.prix))
            //     this.newProduit["prix"] = parseFloat(this.prix)
            // }
            if(this.marque !=''){
                this.newProduit["marque"] = this.marque
            }
                // "nom": this.nom,
                // "prix": parseFloat(this.prix),
                // "quantity": parseInt(this.quantity),
                // "marque": this.marque
            
            this.newProdArr =this.listeDetails.produits
            this.newProdArr.unshift(this.newProduit);
            // console.log(this.newProdArr)
             this.$api
                .put(this.listeDetails["@id"],{
                produits: this.newProdArr},
                 {headers: {
                        'authorization' : `Bearer ${this.$parent.getCookie("token")}`
                 }
                      
                })
                .then(response=>{
                    console.log(response)
                    this.nom=''
                    this.quantity=null
                }).catch(error=>{
                    console.log(error)
                })
        },
         addListe(){
             console.log(this.$store.state.user)
                  this.$store.commit("setError","")
             if(this.nom==''){
                 return this.$store.commit("setError","Il manque des données")
             }
            this.$api
             .post("/listes",{
                nom: this.nom,
                users:[this.$store.state.user['@id']]},
                 {headers: {
                        'authorization' : `Bearer ${this.$parent.getCookie("token")}`
                 }
                      
                })
                .then(response=>{
                    console.log(response)
                    var listesUpdate = this.getListes
                    listesUpdate.unshift(response.data)
                    this.$store.commit("setCurrentListe",listesUpdate)
                    this.nom=''
                    this.quantity=null
                }).catch(error=>{
                    console.log(error)
                })
         }
        ,
        resetProduits(){
             this.$store.commit("setError","")
            this.$store.commit("setProduits", [])
            this.listeDetails = null;
            this.currentPage = 'Mes Listes'
        },
        getListeLength: function (liste) {
            console.log("tesdfsdf")
            return liste.produits.length
        },
        getListProducts(listId,nom){
            
                    this.$api
                    .get(listId, {
                      headers: {
                        'authorization' : `Bearer ${this.$parent.getCookie("token")}`
                      }
                    })
                    .then(response => {
                        this.listeDetails = response.data
                    console.log(response.data)
                        this.$store.commit('setProduits',response.data)
                        this.currentPage = `Produits dans : ${nom}`
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
    computed:{
        
        getListes: function(){
            console.log("getListes")
            console.log(this.$store.state.listes);
            return this.$store.state.listes;
            
        },
        getProduits:function () {
            return this.$store.state.produits;
            
        },
          getError: function(){
              return this.$store.state.error;
            }
    }

}
</script>

<style scoped>
.listes-zone{
    max-width: 40%!important;
}
#listes-zone-groupe{
    /* max-width: 50%; */
    /* text-align: left; */
}
#listes-zone-details{
    /* width: 50%; */
    height: 100%;
    background: #dfe6f0;
    padding-right: 0 !important;
}
@media screen and (max-width:  1300px){
   .listes-zone{
       max-width: 90%!important;
   }
}
    
</style>