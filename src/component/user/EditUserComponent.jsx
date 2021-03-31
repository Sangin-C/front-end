import React, { Component } from 'react';
import UserApiService from "../ApiService/UserApiService";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class EditUserComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      id: '',
      username: '',
      age: '',
      salary: '',
      phonenum: '',
      message: null
    }
  }

  componentDidMount(){
    this.loadUser();
  }

  loadUser = () => {
    UserApiService.userInfo(window.localStorage.getItem("userID"))
      .then( res => {
        let user = res.data;
        this.setState({
          id: user.id,
          username: user.username,
          age: user.age,
          salary: user.salary,
          phonenum: user.phonenum
          })
      })
      .catch(err => {
        console.log('loadUser() 에러', err);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      id: this.state.id,
      password: this.state.password,
      age: this.state.age,
      salary: this.state.salary,
      phonenum: this.state.phonenum
    }

    UserApiService.updateUser(user)
      .then( res => {
        this.setState({
          message : user.lastName + '님 정보가 수정되었습니다.'
        })
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log('saveUser() 에러', err);
      })
  }

  render(){
    return(
      <div>
        <Typography variant="h4" style={style}>유저 수정</Typography>
        <form>
            <TextField type="text" name="username" readOnly={true} 
            fullWidth margin="normal" value={this.state.username} />

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

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default EditUserComponent;