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
          <Route path="/" element={<Navigate replace to="/resource-management-portal/" />} />
          <Route path="/resource-management-portal/" element={ <Login /> }/>
          <Route path="/resource-management-portal/home" element={ <Home /> } />
          <Route path="/resource-management-portal/resource/:id.json" element={ <ResourceDetails /> } />
          <Route path="/resource-management-portal/create" element={ <CreateItem /> } />
          <Route path="*" element = { <NotFound />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
