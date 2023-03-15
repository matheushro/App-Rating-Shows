<template>
    <div class="container-fluid col-sm-12 col-md-12 col-lg-8 col-xl-8">
        <div class="card">
            
            <div class="card-body">
                <table id="dtBasicExample" class="table table-striped">
                    <thead>
                        <th>Descrição</th>
                        <th>Recomendam</th>
                        <th>Não recomendam</th>
                        <th>Seguidores</th>
                        <th>Ações</th>
                    </thead>
                    <tbody>
                        <!-- carrega feed completo -->
                        <tr v-for="item in carregarShows" :key="item">
                            <td>{{ item.desc_show }}</td>
                            <td>{{ item.likes }}</td>
                            <td>{{ item.dislikes }}</td>
                            <td>{{ item.seguidores }}</td>
                            <!-- ações de acordo com estado atual de cada post -->
                            <td>
                                <button v-if="!item.concluded && item.id_user != user.id_user" v-on:click="likeShow(item.id_show, user.id_user);" data-toggle="tooltip" title="Recomendar show" class="btn btn-success waves-effect m-1">
                                    <i class="material-icons">thumb_up</i>
                                </button>
                                <button v-if="!item.concluded && item.id_user != user.id_user" v-on:click="dislikeShow(item.id_show, user.id_user);" data-toggle="tooltip" title="Não recomendar Show" class="btn btn-danger waves-effect m-1">
                                    <i class="material-icons">thumb_down</i>
                                </button>
                                <button v-if="!item.concluded && item.id_user != user.id_user" v-on:click="acompanharShow(item.id_show, user.id_user);" data-toggle="tooltip" title="Acompanhar Show" class="btn btn-primary waves-effect m-1">
                                    <i class="material-icons">turned_in</i>
                                </button>
                                <p  class="font-italic" v-if="item.id_user == user.id_user">Postagem Própria</p>
                                <p  class="font-italic" v-if="item.concluded">Item Finalizado</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { mapState } from 'vuex';
    export default {
        name: 'HomeShows',
        data(){
            return{
                adicionar: true,
                msgItem: 'Adicionar Item',
                id: '',
                desc: '',
            }
        },
        methods: {
            //carrega pagina
            carregar(){
                this.$store.dispatch('carregarShows');
            },
            //botão like
            likeShow(id_show, id_user){
                axios.post('http://localhost:3000/shows/action', {
                    id_show: id_show,
                    id_user: id_user,
                    interaction: 1
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(({data}) => {console.log(data), this.carregar()});
            },
            //botão dislike
            dislikeShow(id_show, id_user){
                axios.post('http://localhost:3000/shows/action', {
                    id_show: id_show,
                    id_user: id_user,
                    interaction: 2
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(({data}) => {console.log(data), this.carregar()});
            },
            //botão para seguir post
            acompanharShow(id_show, id_user){
                axios.post('http://localhost:3000/shows/acompanhar', {
                    id_show: id_show,
                    id_user: id_user
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(({data}) => {console.log(data), this.carregar()});
            }
        },
        props: {
            msg: String
        },
        //ao criar pagina, usa method carregar
        created(){
            this.carregar();
        },
        computed: {
            //carrega shows do backend
            carregarShows(){
                return this.$store.state.carregarShows;
            },
            //busca mapstate atual
            ...mapState({
                token: "token",
                user: "user"
            })
        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  