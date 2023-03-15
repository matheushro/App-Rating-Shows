const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Shows = require('../model/Shows');
const Resposta = require('../model/Resposta');
//busca todos os posts
router.get("/", function(req, resp, next){
    Shows.getTodos(function(error, retorno){
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
});
//busca post específico 
router.get("/:id?", function(req, resp, next){
    Shows.getId(req.params.id, function(error, retorno){
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
});
//busca posts seguidos pelo user
router.get("/seguindo/:id?", function(req, resp, next){
    Shows.getTodosSeguindo(req.params.id, function(error, retorno){
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
});
//busca posts do user
router.get("/user/:id?", function(req, resp, next){
    Shows.getTodosUser(req.params.id, function(error, retorno){
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
});
//adiciona novo post
router.post("/", upload.none(), function(req, resp, next){
    Shows.adicionar(req.body, function(error, retorno){
        
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Cadastro adicionado com sucesso";
            }else{
                resposta.error = true;
                resposta.msg = "Ocorreu um erro no cadastro";
                console.log("erro: ", error);
            }
        }
        console.log('resp: ', resposta);
        resp.json(resposta);
    });
});
//lança action de like ou dislike
router.post("/action", upload.none(), function(req, resp, next){
    Shows.getInteractions(req.body, function(error, retorno){
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
            if(resposta.dados[0]){
                //se ja existir no banco, apenas edita
                Shows.editarAction(req.body, function(error, retorno){
                    let resposta = new Resposta();
                    if(error){
                        resposta.error = true;
                        resposta.msg = "Ocorreu um erro";
                        console.log("erro: ", error);
                    }else{
                        if(retorno.affectedRows > 0){
                            resposta.msg = "Cadastro alterado com sucesso";
                        }else{
                            resposta.error = true;
                            resposta.msg = "Ocorreu um erro no cadastro";
                            console.log("erro: ", error);
                        }
                    }
                });
            }else{
                //se não existe no banco, adiciona novo
                Shows.adicionarAction(req.body, function(error, retorno){
                    let resposta = new Resposta();
                    if(error){
                        resposta.error = true;
                        resposta.msg = "Ocorreu um erro";
                        console.log("erro: ", error);
                    }else{
                        if(retorno.affectedRows > 0){
                            resposta.msg = "Cadastro adicionado com sucesso";
                        }else{
                            resposta.error = true;
                            resposta.msg = "Ocorreu um erro no cadastro";
                            console.log("erro: ", error);
                        }
                    }
                });
            }
        }
        console.log('resp: ', resposta);
        resp.json(resposta);
    });
});
//para seguir post
router.post("/acompanhar", upload.none(), function(req, resp, next){
    Shows.getInteractions(req.body, function(error, retorno){
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
            if(resposta.dados[0]){
                //se ja existir no banco, editar
                Shows.editarAcompanhamento(req.body, function(error, retorno){
                    let resposta = new Resposta();
                    if(error){
                        resposta.error = true;
                        resposta.msg = "Ocorreu um erro";
                        console.log("erro: ", error);
                    }else{
                        if(retorno.affectedRows > 0){
                            resposta.msg = "Cadastro alterado com sucesso";
                        }else{
                            resposta.error = true;
                            resposta.msg = "Ocorreu um erro no cadastro";
                            console.log("erro: ", error);
                        }
                    }
                });
            }else{
                //se não existir no banco, faz novo lançamento
                Shows.acompanhar(req.body, function(error, retorno){
                    let resposta = new Resposta();
                    if(error){
                        resposta.error = true;
                        resposta.msg = "Ocorreu um erro";
                        console.log("erro: ", error);
                    }else{
                        if(retorno.affectedRows > 0){
                            resposta.msg = "Cadastro adicionado com sucesso";
                        }else{
                            resposta.error = true;
                            resposta.msg = "Ocorreu um erro no cadastro";
                            console.log("erro: ", error);
                        }
                    }
                });
            }
        }
        console.log('resp: ', resposta);
        resp.json(resposta);
    });
    
});
//edita postagem
router.put("/", upload.none(), function(req, resp, next){
    Shows.editar(req.body, function(error, retorno){
        
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Cadastro alterado com sucesso";
            }else{
                resposta.error = true;
                resposta.msg = "Ocorreu um erro na alteração do cadastro";
                console.log("erro: ", error);
            }
        }
        console.log('resp: ', resposta);
        resp.json(resposta);
    });
});
//finaliza postagem
router.put("/finalizar/", upload.none(), function(req, resp, next){
    Shows.finalizar(req.body, function(error, retorno){
        
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Cadastro alterado com sucesso";
            }else{
                resposta.error = true;
                resposta.msg = "Ocorreu um erro na alteração do cadastro";
                console.log("erro: ", error);
            }
        }
        console.log('resp: ', resposta);
        resp.json(resposta);
    });
});
//deleta postagem
router.delete("/:id?", function(req, resp, next){
    Shows.deletar(req.params.id, function(error, retorno){
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Registro excluído com sucesso.";
            }else{
                resposta.error = true;
                resposta.msg = "Ocorreu um erro";
                console.log("erro: ", error);
            }
        }
        console.log('resp: ', resposta);
        resp.json(resposta);
    });
});
module.exports = router;