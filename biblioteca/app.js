const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'mari',
    password: 'mari2024',
    database: 'biblioteca'
})

db.connect((error)=> {
    if (error){
        console.log("Erro ao conectar com o banco de dados")
    } else{
        console.log("Conectando ao MySQL")
    }
})

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/cadastro', (req, res)=>{
    res.sendFile(__dirname + '/cadastro.html')
    })

app.post("/login", (req,res)=>{
    const username = req.body.nome
    const password = req.body.senha
    const email = req.body.email

    db.query('SELECT senha from usuario where nome = ? and email = ?', [username, email], (error, results)=>{
        if (results.length > 0){
            const passwordbd = results[0].senha
            console.log(passwordbd)
            if(password == passwordbd){
                res.sendFile(__dirname + '/paginit.html')
            }else{
                res.sendFile(__dirname + '/erro.html')
            }
        } else {
            console.log(error,'Usuario não cadastrado')
            res.sendFile(__dirname + '/erroUsuario.html')
        }
    })

})

    app.post("/cadastrar", (req,res)=>{
        const newusername = req.body.Novousuario
        const newpassword = req.body.Novasenha
        const email = req.body.email
        const rua = req.body.rua
        const numero = req.body.numero
        const cidade = req.body.cidade
        const bairro = req.body.bairro
        const estado = req.body.estado
        const cep = req.body.cep
        const confirmpassword = req.body.Confirmpassword

        if (newpassword === confirmpassword){

            db.query(' INSERT INTO endereco (rua, numero, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?)', [rua, numero, cidade, bairro, estado, cep], (error, results) => {

                if (error){
                    console.log('erro ao cadastrar o endereço', error)
                } else {
    db.query(' INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', [newusername, email, newpassword], (error, results) => {

        if (error){
            console.log('erro ao cadastrar', error)
        } else { 
            console.log('cadastrado com sucesso', results)
            res.sendFile(__dirname + '/sucesso.html')
        }
    })
} }
)
}else{
    console.log('senhas não coincidem')
}
    })

    app.post('/cadastro', (req, res)=>{
        res.sendFile(__dirname + '/cadastro.html')
        })




app.listen(port, ()=> {
    console.log(`Servidor rodando no endereço: https://localhost:${port}`)
})