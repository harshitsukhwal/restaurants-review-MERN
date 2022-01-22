import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()   //loading env
const MongoClient = mongodb.MongoClient //accessing mongoclinet from mongo db

const port = process.env.PORT || 8000  //setting the port no. from .env file

MongoClient.connect(                  // connecting the database
  process.env.RESTREVIEWS_DB_URI,     // uri for address
  {
    maxPoolSize: 50,                  //only 50 people can connect at a time
    wtimeoutMS: 2500,                 // at 2500 minisecs the request will time out
    useNewUrlParser: true }           //mongo db requirements for flag
  )
  .catch(err => {                     // in case of error
    console.error(err.stack)
    process.exit(1)                   //exiting the process
  })
 
  .then(async client => {             //
    await RestaurantsDAO.injectDB(client)  // passing the file to the client
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {          //how we start our webserver after the database is connected
      console.log(`listening on port ${port}`)
    })
  })