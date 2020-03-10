/*<--These routes get scraped info from petshelter-->*/

//Express imports
const express = require('express')
const router = express.Router()
//axios import
const axios = require('axios')
//Cheerio import
const cheerio = require('cheerio')

//Axiosapp creation with a base url (for the scraping)
const axiosApp = axios.create({
    baseURL: 'https://petshelter.miwuki.com'
})

router.get('/', (req, res) => { //Gets main page info
    //All the filds tha will be scraped (prevents errors)
    const names = []
    const imgs = []
    const links = []
    const species = []
    const urgencys = []
    const flags = []
    const citys = []

    axiosApp.get('/')   //Get the page
        .then(response => {
            const $ = cheerio.load(response.data) //Load the html info

            $('img').each((idx, image) => { //img scraping

                //get the flag image
                if (image.attribs.src.includes('.svg') &&
                    !image.attribs.src.includes('fav') &&
                    !image.attribs.src.includes('invisible')
                ) flags.push(image.attribs.src)

                //get the pet image
                if (image.attribs.src !== undefined &&
                    !image.attribs.src.includes('.svg') &&
                    !image.attribs.src.includes('.png')
                ) imgs.push(image.attribs.src)
            })

            $('.m-animal__nombre').each((idx, name) => names.push(name.children[0].data))   //gets the name

            $('.m-portlet a').each((idx, link) => links.push('/' + link.attribs.href))      //gets the link

            $('.m-animal__especie').each((idx, specie) => species.push(specie.children[0].data))//gets the specie

            $('.m-portlet__foot').each((idx, urgency) => urgencys.push(urgency.children[0].data))//gets the urgency

            $('.info span').each((idx, city) => citys.push(city.children[0].data))      //gets the city

            return names.map((elm, idx) => { //returns an array with all the scraped pets
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

        }).then(pets => res.json({ status: 'ok', pets }))   //send the scraped pets array to the front
        .catch(err => console.log(err))
})

router.get('/details/:code', (req, res) => {    //gets the animal details (fron the url already scraped)
    const pet = { personality: [] }

    axiosApp.get('/' + req.params.code) //get the page
        .then(response => {
            const $ = cheerio.load(response.data)   //load the html

            $('.m-portlet__head img').each((idx, image) => !image.attribs.src.includes('.svg') && (pet.img = image.attribs.src.trim())) //get the img

            $('#nombre').each((idx, name) => pet.name = name.children[0].data.trim()) //get the name

            $('.m-list-timeline__time').each((idx, data) => {

                if (idx > 5) return
                data.children[0] && idx === 0 && (pet.specie = data.children[0].data.trim())
                data.children[0] && idx === 1 && (pet.born = new Date(data.children[0].data.trim()))
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

        }).then(() => res.json({ status: 'ok', pet })) //returns the scraped details info to the front
        .catch(err => console.log(err))
})

module.exports = router