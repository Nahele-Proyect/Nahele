require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose')
const Pets = require('../models/Pet.model')

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const petsLinks =
    ['/adopta-a-femme-en-murcia-64124',
        '/adopta-a-yeico-en-pontevedra-152807',
        '/adopta-a-frida-en-sevilla-125531',
        '/adopta-a-primi-en-madrid-3659',
        '/adopta-a-zarpas-en-ciudad-real-25352',
        '/adopta-a-bagueera-en-cordoba-148532',
        '/adopta-a-renton-en-valencia-128333',
        '/adopta-a-rudy-en-castellon-63173',
        '/adopta-a-lucho-en-ciudad-de-mexico-157424',
        '/adopta-a-yoga-en-madrid-18329',
        '/adopta-a-manjula-y-sus-bebes-en-sevilla-149621',
        '/adopta-a-papi-en-madrid-59726',
        '/adopta-a-sinnombre-en-toledo-118637',
        '/adopta-a-rafaello-en-barcelona-84284',
        '/adopta-a-laika-en-madrid-152990',
        '/adopta-a-chico-en-sevilla-57371',
        '/adopta-a-thor-en-pontevedra-133907',
        '/adopta-a-hambre-en-yucatan-31142',
        '/adopta-a-oso-en-sevilla-151202',
        '/adopta-a-aticus-en-madrid-114890',
        '/adopta-a-nina-en-toledo-93476',
        '/adopta-a-atila-en-ciudad-real-152600',
        '/adopta-a-toulouse-en-valencia-57992',
        '/adopta-a-izar-en-guipuzcoa-24143',
        '/adopta-a-pelusa-en-santiago-cl-157736',
        '/adopta-a-globo-en-buenos-aires-50555',
        '/adopta-a-tyson-p-en-madrid-67106',
        '/adopta-a-lalo-en-madrid-15965',
        '/adopta-a-mishina-vimera-en-barcelona-2528',
        '/adopta-a-barrio-en-madrid-9203',
        '/adopta-a-rocco-en-valencia-26882',
        '/adopta-a-sunny-en-ciudad-de-mexico-150758',
        '/adopta-a-balto-en-valencia-45281',
        '/adopta-a-venus-en-cordoba-135626',
        '/adopta-a-trebol-en-toledo-139955',
        '/adopta-a-flaquita-en-ciudad-de-mexico-62879',
        '/adopta-a-carlittos-en-madrid-118940',
        '/adopta-a-iris-en-tarragona-73691',
        '/adopta-a-mia-en-sevilla-55160',
        '/adopta-a-anita-en-madrid-66836',
        '/adopta-a-coqui-en-san-luis-potosi-39065',
        '/adopta-a-la-chola-en-buenos-aires-51116',
        '/adopta-a-jack-en-madrid-29084',
        '/adopta-a-ara-en-jaen-6248',
        '/adopta-a-miel-en-madrid-19838',
        '/adopta-a-matias-en-barcelona-145694',
        '/adopta-a-atlas-en-madrid-47003',
        '/adopta-a-pit-en-barcelona-36689',
        '/adopta-a-oggy-en-murcia-99563',
        '/adopta-a-toffee-en-madrid-92171',
        '/adopta-a-sigrid-en-huelva-136625',
        '/adopta-a-arrow-en-valencia-150605',
        '/adopta-a-bosco-en-madrid-19055',
        '/adopta-a-cloe-en-granada-76838',
        '/adopta-a-kino-en-valencia-1721',
        '/adopta-a-tico-en-madrid-120599',
        '/adopta-a-roi-en-lleida-106256',
        '/adopta-a-thor-en-badajoz-5009',
        '/adopta-a-mahou-en-cantabria-107129',
        '/adopta-a-susto-en-cordoba-4070']


petsLinks.forEach(elm => {
    axios.get('http://localhost:5000/api/scrap/details' + elm)
        .then(response => response.data.pet)
        .then(data => Pets.create(data))
        .then(created => console.log(created.name))
        .catch(err => err)
})
mongoose.connection.close()