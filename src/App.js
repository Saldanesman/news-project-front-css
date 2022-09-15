import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { React } from 'react';

// Import css
import './App.css';

// Import Components
import NewsList from './components/NewsList/NewsList';
import ArchivedList from './components/ArchivedList/ArchivedList';
import CreateNews from './components/CreateNews/CreateNews';


function App() {
  return (
    <div className={"app"}>
      <nav>
        <ul className={"nav-list"}>
          <li className={"nav-items-logo"}><a href={"/"}> digitalNews </a></li>
          <li className={"nav-items"}><a className={"a-home"} href={"/"}> News List </a></li>
          <li className={"nav-items"}><a className={"a-archived"} href={"/archivednews"}> Archived News </a></li>
          <li className={"nav-items"}><a className={"a-create"} href={"/createnews"}> Create News </a></li>
        </ul>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NewsList />} exact />
          <Route path='/createnews' element={<CreateNews />} exact />
          <Route path='/archivednews' element={<ArchivedList />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
