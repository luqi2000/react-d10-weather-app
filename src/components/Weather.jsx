import { Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Weather = () => {
  const [cityName, setCityName] = useState("Rome");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const FetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7a910d6d29333007bb91a6aa5e562fff&units=metric`
    )
      .then(resp => {
        if (resp.ok) {
          error && setError(false);
          return resp.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(data => {
        setData(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    FetchWeather();
  }, [cityName, error]);

  const handleSearch = e => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  };

  return (
    <div className="bg_img">
      {!loading ? (
        <>
          <TextField
            variant="filled"
            label="Search location"
            className="input"
            error={error}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <h1 className="mt-3">{data.name}</h1>
          <div className="group">
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
            <h1>{data.weather[0].main}</h1>
          </div>

          <h1>{data.main.temp.toFixed()} °C</h1>

          <Slide direction="right" timeout={800} in={!loading}>
            <div className="box_container">
              <div className="box">
                <p>Humidity</p>
                <h1>{data.main.humidity.toFixed()}%</h1>
              </div>

              <div className="box">
                <p>Wind</p>
                <h1>{data.wind.speed.toFixed()} km/h</h1>
              </div>

              <div className="box">
                <p>Feels Like</p>
                <h1>{data.main.feels_like.toFixed()} °C</h1>
              </div>
            </div>
          </Slide>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default Weather;
