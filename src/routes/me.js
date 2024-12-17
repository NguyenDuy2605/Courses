const express = require('express')
//var app = express()
const router = express.Router()
const meController=require('../app/controllers/MeController')
//newsController.index()
router.use('/stored/courses', meController.storedCourse)
router.use('/trash/courses', meController.trashCourse)


module.exports = router