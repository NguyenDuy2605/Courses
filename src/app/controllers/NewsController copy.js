const CourseSchema = require('../models/Course')
class NewsController {
    //[GET] /news
    async index(req, res, next) {
        try {
            const courses = await CourseSchema.find({}).lean();
            //res.json(courses);
            res.render('news',{coursesss: courses});
        } catch (err) {
            //res.status(400).json({ error: 'ERROR!!!' });
            next(err);
        }
    }
}
module.exports = new NewsController