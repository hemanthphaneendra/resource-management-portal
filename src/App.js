import Header from './Header';
import Home from './Home';
import CreateItem from './CreateItem.js';
import ResourceDetails from './ResourceDetails.js';
import Login from './Login.js';
import NotFound from './NotFound.js';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/Login" element={ <Login /> }/>
          <Route path="/home" element={ <Home /> } />
          <Route path="/resource/:id.json" element={ <ResourceDetails /> } />
          <Route path="/create" element={ <CreateItem /> } />
          <Route path="*" element = { <NotFound />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
