import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let restaurants    //variable restaurants used to reference to our database

export default class RestaurantsDAO {   //creating the restaurants class
    static async injectDB(conn){        //intial connection to the database -method
      if (restaurants) {
        return  
    }       
    try {
        restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants") //trying to connect with db and specifically to restaurants in restaurants_collection db
    } catch (e) {
        console.error(
            `Unable to establish a collection handle in restaurantsDAO: ${e}`,             //if we are not getting the database then this error msg is showed
        )
    }
    }
    static async getRestaurants({       // get a list of all restaurants in db
        filters = null,                  // filter like sort n etc.
        page = 0,                       // default page zero
        restaurantsPerPage =20,         // 20 restaurants / per pg
    } = {}) {
        let query
        if (filters) {                  // setting 3 types of filters :name, cuisine , zipcode
            if ("name" in filters) {
                query = { $text : { $search: filters["name"]}}          //text search string(later setup in mongo db database)
            } else if ("cuisine" in filters) {
                query ={"cuisine" : { $eq: filters["cuisine"]}}       //if cuisine from entry of data base is equal to the cuisine passed in (we have cll get restaurants method and see what cuisine it is) 
            } else if ("zipcode" in filters) {
                query ={ "address.zipcode": { $eq : filters["zipcode"]}}
            }
        }

        let cursor

        try {
            cursor = await restaurants  // this will find all the database restraus that go along with query we passed in
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)  //in case of erro
            return {retaurantsList: [], totalNumRestaurants: 0}  //returns all restaurants in case of no query passed
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)      //limiting the restaurants to no .of restros we want, and multiply restros per page to pg no.

        try {
            const restaurantsList = await displayCursor.toArray()                  // setting the restros list to an array
            const totalNumRestaurants = await restaurants.countDocuments(query)    // total no. of restros by counting the restros in the query
      
            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(
              `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { restaurantsList: [], totalNumRestaurants: 0 }  //returning the array of restros in case of error
          }
    }
    
    static async getRestaurantByID(id) {
        try {
          const pipeline = [                                    //creating a mongo db pipeline to help matching diff collections together
            {
                $match: {
                    _id: new ObjectId(id),                      //matching id of certain restros
                },
            },
                  {
                      $lookup: {                                //looking up for reviews collection
                          from: "reviews",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$restaurant_id", "$$id"],
                                      },
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "reviews",
                      },
                  },
                  {
                      $addFields: {
                          reviews: "$reviews",
                      },
                  },
              ]
          return await restaurants.aggregate(pipeline).next()                       //returning 
        } catch (e) {
          console.error(`Something went wrong in getRestaurantByID: ${e}`)
          throw e
        }
      }
    
      static async getCuisines() {
        let cuisines = []                                           //empty array fro cuisine
        try {
          cuisines = await restaurants.distinct("cuisine")          //getting all the distant restro cuisines
          return cuisines
        } catch (e) {
          console.error(`Unable to get cuisines, ${e}`)
          return cuisines
        }
      }


    }




