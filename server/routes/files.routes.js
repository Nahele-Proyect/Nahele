const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const uploader = require('../configs/cloudinary.config')

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {   //upload an image for the user

    if (!req.file) {    //file existence verification
        res.json({
            message: 'Porfavor seleccione una imagen.',
            status: 'fail'
        })
        return
    }

    res.json({      //send img cloudinary path to the front
        secure_url: req.file.secure_url
    })

    User.findByIdAndUpdate(req.user._id, {  //User img update
        img: req.file.secure_url
    }, {
        new: true
    })
        .then(theUser => res.json(theUser))
        .catch(err => console.log(err))
})

router.post('/uploadImage', uploader.single('img'), (req, res, next) => {   //Pet upload
    if (!req.file) {    //file extistance verification
        res.json({ status: 'ko', message: "Debes de ubir una imagen" })
        return
    }

    res.json({ status: 'ok', img: req.file.secure_url })    //Send img cloudinary path to the front
})

module.exports = router