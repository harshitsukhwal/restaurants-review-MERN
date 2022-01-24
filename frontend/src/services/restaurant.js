import http from "../http-common";

class RestaurantDataService {                       //class for defining functions for api calls and returning data
    getAll(page = 0) {                              // default pg 0, 
      return http.get(`restaurants?page=${page}`);  // getting data from a page
    }
  
    get(id) {                                       // getting a restro with specific id
      return http.get(`/restaurant?id=${id}`);
    }
  
    find(query, by = "name", page = 0) {            // query  with 3 filters name, zipcode, or cuisine
      return http.get(`restaurants?${by}=${query}&page=${page}`);
    } 
  
    createReview(data) {                            //post request with a data
      return http.post("/review-new", data);
    }
  
    updateReview(data) {                            // put request with the data
      return http.put("/review-edit", data);
    }
  
    deleteReview(id, userId) {                      //delete request with the data
      return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
    }
  
    getCuisines(id) {
      return http.get(`/cuisines`);
    }
  
  }
  
  export default new RestaurantDataService();
