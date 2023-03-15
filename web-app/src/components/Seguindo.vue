<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <table id="dtBasicExample" class="table table-striped">
                    <thead>
                        <th>Descrição</th>
                        <th>Recomendam</th>
                        <th>Não recomendam</th>
                        <th>Seguidores</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        <!-- for para posts seguidos pelo user -->
                        <tr v-for="item in carregarShowsSeguindo" :key="item">
                            <td>{{ item.desc_show }}</td>
                            <td :class="{ 'text-success': interaction }">{{ item.likes }}</td>
                            <td>{{ item.dislikes }}</td>
                            <td :class="{ 'text-primary': seguindo }">{{ item.seguidores }}</td>
                            <td>
                                <p  class="font-italic" v-if="item.concluded">Item Finalizado</p>
                                <p  class="font-italic" v-if="!item.concluded">Em Andamento</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex';
    export default {
        name: 'SeguindoCrud',
        data(){
            return{
                adicionar: true,
                interaction: false,
                seguindo: false
            }
        },
        methods: {
            //carrega pagina
            carregar(){
                this.itens = this.$store.dispatch('carregarShowsSeguindo');
                this.msgItem = 'Adicionar Item',
                this.adicionar = true,
                this.id = this.desc = ''
            },
            //limpa interacoes
            limpaInteractions(){
                this.interaction = false,
                this.seguindo = false
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
            //carrega dados do backend
            carregarShowsSeguindo(){
                return this.$store.state.carregarShowsSeguindo;
            },
            //carrega state atual 
            ...mapState({
                token: "token",
                user: "user",
                shows: "carregarShowsSeguindo"
            })
        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  