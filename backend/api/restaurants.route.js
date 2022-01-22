import express from "express"   //importing express
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router() //accessing router

router.route("/").get(RestaurantsCtrl.apiGetRestaurants) //only one demonstration route, if we go to rout url it will respond with hello world
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)            //  list of specific restro with sprecific id also get all reviews associated with specific restro
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)      //  route for returning a list of cuisine coz on frontend we will select for cuisines from a drop down menu    


router                                          //setting route for reviews
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)            //posting a review
    .put(ReviewsCtrl.apiUpdateReview)          //updating/edit
    .delete(ReviewsCtrl.apiDeleteReview)        //deleting

export default router  //