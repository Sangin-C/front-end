import axios from 'axios';

const BOARD_API_BASE_URL = "http://localhost:8080/boards";

class BoardApiService {

    //전체 리스트
    boardList(){
        return axios.get(BOARD_API_BASE_URL);
    }

    //상세조회
    boardInfo(id){
        return axios.get(BOARD_API_BASE_URL+"/"+id)
    }

    //등록
    boardRegist(board){
        return axios.post(BOARD_API_BASE_URL, board);
    }

    //수정
    boardUpdate(board){
        return axios.put(BOARD_API_BASE_URL+"/"+board.id, board);
    }

    //삭제
    boardDelete(id){
        return axios.delete(BOARD_API_BASE_URL+"/"+id);
    }
}

export default new BoardApiService();