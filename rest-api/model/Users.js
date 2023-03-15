const db = require('../banco/dbConexao');

module.exports = class Users{

    static getTodos(callback){
        return db.query("SELECT * FROM users", callback);
    }
    static findOne(dados, callback){
        return db.query("SELECT id_user, user_user FROM users where user_user = ? AND password_user = ?", [dados.user, dados.password], callback);
    }
    static adicionar(dados, callback){
        return db.query("INSERT INTO users (user_user, password_user) VALUES (?, ?)", [dados.user, dados.password], callback);
    }
    
}