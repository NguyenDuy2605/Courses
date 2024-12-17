const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const  mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const CourseSchema = new Schema({
    name: { type: String, maxlength: 255 },
    desc: { type: String },
    image: { type: String },
    videoId: { type: String},
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
    //toJSON: { virtuals: true }
});

mongoose.plugin(slug)
CourseSchema.plugin(mongooseDelete,  { 
    deletedAt : true,
    overrideMethods: 'all', });

module.exports = mongoose.model('Course', CourseSchema, 'Courses');