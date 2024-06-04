// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Coins from './components/Coins';
// import Exchanges from './components/Exchanges';
// import CoinsDetails from './components/CoinsDetails';

// function App() {
//   return (
//     <div>
//     <Router>
//       <Routes>
//         <Route path='/' element={<Exchanges />} />
//         <Route path='/coins' element={<Coins />} />
//         <Route path='coins/:id' element={<CoinsDetails />} />
//       </Routes>
//     </Router>
//     </div>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Coins from './components/Coins';
import CoinsDetails from './components/CoinsDetails';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Coins />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='coins/:id' element={<CoinsDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
