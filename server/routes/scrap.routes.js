const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

const axiosApp = axios.create({ baseURL: 'https://petshelter.miwuki.com' })

router.get('/', (req, res) => {
    const names = []
    const imgs = []
    const links = []
    const species = []
    const urgencys = []
    const flags = []

    axiosApp.get('/')
        .then(response => {
            const $ = cheerio.load(response.data)


            $('img').each((idx, image) => {

                if (image.attribs.src.includes('.svg') &&
                    !image.attribs.src.includes('fav') &&
                    !image.attribs.src.includes('invisible')
                ) flags.push(image.attribs.src)

                if (
                    image.attribs.src !== undefined &&
                    !image.attribs.src.includes('.svg') &&
                    !image.attribs.src.includes('.png')
                ) imgs.push(image.attribs.src)
            })

            $('.m-animal__nombre').each((idx, name) => names.push(name.children[0].data))

            $('.m-portlet a').each((idx, link) => links.push('/' + link.attribs.href))

            $('.m-animal__especie').each((idx, specie) => species.push(specie.children[0].data))

            $('.m-portlet__foot').each((idx, urgency) => urgencys.push(urgency.children[0].data))

            return names.map((elm, idx) => {
                return {
                    name: elm,
                    img: imgs[idx],
                    flag: flags[idx],
                    specie: species[idx],
                    urgency: urgencys[idx],
                    link: links[idx]
                }
            })

        }).then(pets => res.json({ status: 'ok', pets }))
        .catch(err => console.log(err))
})

router.get('/details/:code', (req, res) => {
    const pet = { personality: [] }

    axiosApp.get('/' + req.params.code)
        .then(response => {
            const $ = cheerio.load(response.data)

            $('.m-portlet__head img').each((idx, image) => !image.attribs.src.includes('.svg') && (pet.img = image.attribs.src))

            $('#nombre').each((idx, name) => pet.name = name.children[0].data)

            $('.m-list-timeline__time').each((idx, data) => {

                if (idx > 5) return
                idx === 0 && (pet.specie = data.children[0].data)
                idx === 1 && (pet.born = data.children[0].data)
                idx === 2 && (pet.gender = data.children[0].data)
                idx === 3 && (pet.size = data.children[0].data)
                idx === 4 && (pet.weigth = data.children[0].data)
                idx === 5 && (pet.activity = data.children[0].data)
            })

            $('.m-badge--miwuki').each((idx, data) => {

                idx === 0 && (pet.vaccinated = data.children[0].data)
                idx === 1 && (pet.dewormed = data.children[0].data)
                idx === 2 && (pet.healthy = data.children[0].data)
                idx === 3 && (pet.sterilized = data.children[0].data)
                idx === 4 && (pet.identified = data.children[0].data)
                idx === 5 && (pet.microchip = data.children[0].data)
                idx > 5 && pet.personality.push(data.children[0].data)
            })

            $('.m-badge').each((idx, data) => {
                if (idx > 0) return
                idx === 0 && (pet.urgency = data.children[0].data)
            })

            $('.m-portlet__body p').each((idx, data) => {
                if (idx > 1) return
                pet.comment = data.children[0].data
            })



        }).then(() => res.json({ status: 'ok', pet }))
        .catch(err => console.log(err))
})

module.exports = router