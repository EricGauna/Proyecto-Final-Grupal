import React, { useState } from "react";
import "./index.css"

export const Buscador = ({ defaultValue, onSearch, options, option1, option2, option3 }) => {
  const [searchValues, setSearchValues] = useState({
    option: options[0].key,
    value: defaultValue || "",
    option1: "",
    option2: "",
    option3: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch?.(searchValues);
  };

  return (
    <form className="SearchBlock" onSubmit={handleSearch} autoComplete="off">
      <div className="SearchBar">
        <input
          name="value"
          type="text"
          className="InputSearch"
          id="SearchText"
          placeholder="Buscar problema"
          value={searchValues.value}
          onChange={handleInputChange}
        />
        <select
          name="option"
          className="OptionSearch"
          value={searchValues.option}
          onChange={handleInputChange}
        >
          {options.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.value}
            </option>
          ))}
        </select>
        <button type="submit" className="Search">
          Buscar
        </button>
      </div>
    </form>
  );
};
