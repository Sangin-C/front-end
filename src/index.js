import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();

// 리앱트 앱에 존재하는 render 중 최상위에 있는 render가 존재하는 파일이다.
// index.js 파일엔 ReactDOM.render(...)가 있는데,
// 이는 App.js 파일에서 렌더한 App컴포넌트를 index.html파일에 있는 id가 "root"인 태그안에 실행하라는 것이다.
