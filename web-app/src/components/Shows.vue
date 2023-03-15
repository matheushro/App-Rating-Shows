<template>
    <div class="container">
        <div class="card">
            <div class="card-header text-center">
                {{msgItem}}
            </div>
            <div class="card-body text-center ">
                <div class="container">
                    <div class="input-group">
                        <div class="container form-line">
                            <label for="desc">Descrição:</label>
                            <input v-model="desc" type="text" id="desc" name="desc" class="form-control show-tick " data-live-search="true" >
                        </div> 
                    </div>
                </div>
                <div>
                    <!-- altera entre botos de cadastro e editar -->
                    <div class="form-line"  v-if="adicionar">
                        <button @submit.prevent="onSubmit" v-on:click="formCadastro();" class="btn btn-primary m-3">Adicionar</button>
                    </div>
                    <div class="form-line"  v-if="!adicionar">
                        <button @submit.prevent="onSubmit" v-on:click="formEditar();" class="btn btn-warning m-3">Editar</button>
                        <button v-on:click="carregar();" class="btn btn-danger m-3">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
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
                        <!-- for para carregar postagens do user logado -->
                        <tr v-for="item in carregarShowsUser" :key="item.id_show">
                            <td>{{ item.desc_show }}</td>
                            <td>{{ item.likes }}</td>
                            <td>{{ item.dislikes }}</td>
                            <td>{{ item.seguidores }}</td>
                            <!-- ações de acordo com estado atual de cada post -->
                            <td>
                                <button v-if="!item.concluded && item.likes == 0 && item.dislikes == 0 && item.seguidores == 0" v-on:click="deletarShow(item.id_show);" data-toggle="tooltip" title="Cancelar Show" class="btn btn-danger waves-effect m-1">
                                    <i class="material-icons">cancel</i>
                                </button>
                                <button v-if="!item.concluded" v-on:click="carregaEditarShow(item.id_show, item.desc_show);" data-toggle="tooltip" title="Editar Show" class="btn btn-warning waves-effect m-1">
                                    <i class="material-icons">edit</i>
                                </button>
                                <button v-if="!item.concluded" v-on:click="finalizar(item.id_show);" data-toggle="tooltip" title="Finalizar Show" class="btn btn-success waves-effect m-1">
                                    <i class="material-icons">done</i>
                                </button>
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
        name: 'ShowsCrud',
        data(){
            return{
                adicionar: true,  //entre adicionar ou editar post
                msgItem: 'Adicionar Item', //msg atual
                id: '', 
                desc: '',
                itens: ''
            }
        },
        methods: {
            //carrega pagina
            carregar(){
                this.itens = this.$store.dispatch('carregarShowsUser');
                this.msgItem = 'Adicionar Item',
                this.adicionar = true,
                this.id = this.desc = ''
            },
            //method para editar post
            formEditar(){
                axios.put('http://localhost:3000/shows', {
                    descricao: this.desc,
                    id: this.id
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(({data}) => {console.log(data), this.carregar()});
            },
            //method para cadastrar novo post
            formCadastro(){
                axios.post('http://localhost:3000/shows', {
                    descricao: this.desc,
                    id_user: this.user.id_user,
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(({data}) => {console.log(data), this.carregar()});
            },
            //method para eletar post
            deletarShow(id){
                axios.delete('http://localhost:3000/shows/' + id, {
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(({data}) => {console.log(data), this.carregar()});
                
            },
            //carrega informações no input para editar
            carregaEditarShow(id, desc){
                this.id = id;
                this.desc = desc;
                this.msgItem = 'Editar Item',
                this.adicionar = false
            }
        },
        props: {
            msg: String
        },
        //ao criar pagina, utiliza method carregar
        created(){
            this.carregar();
        },
        computed: {
            //carrega postagens
            carregarShowsUser(){
                return this.$store.state.carregarShowsUser;
            },
            //carrega state de routes
            ...mapState({
                token: "token",
                user: "user",
                shows: "carregarShowsUser"
            })
        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  