import Header from './components/Header';
import Main from './components/Main';
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ALL_COUNTRIES } from './config';

function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then((response) => setCountries(response.data));
    }
  }, [countries.length]);
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route
            exact
            path="/"
            element={<HomePage countries={countries} setCountries={setCountries} />}
          />
          <Route exact path="/country/:name" element={<Details />} />
          <Route element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
