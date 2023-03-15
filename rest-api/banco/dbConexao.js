//config para acessar banco de dados
const mysql = require('mysql2');
let conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_filmes'
});

module.exports = conexao;
