import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CountrySearch.css";

function CountrySearch() {
  const [country, setCountry] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [filter, setFilter] = useState([]); 


  const fetchData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryData = response.data.map((item) => ({
        name: item.name.common,
        flag: item.flags.png,
      }));
      setCountry(countryData);
      setFilter(countryData);
    } catch (error) {
      console.log("Error fetching data:", error.message);
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
    <div className="container">
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
            <img src={elem.flag} alt={elem.name} />
            <p>{elem.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountrySearch;
