const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const jwt = require('jsonwebtoken');
const Users = require('../model/Users');
const Resposta = require('../model/Resposta');
//get para buscar users
router.get("/", function(req, resp, next){
    Users.getTodos(function(error, retorno){
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

//post para adicionar novo user
router.post("/", upload.none(), function(req, resp, next){
    Users.adicionar(req.body, function(error, retorno){
        
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
//post para login, checa se user existe, retorna dados e token para login completo
router.post("/login", upload.none(), function(req, resp, next){
    Users.findOne(req.body, function(error, retorno){
        
        let resposta = new Resposta();
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro: ", error);
        }else{
            resposta.dados = retorno;
        }
        if(resposta.dados[0]){
            const user = resposta.dados[0];
            const token = jwt.sign(resposta.dados[0], "MySecretKey");
            resp.json({user, token});
        }
    });
});
module.exports = router;