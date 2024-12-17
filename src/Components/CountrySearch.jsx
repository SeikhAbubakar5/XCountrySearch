import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./CountrySearch.css"


function CountrySearch() {
    const [country, setCountry] = useState([]); 
  const [search, setSearch] = useState("");  
  const [filter, setFilter] = useState([]); 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://xcountries-backend.azurewebsites.net/all"
      );
      setCountry(response.data);
      setFilter(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); 
    setSearch(value);

    const filtered = country.filter((elem) =>
      elem.name.toLowerCase().includes(value)
    );
    setFilter(filtered);
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search for countries"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="Country">
        {filter.map((elem, index) => (
          <div className="countryCard" key={index}>
            <img src={elem.flag} alt={elem.abbr} />
            <p>{elem.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CountrySearch
