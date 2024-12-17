const meCourseSchema = require('../models/Course')
class MeController {   
    async storedCourse(req, res, next) {
        let courseQuery =meCourseSchema.find({})
        if (req.query.hasOwnProperty('_sort')){
            courseQuery=courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        try {
            const courses = await courseQuery.lean();
            //res.json(courses);
            res.render('me/storedCourse',{courses: courses});
        } catch (err) {
            //res.status(400).json({ error: 'ERROR!!!' });
            next(err);
        }
        //mecourse=meCourseSchema.find({}).lean()
        //.then(course => {res.render('me/storedCourse'), { courses: course}})
        //.catch(next)
    }
    async trashCourse(req, res, next) {
        try {
            const courses = await meCourseSchema.findWithDeleted({deleted: true}).lean();
            //res.json(courses);
            res.render('me/trashCourse',{courses: courses});
        } catch (err) {
            //res.status(400).json({ error: 'ERROR!!!' });
            next(err);
        }
    }
}
module.exports = new MeController