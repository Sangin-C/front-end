import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



class NavBar extends Component{

  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){
    return(
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={style}>
              <Link to="/">리액트+SpringBoot ToyProject</Link>
            </Typography>
            <Link to="/users">
              <Button color="inherit">유저리스트</Button>
            </Link>
            <Link to="/boards">
              <Button color="inherit">게시판리스트</Button>
            </Link>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const style = {
  flexGrow: 1
}

export default NavBar;