const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

//dividindo servidor para suportar protocolos HTTP  e WebSocket
const server = require('http').Server(app)
const io = require('socket.io')(server)


//Banco de dados
mongoose.connect('mongodb+srv://semana:semana@cluster0-ygkpk.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

//enviando informações em tempo real para todas as rotas (Front-end)
app.use((req, res, next)=>{
    req.io = io
    next()
})

//usando o cors para permitir que todas as URls de todos os servidores possam acessar o back-end
app.use(cors())

//acessando arquivos estaticos da aplicação no caso os Uploads
app.use('/files', express.static(path.resolve(__dirname, "..","uploads", "resized")))

//rotas da aplicação
app.use(require('./routes'))

server.listen(3333)



