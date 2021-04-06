import React, { Component } from 'react';
import BoardApiService from "../ApiService/BoardApiService";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class EditBoardComponent extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            id : "",
            title : "",
            username : "",
            contents : ""
        }
    }

    componentDidMount(){
        this.loadBoard();
    }


    loadBoard = () =>{
        BoardApiService.boardInfo(window.localStorage.getItem("boardID"))
        .then( res => {
            let board = res.data;
            this.setState({
                id : board.id,
                title : board.title,
                username : board.username,
                contents : board.contents
            });
        })
        .catch( err => {
            console.log("loadBoard() 에러",err);
        });
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    saveBoard = (e) =>{
        e.preventDefault();

        let board = {
            id : this.state.id,
            title : this.state.title,
            contents : this.state.contents
        }

        BoardApiService.boardUpdate(board)
        .then( res => {
            this.setState({
                message : board.title + "이 수정되었습니다."
            })
            this.props.history.push("/boards");
        })
        .catch(err => {
            console.log("saveBoard() 에러", err);
        })
    }


    render(){
        return(
          <div>
            <Typography variant="h4" style={style}>게시판 수정</Typography>
            <form>
                <TextField type="text" placeholder="타이틀을 입력하세요." name="title" label="제목"
                fullWidth margin="normal" value={this.state.title} onChange={this.onChange} />
    
                <TextField type="text" placeholder="작성자를 입력하세요." name="username" label="작성자"
                fullWidth margin="normal" value={this.state.username} onChange={this.onChange} />
    
                <TextField type="text" placeholder="내용를 입력하세요." name="contents" label="내용" multiline rows={4} variant="outlined"
                fullWidth margin="normal" value={this.state.contents} onChange={this.onChange} />
    
              <Button variant="contained" color="primary" onClick={this.saveBoard}>Save</Button>
    
            </form>
          </div>
        );
    }
}
    
const style = {
    display: 'flex',
    justifyContent: 'center'
}
export default EditBoardComponent;