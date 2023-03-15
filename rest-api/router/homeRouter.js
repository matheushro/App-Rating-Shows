const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Shows = require('../model/Shows');
const Resposta = require('../model/Resposta');
//busca todas as postagens
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
//busca postagem especifica
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
//adiciona nova postagem
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
        resp.json(resposta);
    });
});
module.exports = router;