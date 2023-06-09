import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { CircularProgress } from "@mui/material";

const Multiselect = () => {
  const [countries, setCountries] = useState([]);
  const [personName, setPersonName] = useState([]);
  const Selected = countries.slice(0, 2);
  const preSelected = Selected.toString();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetch("https://restcountries.com/v3.1/region/asia");
    const data = await res.json();
    if (data) {
      const country = [];
      for (let i = 1; i <= data.length; i++) {
        country.push(data[i]?.name?.common);
      }
      setCountries(country);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  const values = [...new Set([...Selected, ...personName])];

  return (
    <>
      <div
        style={{
          border: "1px solid rgba(124,189,184) ",
          borderRadius: "20px",
          margin: "auto",
          width: "400px",
          height: "400px",
          padding: "30px",
          marginTop: "80px",
          boxShadow: "1px 1px 1px rgba(1, 5, 14, 0.8)",
        }}
      >
        {!countries ? (
          <CircularProgress />
        ) : (
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Countries</InputLabel>
            <Select
              multiple
              value={values}
              onChange={handleChange}
              input={<OutlinedInput label="Countries" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {countries.map((name, index) => (
                <MenuItem
                  key={index}
                  value={name}
                  disabled={
                    personName.includes(name) || preSelected.includes(name)
                  }
                >
                  <Checkbox
                    checked={
                      personName.indexOf(name) > -1 ||
                      preSelected.includes(name)
                    }
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
    </>
  );
};

export default Multiselect;
