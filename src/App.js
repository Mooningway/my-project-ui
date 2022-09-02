import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Routes, Route, } from 'react-router-dom';
import BookmarkIndex from './component/bookmark/BookmarkIndex';
import Bookmark from './component/bookmark/Bookmark';
import BookmarkTag from './component/bookmark/BookMarkTag';
import ExchangeRate from './component/exchange_rate/exchange_rate';
import Request from './component/request/request';
import MD5 from './component/md5/md5';
import Base64 from './component/base64/base64';
// import Richtext from './component/richtext/Richtext';
import MenuIndex from './component/common/menu';
import Aes from './component/aes/Aes';
import RandomString from './component/random/RandomString'

function App() {
  return (
    <div className='me-container'>
      {/* <Topbar /> */}
      <Routes>
        <Route path="/" element={<BookmarkIndex />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/bookmark/tag" element={<BookmarkTag />} />
        <Route path="/exchangeRate" element={<ExchangeRate />} />
        <Route path="/request" element={ <Request /> } />
        <Route path="/randomString" element={<RandomString />} />
        <Route path="/md5" element={<MD5 />} />
        <Route path="/base64" element={<Base64 />} />
        <Route path="/aes" element={<Aes />} />
        {/* <Route path='/richtext' element={<Richtext />} /> */}
      </Routes>
      <MenuIndex />
    </div>
  )
}

export default App;