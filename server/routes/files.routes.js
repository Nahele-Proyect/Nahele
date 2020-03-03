const express = require('express')
const router = express.Router()
const User = require('../models/User.model')


const uploader = require('../configs/cloudinary.config')

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    const {
        imageUrl
    } = req.body

    if (!req.file) {
        res.json({
            message: 'Porfavor seleccione una imagen.',
            status: 'fail'
        })
        return
    }
    // if (imageUrl === req.user.img) {
    //     res.json({
    //         message: 'Ya estás usando esta imagen',
    //         status: 'fail'
    //     })
    //     return
    // }

    res.json({
        secure_url: req.file.secure_url
    })

    User.findByIdAndUpdate(req.user._id, {
            img: req.file.secure_url
        }, {
            new: true
        })
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})

module.exports = router