<template>
    <div class="container-fluid col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-5">
        <div class="card">
            <!-- para login -->
            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                    aria-controls="pills-login" aria-selected="true">Login</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                    aria-controls="pills-register" aria-selected="false">Registro</a>
                </li>
            </ul>
            <!-- para novo registro -->
            <div class="tab-content">
                <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <input v-model="loginUsername" type="text" id="loginName" class="form-control" />
                        <label class="form-label" for="loginName">Email or username</label>
                    </div>
                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <input v-model="loginPassword" type="password" id="loginPassword" class="form-control" />
                        <label class="form-label" for="loginPassword">Password</label>
                    </div>
                    <!-- Submit button -->
                    <button v-on:click="login();"  type="submit" class="btn btn-primary btn-block mb-4">Login</button>
                </div>
                <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <!-- Username input -->
                    <div class="form-outline mb-4">
                        <input v-model="username" type="text" id="registerUsername" class="form-control" />
                        <label class="form-label" for="registerUsername">Username</label>
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <input v-model="password" type="password" id="registerPassword" class="form-control" />
                        <label class="form-label" for="registerPassword">Password</label>
                    </div>

                    <!-- Repeat Password input -->
                    <div class="form-outline mb-4">
                        <input v-model="repeatPassword" type="password" id="registerRepeatPassword" class="form-control" />
                        <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                    </div>
                    <button v-on:click="registro();"  type="submit" class="btn btn-primary btn-block mb-3">Registro</button>
                    
                </div>
            </div>
            <!-- Pills content -->
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import {mapMutations} from 'vuex';
import { mapGetters } from 'vuex'
    export default {
        name: 'LoginShows',
        data(){
            return{
                loginUsername: '',
                loginPassword: '',
                username : '',
                password: '',
                repeatPassword: '',
                data: '',
                log: 0
            }
        },
        methods: {
            //busca mutations do store
            ...mapMutations([
                'setUser',
                'setToken'
            ]),
            //busca getters do store
            ...mapGetters([
                'isLoggedIn'
            ]),
            //method registro para novo usuario
            registro(){
                if(this.repeatPassword == this.password){
                    if(this.username){
                        axios.post('http://localhost:3000/users', {
                            user: this.username,
                            password: this.password
                        },{
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(({data}) => console.log(data)).then(alert('Cadastro realizado com sucesso'));
                    }else{
                        alert('Username vazio');
                    }
                }else{
                    alert('Senhas não conferem ou campo vazio!');
                }
            },
            //method para login
            login(){
                if(this.loginPassword){
                    if(this.loginUsername){
                        axios.post('http://localhost:3000/users/login', {
                            user: this.loginUsername,
                            password: this.loginPassword
                        },{
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(({data}) => {this.setToken(data.token), this.setUser(data.user), this.$router.push('/home')});
                        
                    }else{
                        alert('Username vazio');
                    }
                }else{
                    alert('Senhas não conferem ou campo vazio!');
                }
                
            }
        },
        props: {
            msg: String
        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  