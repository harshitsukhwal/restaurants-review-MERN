import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"  //accessing the file from api directory
import bodyParser from "body-parser"

const app =express() //calling the express app (used to make server)

app.use(cors())  // used for cors module
app.use(express.json())  //server can accept json as the body of the request
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())      //parse application/json
app.use("/api/v1/restaurants",restaurants)  //url client will use, it will be localost, every route is starting with this and then into the route we will add other routes
app.use("*", (req, res) => res.status(404).json({error: "not found "}))  //error in case of any undefined address

export default app   //exporting app as a module