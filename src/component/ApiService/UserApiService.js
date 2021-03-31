import axios from 'axios';

//const USER_API_BASE_URL = "http://27.96.130.90:8080/users";
const USER_API_BASE_URL = "http://localhost:8080/users";
class UserApiService {

  userList(){
    return axios.get(USER_API_BASE_URL);
  }

  userInfo(userID){
    return axios.get(USER_API_BASE_URL + '/' + userID);
  }

  deleteUser(userID){
    return axios.delete(USER_API_BASE_URL + '/' + userID);
  }
  
  insertUser(user){
    return axios.post(USER_API_BASE_URL, user);
  }

  updateUser(user){
    return axios.put(USER_API_BASE_URL + '/' + user.id, user)
  }

}

export default new UserApiService();