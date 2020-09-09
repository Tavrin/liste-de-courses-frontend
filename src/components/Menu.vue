<template>
<!-- <h1>test</h1> -->
<div class="nav">
    test
</div>
</template>

<script>
export default {
    name:"Menu",
    data: function(){
        return{
            listes : this.userListes,
            listId: null,
            listeDetails: null
        }
    },
    mounted: function(){
        console.log(this.listes);
    },
    methods: {
        getListProducts(listId){
            console.log(listId)
                    this.$api
                    .get(listId, {
                      headers: {
                        'authorization' : `Bearer ${this.$parent.getCookie("token")}`
                      }
                    })
                    .then(response => {this.listeDetails = response.data
                    console.log(response.data)
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
    }

}
</script>

<style scoped>
#listes-zone-groupe{
    /* max-width: 50%; */
}
#listes-zone-details{
    /* width: 50%; */
    height: 100%;
    background: white;
    padding-right: 0 !important;
}
</style>