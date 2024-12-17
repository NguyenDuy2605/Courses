const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3001;
const path = require("path");
const handlebars = require("express-handlebars");
const db= require("./config/db");
const { Query } = require("mongoose");
const SortMiddleware= require('./app/middlewares/SortMiddleware')
const routes = require("./routes")
const methodOverride = require('method-override')
const paginate = require('express-handlebars-paginate');


app.engine("handlebars", handlebars.engine({ defaultLayout: "main",
  helpers: {
    sum:(a,b)=>a+b,
    sortable: (field, sort)=>{
      const sortType = field===sort.column ? sort.type : 'default';
      const icons ={
          default: 'oi oi-elevator',
          asc:'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending'
      }
      const types={
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }
      const icon= icons[sortType]
      const type= types[sortType]
      return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                  </a>`
    },
    paginate: paginate.createPagination,
    range: function (start, end) {
      const array = [];
      for (let i = start; i <= end; i++) {
        array.push(i);
      }
      return array;
    },
    add: function (a, b) { return a + b; },
    subtract: function (a, b) { return a - b; },
    eq: function (a, b) { return a === b; },
    lt: function (a, b) { return a < b; },
    gt: function (a, b) { return a > b; }
  }
 }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "resource/views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'))
//app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(SortMiddleware);
db.connect();
routes(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
