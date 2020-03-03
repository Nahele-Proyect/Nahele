const express = require('express')
const router = express.Router()

const uploader = require('../configs/cloudinary.config')

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {

    if (!req.file) {
        res.json({
            message: 'Porfavor seleccione una imagen.',
            status: 'fail'
        })
        return
    }

    res.json({
        secure_url: req.file.secure_url
    })
})

module.exports = router