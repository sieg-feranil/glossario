import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Outlet, Link } from "react-router-dom"
import { Amazonn } from './component/amazon';
import { Blog} from './component/blog';

function Main() {
  return (
    <>
      <header className="App-header">
        amazon
      </header>
      <div className="page">
        <nav>
         
        </nav>
        <Outlet />
      </div>
      <Amazonn/>
    </>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
