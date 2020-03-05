const Post =  require('../models/Post')

module.exports = {
    async store(req, res){
        const post = await Post.findById(req.params.id)
        //adicionando mais 1 Like ao post
        post.likes +=1;
        //salvando a quantidade de likes
        await post.save()

        req.io.emit('like', post)

        return res.json(post)
    }
  
}
