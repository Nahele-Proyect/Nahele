const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

const axiosApp = axios.create({
    baseURL: 'https://petshelter.miwuki.com'
})

router.get('/', (req, res) => {
    const names = []
    const imgs = []
    const links = []
    const species = []
    const urgencys = []
    const flags = []
    const citys = []

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

            $('.info span').each((idx, city) => citys.push(city.children[0].data))

            return names.map((elm, idx) => {
                return {
                    name: elm.trim(),
                    img: imgs[idx].trim(),
                    flag: flags[idx].trim(),
                    specie: species[idx].trim(),
                    urgency: urgencys[idx].trim(),
                    link: links[idx].trim(),
                    city: citys[idx].trim()
                }
            })

        }).then(pets => res.json({
            status: 'ok',
            pets
        }))
        .catch(err => console.log(err))
})

router.get('/details/:code', (req, res) => {
    const pet = {
        personality: []
    }

    axiosApp.get('/' + req.params.code)
        .then(response => {
            const $ = cheerio.load(response.data)

            $('.m-portlet__head img').each((idx, image) => !image.attribs.src.includes('.svg') && (pet.img = image.attribs.src.trim()))

            $('#nombre').each((idx, name) => pet.name = name.children[0].data.trim())

            $('.m-list-timeline__time').each((idx, data) => {

                if (idx > 5) return
                data.children[0] && idx === 0 && (pet.specie = data.children[0].data.trim())
                data.children[0] && idx === 1 && (pet.born = data.children[0].data.trim())
                data.children[0] && idx === 2 && (pet.gender = data.children[0].data.trim())
                data.children[0] && idx === 3 && (pet.size = data.children[0].data.trim())
                data.children[0] && idx === 4 && (pet.weigth = data.children[0].data.trim())
                data.children[0] && idx === 5 && (pet.activity = data.children[0].data.trim())
            })

            $('.m-badge--wide').each((idx, data) => {

                data.children[0] && idx === 1 && (pet.vaccinated = data.children[0].data.trim())
                data.children[0] && idx === 2 && (pet.dewormed = data.children[0].data.trim())
                data.children[0] && idx === 3 && (pet.healthy = data.children[0].data.trim())
                data.children[0] && idx === 4 && (pet.sterilized = data.children[0].data.trim())
                data.children[0] && idx === 5 && (pet.identified = data.children[0].data.trim())
                data.children[0] && idx === 6 && (pet.microchip = data.children[0].data.trim())
                data.children[0] && idx > 6 && pet.personality.push(data.children[0].data.trim())
            })

            $('.m-badge').each((idx, data) => {
                if (idx > 0) return
                data.children[0] && idx === 0 && (pet.urgency = data.children[0].data.trim())
            })

            $('.m-portlet__body p').each((idx, data) => {
                if (idx > 1) return
                data.children[0] && (pet.comment = data.children[0].data.trim())
            })

            $('.ciudad').each((idx, city) => pet.city = city.children[0].data.trim())

            $('img').each((idx, image) => {

                if (image.attribs.src.includes('.svg') &&
                    !image.attribs.src.includes('fav')
                ) {
                    pet.flag = image.attribs.src.trim()
                    return
                }
            })

        }).then(() => res.json({
            status: 'ok',
            pet
        }))
        .catch(err => console.log(err))
})

module.exports = router