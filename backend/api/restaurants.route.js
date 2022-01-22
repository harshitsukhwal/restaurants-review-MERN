import express from "express"   //importing express
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router() //accessing router

router.route("/").get(RestaurantsCtrl.apiGetRestaurants) //only one demonstration route, if we go to rout url it will respond with hello world

router                                          //setting route for reviews
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)            //posting a review
    .put(ReviewsCtrl.apiUpdateReview)          //updating/edit
    .delete(ReviewsCtrl.apiDeleteReview)        //deleting

export default router  //