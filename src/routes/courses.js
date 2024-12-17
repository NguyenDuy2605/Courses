const express = require('express')
//var app = express()
const router = express.Router()
const newsController=require('../app/controllers/CoursesController')
//newsController.index()

router.post('/handle-form-actions', newsController.handleFormActions)

router.get('/:id/edit', newsController.edit)
router.put('/:id', newsController.update)
router.patch('/:id/restore', newsController.restore)
router.use('/create', newsController.create)
router.post('/store', newsController.store)
router.delete('/:id', newsController.delete)
router.delete('/:id/force', newsController.forceDelete)
router.use('/:slug', newsController.show)
router.use('/', newsController.index)

module.exports = router