import "./App.css";
import countryData from "../resources/countryData.json";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState('');
  const [country, setcountry] = useState([]);
  const [suggestions, setsuggestions] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);

    if (inputValue.trim() === '') {
      setsuggestions(false);
    } else {
      const filterByCountry = countryData.filter((country) =>
        country.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setcountry(filterByCountry);
      setsuggestions(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setsuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
    <h1>Search</h1>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter country name..."
      />
      <button>search</button>
      {suggestions && (
        <div>
          {country.map(({ name }, index) => (
            <p key={index}>{name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
