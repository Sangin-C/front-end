import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/boards";

class BoardApiService {

    boardList(){
        return axios.get(BOARD_API_BASE_URL);
    }
}

export default new BoardApiService();