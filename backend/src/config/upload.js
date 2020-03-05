const multer = require('multer')
const path = require('path')
// pegando a imagem que o usuario fez upload e salvando na pasta de upload com o nome orginal do arquivo.
module.exports = {
    storage: new multer.diskStorage({
        
        destination: path.resolve(__dirname, '..','..','uploads'),
        filename: function(req, file, cb){
            cb(null, file.originalname)
        }
    })
}


