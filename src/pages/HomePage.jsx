import React from 'react';
import { useState, useEffect } from 'react';
import List from '../components/List';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Controls from '../components/Controls';

const HomePage = ({ countries }) => {
  const [filtredCountries, setFiltredCountries] = useState(countries);

  const handleSearch = (search, region) => {
    let data = [...countries];
    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }
    if (search) {
      data = data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFiltredCountries(data);
  };
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);
  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filtredCountries.map((c) => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name,
            info: [
              {
                title: 'Population',
                description: c.population.toLocaleString(),
              },
              {
                title: 'Region',
                description: c.region,
              },
              {
                title: 'Capital',
                description: c.capital,
              },
            ],
          };
          return (
            <Card key={c.name} onClick={() => navigate(`/country/${c.name}`)} {...countryInfo} />
          );
        })}
      </List>
    </>
  );
};

export default HomePage;
