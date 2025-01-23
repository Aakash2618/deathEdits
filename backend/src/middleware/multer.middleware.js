const multer=require("multer")
const path=require("path")
const crypto=require("crypto")

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath=path.join(__dirname,"../../public.temp")
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12,function(err,bytes){
        let fileName=bytes.toString('hex') + path.extname(file.originalname);
        cb(null, fileName)
      })
    }
  })
  const upload = multer({ storage: storage })
module.exports = {upload}
