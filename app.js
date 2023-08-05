const express  = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config({ path:'.env' });
require("./config/db")
const port  = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(require('./utils/responseHandler'));

const routes = require("./routes")
app.use(routes)
// app.get('/', (req, res) => {
//     res.render('index');
//   });

  app.listen( port, ()=>{
    console.log(`App is listening port at ${port}`)
  })