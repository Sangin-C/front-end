import React, { Component } from 'react';
import UserApiService from "../ApiService/UserApiService";

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

class UserListComponent extends Component{

  //컴포넌트를 생성 할 때는 constructor -> componentWillMount -> render -> componentDidMount 순으로 진행된다.

  //생성자 메소드로서 컴포넌트가 처음 만들어 질 때 실행된다.
  //기본 state를 정할 수 있다.
  constructor(props){
    super(props);

    this.state = {
      users: [],
      message: null
    }
  }
  
  //컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드이다.
  componentDidMount(){
    this.reloadUserList();
  }

  //유저리스트를 SpringBoot와 Api통신을 통해 가져오는 메소드이다.
  reloadUserList = () => {
    UserApiService.fetchUsers()
      .then( res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.log('reloadUserList() Error!', err);
      })
  }

  //유저삭제를 위해 SpringBoot와 Api통신을 통해 DB를 삭제한다.
  deleteUser = (userID) => {
    //Api통신을 하기위해 ApiSercive.js에 만들어 놓은 deleteUser 함수를 호출한다.
    UserApiService.deleteUser(userID)
      //통신이 성공하면
      .then( res => {
        this.setState({
          message: 'User Deleted Successfully.'
        });
        this.setState({
          //filter를 통해 state에 있는 users배열에서 삭제한 유저의 id를 제외하고 다시 재정의한다.
          users: this.state.users.filter( user =>
            user.id !== userID)
          });
        })
      //통신이 실패하면
      .catch(err => {
        console.log('deleteUser() Error!', err);
      })
  }
  
  //수정버튼을 클릭했을때 호출되는 함수이다.
  editUser = (ID) => {
    //window.localStorage를 통해 유저의 id값을 일시적으로 저장한다.
    window.localStorage.setItem("userID", ID);
    //route를 통해 '/edit-user' url을 호출하면 EditUserComponent.jsx로 이동하도록한다.
    this.props.history.push('/edit-user');
  }


  //등록버튼을 클릭했을때 호출되는 함수이다.
  addUser = () => {
    //window.localStorage에 셋팅되어있는 값을 삭제한다.
    window.localStorage.removeItem("userID");
    //route를 통해 '/add-user' url을 호출하면 AddUserComponent.jsx로 이동하도록한다.
    this.props.history.push('/add-user');
  }

  
  render(){
    return(
      <div>
        <Typography variant="h4" style={style}>유저 리스트</Typography>
        <Button variant="contained" color="primary" onClick={this.addUser}> 등록 </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">나이</TableCell>
              <TableCell align="center">급여</TableCell>
              <TableCell align="center">핸드폰번호</TableCell>
              <TableCell align="center">수정</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map( user => 
              <TableRow key={user.id}>
                <TableCell component="th" scope="user">{user.id}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.age}</TableCell>
                <TableCell align="center">{user.salary}</TableCell>
                <TableCell align="center">{user.phonenum}</TableCell>
                <TableCell align="center" onClick={()=> this.editUser(user.id)}>
                  <CreateIcon />
                </TableCell>
                <TableCell align="center" onClick={()=> this.deleteUser(user.id)}>
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

export default UserListComponent;