import React, { Component } from 'react';
import UserApiService from "../ApiService/UserApiService";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddUserComponent extends Component{

  constructor(props){
    super(props);

    //입력받을 유저 정보를 state에 정의(초기화)한다.
    this.state = {
      username: '',
      password: '',
      age: '',
      salary: '',
      phonenum: '',
      message: null
    }
  }

  //입력받을 각각의 모든 입력태그에 값이 변경될 때 마다 실시간으로 state값을 저장한다.
  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  //유저등록를 위해 SpringBoot와 Api통신을 통해 DB에 insert한다.
  saveUser = (e) => {
    e.preventDefault();

    //state에 저장되어있는 값들을 user변수에 담는다.
    let user = {
      username: this.state.username,
      password: this.state.password,
      age: this.state.age,
      salary: this.state.salary,
      phonenum: this.state.phonenum
    }

    //Api통신을 하기위해 ApiSercive.js에 만들어 놓은 addUser 함수를 호출한다.
    UserApiService.addUser(user)
    //통신이 성공하면
    .then( res => {
        this.setState({
          message: user.username + '님이 성공적으로 등록되었습니다.'
        })
        console.log(this.state.message);
        //route를 통해 '/users' url을 호출하면 UserListComponent.jsx로 이동하도록한다.
        this.props.history.push('/users');
    })
    //통신이 실패하면
    .catch( err => {
      console.log('saveUser() 에러', err);
    });
  }

  render(){
    return(
      <div>
        <Typography variant="h4" style={style}>유저 등록</Typography>
        <form style={formContainer}>
            {/* 모든 입력태그에 onChange()를 호출하여 실시간으로 값이 변경될 때 state값을 저장한다. */}

            <TextField type="text" placeholder="이름을 입력하세요." name="username" 
            fullWidth margin="normal" value={this.state.username} onChange={this.onChange} />

            <TextField type="password" placeholder="비밀번호를 입력하세요." name="password" 
            fullWidth margin="normal" value={this.state.password} onChange={this.onChange} />

            <TextField type="number" placeholder="나이를 입력하세요." name="age" 
            fullWidth margin="normal" value={this.state.age} onChange={this.onChange} />

            <TextField type="number" placeholder="급여를 입력하세요." name="salary" 
            fullWidth margin="normal" value={this.state.salary} onChange={this.onChange} />

            <TextField type="text" placeholder="핸드폰번호를 입력하세요." name="phonenum" 
            fullWidth margin="normal" value={this.state.phonenum} onChange={this.onChange} />

            <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

        </form>
      </div>
    );
  }
}

const formContainer = {
  display: 'flex',
  flexFlow: 'row wrap'
}

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default AddUserComponent;