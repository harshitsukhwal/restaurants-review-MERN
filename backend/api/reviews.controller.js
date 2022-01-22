import ReviewsDAO from "../dao/reviewsDAO.js"       //importing the reviews DAO files

export default class ReviewsController {            //controller class
  static async apiPostReview(req, res, next) {      //api post review method
    try {
      const restaurantId = req.body.restaurant_id  //getting restro id //getting information from body (i.e. JSON) Tip: before we got information fro the query parameter and now we are getting info from body
      const review = req.body.text                 //getting text from body
      const userInfo = {                           //for user info we get name and id
        name: req.body.name,
        user_id: req.body.user_id
      }
      const date = new Date()                       //getting review date
      console.log(restaurantId, userInfo, review, date)
      const ReviewResponse = await ReviewsDAO.addReview(        //sending below info we got to post to the add review
        restaurantId,
        userInfo,
        review,
        date,
      )
      res.json({ status: "success" })               //return success if worked or error if not
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateReview(req, res, next) {        //updating review
    try {
      const reviewId = req.body.review_id               //getting info from body
      const text = req.body.text
      const date = new Date()

      const reviewResponse = await ReviewsDAO.updateReview(     //getting user info
        reviewId,
        req.body.user_id,
        text,
        date,
      )

      var { error } = reviewResponse        //error check
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {        // modified count == 0 means review isnt updated and it will throw error
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.json({ status: "success" })               
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteReview(req, res, next) {        //deleting the review; it will have a query parameter instead of the body
    try {
      const reviewId = req.query.id         //query parameter in url              
      const userId = req.body.user_id       //check if the user id is as the review 
      console.log(reviewId)
      const reviewResponse = await ReviewsDAO.deleteReview(     //calling the delete review
        reviewId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}