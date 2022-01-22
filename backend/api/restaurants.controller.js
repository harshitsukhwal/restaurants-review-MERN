import RestaurantsDAO from "../dao/restaurantsDAO.js"   //importing the other file we created first

export default class RestaurantsController {            //class creation
  static async apiGetRestaurants(req, res, next) {      //api called through a url 
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20       //if the query page exits then we are going to pass the pg to int value, if not default is 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0                          //if we passed a pg no with a url then we will convert it to an int if not pg is 0

    let filters = {}
    if (req.query.cuisine) {                            //if cuisine is in the query then filter is set to name     
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode               //if zipcode is in the query then filter by zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({ //this will returns the list of the restros with following parameters
      filters,
      page,
      restaurantsPerPage,
    })

    let response = {                            //response send to person/client with the api list from above with below information 
      restaurants: restaurantsList,
      page: page, 
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    }
    res.json(response)
  }
  /*static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {}
      let restaurant = await RestaurantsDAO.getRestaurantByID(id)
      if (!restaurant) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(restaurant)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  } */
}