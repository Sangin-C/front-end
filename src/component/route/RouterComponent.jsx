import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserListComponent from "../user/UserListComponent";
import AddUserComponent from "../user/AddUserComponent";
import EditUserComponent from "../user/EditUserComponent";
import BoardListComponent from "../board/BoardListComponent";


const AppRouter = () => {
   return(
     <div style={style}>
          <Switch>
            {/* 유저 */}
            <Route exact path="/" component={UserListComponent} />
            <Route path="/users" component={UserListComponent} />
            <Route path="/add-user" component={AddUserComponent} />
            <Route path="/edit-user" component={EditUserComponent} />

            {/* 게시판 */}
            <Route path="/boards" component={BoardListComponent} />
          </Switch>
     </div>
   );
}

const style = {
  marginTop: '20px'
}

export default AppRouter;