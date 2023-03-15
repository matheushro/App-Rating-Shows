const db = require('../banco/dbConexao');

module.exports = class Shows{
    //busca todas as postagens com contador de likes, dislikes e seguidores
    static getTodos(callback){
        return db.query("SELECT SS.*, (SELECT COUNT(interagir) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE interagir = 1 AND I.id_show = SS.id_show) AS likes, (SELECT COUNT(interagir) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE interagir = 2 AND I.id_show = SS.id_show) AS dislikes, (SELECT COUNT(seguindo) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE seguindo IS NOT NULL AND I.id_show = SS.id_show) AS seguidores FROM shows SS", callback);
    }
    //buscas postagens que user segue
    static getTodosSeguindo(id, callback){
        return db.query("SELECT SS.*, (SELECT COUNT(interagir) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE interagir = 1 AND I.id_show = SS.id_show) AS likes, (SELECT COUNT(interagir) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE interagir = 2 AND I.id_show = SS.id_show) AS dislikes, (SELECT COUNT(seguindo) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE seguindo IS NOT NULL AND I.id_show = SS.id_show) AS seguidores FROM shows SS INNER JOIN interaction I ON I.id_show = SS.id_show WHERE I.id_user = ?", [id], callback);
    }
    //busca interações da postagem e do usuario 
    static getInteractions(dados, callback){
        return db.query("select * from interaction WHERE id_show = ? AND id_user = ?", [dados.id_show, dados.id_user], callback);
    }
    //busca postagem por id
    static getId(id, callback){
        return db.query("SELECT SS.*, (SELECT COUNT(interagir) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE interagir = 1 AND I.id_show = SS.id_show) AS likes, (SELECT COUNT(interagir) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE interagir = 2 AND I.id_show = SS.id_show) AS dislikes, (SELECT COUNT(seguindo) FROM interaction I INNER JOIN shows S ON S.id_show = I.id_show WHERE interagir = 2 AND I.id_show = SS.id_show) AS seguidores FROM shows SS where SS.id_user = ?", [id], callback);
    }
    //add nova postagem
    static adicionar(dados, callback){
        return db.query("INSERT INTO shows (desc_show, id_user) VALUES (?, ?)", [dados.descricao, dados.id_user], callback);
    }
    //lança nova interação
    static adicionarAction(dados, callback){
        return db.query("INSERT INTO interaction (id_show, id_user, interagir) VALUES (?, ?, ?)", [dados.id_show, dados.id_user, dados.interaction], callback);
    }
    //edita interação
    static editarAction(dados, callback){
        return db.query("UPDATE interaction SET interagir = ? WHERE id_show = ? && id_user = ?", [dados.interaction, dados.id_show, dados.id_user], callback);
    }
    //edita postagem
    static editar(dados, callback){
        return db.query("UPDATE shows SET desc_show = ? WHERE id_show = ?", [dados.descricao, dados.id], callback);
    }
    //finaliza postagem
    static finalizar(dados, callback){
        return db.query("UPDATE shows SET concluded = 1 WHERE id_show = ?", [dados.id_show], callback);
    }
    //seguir postagem
    static acompanhar(dados, callback){
        return db.query("INSERT INTO interaction (id_show, id_user, seguindo) VALUES (?, ?, ?)", [dados.id_show, dados.id_user, 1], callback);
    }
    //editar postagem para seguir (apenas chamado caso já exista no banco)
    static editarAcompanhamento(dados, callback){
        return db.query("UPDATE interaction SET seguindo = 1 WHERE id_show = ? && id_user = ?", [dados.id_show, dados.id_user], callback);
    }
    //deleta post
    static deletar(id, callback){
        return db.query("DELETE FROM shows WHERE id_show = ?", [id], callback);
    }
}