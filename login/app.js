const express = require('express');
//para pegar os dados
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host:'localhost',
    user:'mari',
    password:'mari2024',
    database:'tubarao'
})

db.connect((error)=>{
    if(error){
        console.log("Erro ao conectar com o banco de dados")
    } else{
        console.log("Conectado ao MySQL")
    }
})



//para pegar os dados
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/login.html')
})


app.post("/login", (req, res)=>{
    //req.body -> pega os dados
    const username = req.body.usuario;
    const password =  req.body.senha;

    console.log(username);
    console.log(password);
    db.query ('SELECT senha FROM usuario WHERE usuario = ?',[username], (error, results) =>{    
        if(results.length > 0){
            const senhaBD = results[0].senha
            if (password == senhaBD){
                res.sendFile(__dirname + '/paginit.html')
            } else{
                res.sendFile(__dirname + '/erro.html')
            }
        } else{
            res.sendFile(__dirname + '/erroUsuario.html')
            console.log('Usuario não cadastrado')
}}
    )}
    
)

app.listen(port, ()=> {
    console.log(`Servidor rodando no endereço: https://localhost:${port}`)
})
