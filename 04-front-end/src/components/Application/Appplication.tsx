import React from 'react';
import './Application.sass';
import { Container } from 'react-bootstrap';
import UserLoginPage from '../User/UserLoginPage/UserLoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from '../Menu/Menu';
import UserCategoryList from '../User/UserCategoryList/UserCategorylist';

function Application() {
  return (
    <Container className="mt-4">
  
    <BrowserRouter>
    <Menu />
      <Routes>
       <Route path='/' element={ <div></div>} />
       <Route path='/auth/user/login' element={ <UserLoginPage /> } />
       <Route path='/categories' element={ <UserCategoryList /> } />
       

      </Routes>
    
    
    </BrowserRouter>
    </Container>
  );
}

export default Application;
