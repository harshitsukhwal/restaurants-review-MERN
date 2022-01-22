import mongodb from "mongodb" 
const ObjectId = mongodb.ObjectId  //string to mongo db object id

let reviews         //variable review

export default class ReviewsDAO {       //class reviewsDAO
  static async injectDB(conn) {         //accessing the database method
    if (reviews) {                      //if reviews already exists
      return                            //return review
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")     //accessing the review collection in the database ; if it doesnt already exists mongo db will automatically create a new collection 
    } catch (e) {                                                                   //error catched
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(restaurantId, user, review, date) {        //adding the review
    try {
        console.log(restaurantId, user, review, date)
      const reviewDoc = { name: user.name,                          //takes  below parameters
          user_id: user.user_id,
          date: date,
          text: review,
          restaurant_id: ObjectId(restaurantId), }                  //creating a mongo db id from restros request id

      return await reviews.insertOne(reviewDoc)                     //inserting the review in the database        
    } catch (e) {
      console.error(`Unable to post review: ${e}`)                  //in case of error
      return { error: e }
    }
  }

  static async updateReview(reviewId, userId, text, date) {         //updating the review method
    try {
      const updateResponse = await reviews.updateOne(               
        { user_id: userId, _id: ObjectId(reviewId)},                //looking for review with same user id and object id   
        { $set: { text: text, date: date  } },                      //setting new text, new date
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)                //error case
      return { error: e }
    }
  }

  static async deleteReview(reviewId, userId) {                     //delete review method

    try {
      const deleteResponse = await reviews.deleteOne({              //check for same user id and review id  
        _id: ObjectId(reviewId),
        user_id: userId,
      })

      return deleteResponse                                         //deleting the review
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)                //in case of error
      return { error: e }
    }
  }

}