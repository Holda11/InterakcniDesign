import './App.scss'
import Header from './Components/Header';
import Payment from './Components/Payment';
import Success from './Components/Success';
import Login from './Views/Login';
import Profile from './Views/Profile';
import ResultsView from './Views/ResultsView';
import SearcherView from './Views/SearcherView';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const NotFound = () => <h1>404 - Stránka nenalezena</h1>;  

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<SearcherView />} />
        <Route path='/Flights' element={<ResultsView />} />
        <Route path='/SingIn' element={<Login />} />
        <Route path='/Payment' element={<Payment/>}/>
        <Route path='/Success' element={<Success/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
