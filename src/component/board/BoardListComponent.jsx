import React, {Component} from 'react';
import BoardApiService from "../ApiService/BoardApiService";

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

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
      BoardApiService.boardList()
        .then(res => {
          this.setState({
            boards: res.data
          })
        })
        .catch(err =>{
            console.log('reloadBoardList() Error!', err); 
        })
    }

    addBoard = () => {
      //window.localStorage에 저장되어있던 값을 삭제한다.
      window.localStorage.removeItem("boardID");
      //route를 통해 컴포넌트 이동
      this.props.history.push("/add-board");
    }

    editBoard = (boardID) => {
      //게시판 ID 저장
      window.localStorage.setItem("boardID", boardID);
      //route를 통해 컴포넌트 이동
      this.props.history.push("/edit-board");
    }


    deleteBoard = (boardID) => {
      window.localStorage.setItem("boarID", boardID);

      BoardApiService.boardDelete(boardID)
        .then( res => {
          this.setState({
            message: "Board Delete Successfully."
          });
          this.setState({
            boards: this.state.boards.filter( board =>
              board.id !== boardID)
          });
          console.log(this.state.message);
        })
        .catch(err =>{
          console.log('deleteBoard() Error!',err);
        })

    }

    render(){
      return(
        <div>
            <Typography variant="h4" style={style}>게시판 리스트</Typography>
            <Button variant="contained" color="primary" onClick={this.addBoard}> 등록 </Button>
                <Table>
                  <TableHead>
                      <TableRow>
                        <TableCell align="center">번호</TableCell>
                        <TableCell align="center">제목</TableCell>
                        <TableCell align="center">작성자</TableCell>
                        <TableCell align="center">작성일자</TableCell>
                        <TableCell align="center">수정일자</TableCell>
                        <TableCell align="center">좋아요</TableCell>
                        <TableCell align="center">조회수</TableCell>
                        <TableCell align="center">수정</TableCell>
                        <TableCell align="center">삭제</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {this.state.boards.map( board =>
                        <TableRow key = {board.id}>
                            <TableCell align="center"> {board.id} </TableCell>
                            <TableCell align="center"> {board.title} </TableCell>
                            <TableCell align="center"> {board.username} </TableCell>
                            <TableCell align="center"> {board.createdate} </TableCell>
                            <TableCell align="center"> {board.updatedate} </TableCell>
                            <TableCell align="center"> {board.likes} </TableCell>
                            <TableCell align="center"> {board.counts} </TableCell>
                            <TableCell align="center" onClick={()=> this.editBoard(board.id)}>
                              <CreateIcon />
                            </TableCell>
                            <TableCell align="center" onClick={()=> this.deleteBoard(board.id)}>
                              <DeleteIcon />
                            </TableCell>
                        </TableRow>
                      )}
                  </TableBody>
              </Table>
        </div>
      );
    }
}

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default BoardListComponent;