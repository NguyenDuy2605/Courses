const { json } = require('express');
const CourseSchema = require('../models/Course')
const PAGE_SIZE=2
class NewsController {
    async index(req, res, next) {
        try {
          // Kiểm tra giá trị trang từ query string, mặc định là null nếu không có
          let page = req.query.p ? parseInt(req.query.p) : null;
    
          // Nếu `page` không hợp lệ (NaN hoặc nhỏ hơn 1), đặt về null
          if (page && page < 1) page = null;
    
          let courses;
          let pagination = {};
    
          if (page) {
            // Tính số lượng bỏ qua khi có phân trang
            const soLuongBoQua = (page - 1) * PAGE_SIZE;
    
            // Lấy các khóa học với skip và limit để phân trang
            courses = await CourseSchema.find({})
              .lean()
              .skip(soLuongBoQua)
              .limit(PAGE_SIZE);
    
            // Đếm tổng số khóa học để tính toán tổng số trang
            const count = await CourseSchema.countDocuments();
    
            // Tính tổng số trang
            const pageCount = Math.ceil(count / PAGE_SIZE);
    
            // Cấu hình phân trang khi có page
            pagination = {
              page: page,
              pageCount: pageCount,
            };
          } else {
            // Nếu không có page, lấy toàn bộ khóa học mà không áp dụng phân trang
            courses = await CourseSchema.find({}).lean();
          }
    
          // Render trang với danh sách khóa học và pagination nếu có
          res.render('courses', {
            coursesss: courses,
            pagination: pagination,
          });
        } catch (err) {
          req.flash(
            'error_msg',
            'Something happened while trying to process this request. Please try again...'
          );
          next(err);
        }
      }
    
    //[GET] /news
    /*async index(req, res, next) {
        var page = req.query.p
        if (page){
            page=parseInt(page)
            var soLuongBoQua=(page-1)*PAGE_SIZE
            CourseSchema.find({}).lean()
            .skip(soLuongBoQua)
            .limit(PAGE_SIZE)
            .exec(function (err, courses) {
                CourseSchema.countDocuments().exec(function (err, count) {
                    if (err) {
                        req.flash('error_msg', 'Something happened while trying to process this request. Please try again...')
                        return res.render('courses',{coursesss: courses});
                    }
    
                    res.render('courses', {
                        
                        pagination: {
                            page: req.query.p || 1,
                            pageCount: Math.ceil(count/PAGE_SIZE)
                        },
                        coursesss: courses
                        
                    })
                })
            })
            /*.then(courses=>res.json(courses))
            .catch(err =>{
                res.status(400).json({ error: 'ERROR!!!' });
                //next(err);
            })//ngắt ở đây
        }else{
        try {
            const courses = await CourseSchema.find({}).lean();
            //res.json(courses);
            /*const page=req.query.page
            const limit=req.query.limit
            const startIndex=(page-1)*limit
            //const endIndex=startIndex+limit
            const endIndex=page*limit
            const resultCourses=courses.slice(startIndex, endIndex)
            res.json(courses);//ngắt ở đây
            res.render('courses',{coursesss: courses});
        } catch (err) {
            //res.status(400).json({ error: 'ERROR!!!' });
            next(err);
        }
    }
    }*/
    show(req, res, next) {
        CourseSchema.findOne({ slug: req.params.slug }).lean()
        .then(course=>res.render('course/show', {course}))
        .catch(next);
    }
    create(req, res, next) {
        res.render('course/create');
    }
    //POST /courses/store
    store(req, res, next) {
        //res.jason(req.body)
        const formData=req.body
        formData.image=`http://img.youtube.com/vi/${req.body.videoId}/default.jpg`
        const course = new CourseSchema(formData);
        course.save()
        res.redirect("/me/stored/courses")
       //.then(course=>res.redirect(`/courses/${course.slug}`))
    }
    edit(req, res, next) {
        CourseSchema.findById(req.params.id).lean()
       .then(course=>res.render('course/edit', {course}))
       .catch(next);
       //res.render('course/edit')
    }
    update(req, res, next) {
        CourseSchema.updateOne({ _id: req.params.id}, req.body)
            .then(()=>res.redirect("/me/stored/courses"))
            .catch(next);
    }
    delete(req, res, next) {
        CourseSchema.delete({ _id: req.params.id})
            .then(()=>res.redirect("back"))
            .catch(next);
    }
    forceDelete(req, res, next) {
        //CourseSchema.findByIdAndDelete(req.params.id)
            //.then(()=>res.redirect("/me/trash/courses"))
            //.catch(next);
        CourseSchema.deleteOne({ _id: req.params.id})
            .then(()=>res.redirect("back"))
            .catch(next);
    }
    restore(req, res, next) {
        //CourseSchema.findByIdAndUpdate(req.params.id, { isDeleted: false }, {new: true})
       //.then(course=>res.redirect("/me/trash/courses"))
       CourseSchema.restore({ _id: req.params.id})
            .then(()=>res.redirect("back"))
            .catch(next);
    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                CourseSchema.delete({ _id: {$in: req.body.courseIds}})
                    .then(()=>res.redirect("back"))
                    .catch(next);
                
                break;
        
            default:
                res.json({ message: "Action is invalid"})
        }
    }
}
module.exports = new NewsController