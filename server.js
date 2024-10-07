import express from 'express'

const app = express()
app.use(express.json())

const users = []
 
//Criar //
app.post('/usuarios', (req, res) => { 

    users.push(req.body)

    res.status(201).json(req.body)
})   

//Listar //
app.get('/usuarios', (req, res) => {
    res.status(200).json(users)
})

app.listen(3000)




// essa parte não configurada //
app.put('/usuarios', (req, res) => {  //Editar vários//

}) 


app.patch('/usuarios', (req, res) => {  //Editar um//

})  


app.delete('/usuarios', (req, res) => {  //deletar o usuario //

})  




/* 
    1- Tipo de Rota / Método HTTP
    2- Endereço 
*/