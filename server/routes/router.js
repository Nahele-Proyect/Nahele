const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send({
    response: "El servidor está online."
  }).status(200)
})

module.exports = router