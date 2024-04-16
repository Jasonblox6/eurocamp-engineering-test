import './App.css';
import Bookings from './Components/Bookings/Bookings';
import Users from './Components/Users/Users';
import Parcs from './Components/Parcs/Parcs';
import Navbar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import ContentContainer from './Components/Containers/ContentContainer';

//Uses react router to handle page changing without redirection, defaulting to Bookings

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Bookings />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/parcs" element={<Parcs />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </ContentContainer>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
