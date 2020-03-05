const Post =  require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
module.exports = {
    async index(req, res){
        //exibindo posts mais recentes
        const  posts = await Post.find().sort('-createdAt')
        return res.json(posts)
    },

    async store(req,res){
        const { author,place, description, hashtags } = req.body
        const { filename: image} = req.file
        
        const [name] = image.split('.')
        const fileName = `${name}.jpg` // convertendo imagem para JPG

        await sharp(req.file.path)
            .resize(500) // redimenciona a imagem em ate 500px
            .jpeg({quality:70}) // salva como Jpeg, com qualidade de 70%
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)// salvando a imagem configurada na pasta resized
            )
    fs.unlinkSync(req.file.path)// apagando imagem original da pasta
        

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            fileName,
        })
        req.io.emit('post', post)

        return res.json(post)
    }

}