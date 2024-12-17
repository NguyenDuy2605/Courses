const newRouter=require('./courses')
const meRouter=require('./me')
function route(app){
    app.use('/courses', newRouter);
    app.use('/me', meRouter);
    app.get("/", (req, res) => {
        res.render("home");
      });
      // app.get("/news", (req, res) => {
      //  res.render("news");
      //});
      app.get("/search", (req, res) => {
        res.render("search");
      });
      app.post("/search", (req, res) => {
        console.log(req.body);
        res.send("")
      })
}

module.exports = route;