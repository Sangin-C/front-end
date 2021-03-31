import React, { Component } from 'react';
import BoardApiService from '../ApiService/BoardApiService';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddBoardComponent extends Component {
    constructor(props) {
        super(props)

        //입력 받을 값 초기화
        this.state = {
            title: '',
            username: '',
            contents: '',
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    saveBoard = (e) => {
        e.preventDefault();

        //state에 있는 값들을 board라는 변수에 저장한다.
        let board = {
            title: this.state.title,
            username: this.state.username,
            contents: this.state.contents
        }

        //API통신을 위해 BoardApiService.js에 만들어놓은 insertBoard함수를 호출한다.
        BoardApiService.insertBoard(board)
            .then(res =>{
                this.setState({
                    message: board.title + '이 성공적으로 등록되었습니다.'
                })
                console.log(this.state.message);
                this.props.history.push("/boards");
            })
            .catch(err => {
                console.log('saveBoard() 에러', err);
            });
    }


    render() {
        return (
          <div>
              <Typography variant="h4" style={style}>게시글 등록</Typography>
            <form style={formContainer}>
                {/* 모든 입력태그에 onChange()를 호출하여 실시간으로 값이 변경될 때 state값을 저장한다. */}
                <TextField type="text" name="title" label="제목"
                fullWidth margin="normal" value={this.state.title} onChange={this.onChange} />

                <TextField type="text" name="username" label="등록자"
                fullWidth margin="normal" value={this.state.username} onChange={this.onChange} />

                <TextField type="text" name="contents" label="내용" multiline rows={4} variant="outlined"
                fullWidth margin="normal" value={this.state.contents} onChange={this.onChange} />

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

export default AddBoardComponent;