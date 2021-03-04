import React, {Component} from 'react';
import BoardApiService from "../ApiService/BoardApiService";

class BoardListComponent extends Component{

    constructor(props){
      super(props);

      this.state = {
        boards: []
      }
    }

    //컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드이다.
    componentDidMount(){
      this.reloadBoardList();
    }

    //게시판리스트를 Api호출을 통해 가져오기.
    reloadBoardList = () => {
      BoardApiService.getBoards()
        .then(res => {
          this.setState({
          boards: res.data
          })
        })
        .catch(err =>{
            console.log('reloadUserList() Error!', err); 
        })
    }

    render(){
      return(
        <div>
            <h2 className="text-center">게시판 리스트</h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일자</th>
                            <th>수정일자</th>
                            <th>좋아요</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.boards.map(
                                board =>
                                <tr key = {board.id}>
                                    <td> {board.id} </td>
                                    <td> {board.title} </td>
                                    <td> {board.username} </td>
                                    <td> {board.createdate} </td>
                                    <td> {board.updatedate} </td>
                                    <td> {board.likes} </td>
                                    <td> {board.counts} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
      );
    }
}
export default BoardListComponent;