const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

const axiosApp = axios.create({ baseURL: 'https://petshelter.miwuki.com' })

router.get('/', (req, res) => {
    const pets = []

    axiosApp.get('/')
        .then(response => {
            const $ = cheerio.load(response.data)

            $('img').each((idx, image) => {

                if (
                    image.attribs.src !== undefined &&
                    !image.attribs.src.includes('.svg') &&
                    !image.attribs.src.includes('.png')
                ) pets.push({ img: image.attribs.src })
            })

            $('.m-animal__nombre').each((idx, name) => pets[idx].name = name.children[0].data)

            $('.m-portlet a').each((idx, link) => pets[idx].link = '/' + link.attribs.href)

            $('.m-animal__especie').each((idx, specie) => pets[idx].specie = specie.children[0].data)

        }).then(() => res.json({ status: 'ok', pets }))
        .catch(err => console.log(err))
})

router.get('/details/:code', (req, res) => {
    const pet = {}

    axiosApp.get('/' + req.params.code)
        .then(response => {
            const $ = cheerio.load(response.data)

            $('.m-portlet__head img').each((idx, image) => !image.attribs.src.includes('.svg') && (pet.img = image.attribs.src))

            $('#nombre').each((idx, name) => pet.name = name.children[0].data)


        }).then(() => res.json({ status: 'ok', pet }))
        .catch(err => console.log(err))
})

module.exports = router