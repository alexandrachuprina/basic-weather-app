import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import { sizes } from './styles/breakpoints';

function App() {
  const [location, setLocation] = useState();
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [name, setName] = useState();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [toggle, setToggle] = useState(true)

  const APIkey = 'c00b195a3e3fe02badc1a13a06366034';
  const firstURL = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIkey}`;
  const secondURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;

  function getCoordinates() {
    fetch(firstURL)
      .then(response => response.text())
      .then(text => JSON.parse(text))
      .then(text => {
        console.log(`Works fine, here is the all data: `);
        console.log(text);

        setLat(text[0].lat);
        setLon(text[0].lon);
        setName(text[0].name);
        setError(false);
      })
      .catch(error => { console.log(`ERROR: ${error}`); setError(true) });

    setLocation(' ');
  }

  useEffect(() => {
    fetch(secondURL)
      .then(response => {
        if (!response.ok) {
          console.log('ERROR')
          console.log(response.status)
        } else {
          response.text()
            .then(text => JSON.parse(text))
            .then(text => {
              console.log(`Works fine, here is the data[0].current: `);
              console.log(text);

              let current = text;
              setData(current);
              setToggle(false)
            })
        }
      })
      .catch(error => { console.log(`ERROR: ${error}`); setError(true) })

  }, [lat, lon])

  let date0;
  let date1;
  let date2;
  let date3;
  let date4;
  let date5;
  let date6;

  if (data) {
    date0 = new Date(data.daily[0].dt * 1000).getDate();
    date1 = new Date(data.daily[1].dt * 1000).getDate();
    date2 = new Date(data.daily[2].dt * 1000).getDate();
    date3 = new Date(data.daily[3].dt * 1000).getDate();
    date4 = new Date(data.daily[4].dt * 1000).getDate();
    date5 = new Date(data.daily[5].dt * 1000).getDate();
    date6 = new Date(data.daily[6].dt * 1000).getDate();
  }

  return (
    <Page style={{ zIndex: -1 }}>
      <SearchBar>
        <Input
          type="text"
          value={location}
          onChange={event => setLocation(event.target.value)}
        />
        <Button onClick={() => getCoordinates()}><p>Get</p></Button>
      </SearchBar>

      {error ?
        <ErrorBar>
          <p>Something went wrong :(</p>
          <p>We suggest you to check city name writing. Also make sure that search bar is not emty. All the best!</p>
        </ErrorBar>
        : null}

      {toggle ?
        <Welcome>
          <h1 style={{ zIndex: 1 }}>Welcome!</h1>
          <h1>Just enter city name :)</h1>
        </Welcome>
        :
        null}

      {data ?
        <Info>
          <MainInfo>
            <div>
              <p>City: {name}</p>
              <h2>t {Math.floor(data.current.temp)}°C</h2>
              <p>{data.current.weather[0].main}</p>
              <p>Feels like {Math.floor(data.current.feels_like)}</p>
              <p>Wind speed {data.current.wind_speed}</p>
              <p>Humidity {data.current.humidity}</p>
            </div>
          </MainInfo>
          <AdditionalInfo>
            <Daily>
              <div><p>Daily</p></div>
              <div>
                <p>date</p>
                <p>weather</p>
                <p>max t</p>
                <p>min t</p>
                <p>wind</p>
              </div>

              <div></div>

              <div>
                <p>{date0}</p>
                <p>{data.daily[0].weather[0].main}</p>
                <p>{Math.floor(data.daily[0].temp.min)}°C</p>
                <p>{Math.floor(data.daily[0].temp.max)}°C</p>
                <p>{data.daily[0].wind_speed}</p>
              </div>

              <div>
                <p>{date1}</p>
                <p>{data.daily[1].weather[0].main}</p>
                <p>{Math.floor(data.daily[1].temp.min)}°C</p>
                <p>{Math.floor(data.daily[1].temp.max)}°C</p>
                <p>{data.daily[1].wind_speed}</p>
              </div>

              <div>
                <p>{date2}</p>
                <p>{data.daily[2].weather[0].main}</p>
                <p>{Math.floor(data.daily[2].temp.min)}°C</p>
                <p>{Math.floor(data.daily[2].temp.max)}°C</p>
                <p>{data.daily[2].wind_speed}</p>
              </div>

              <div>
                <p>{date3}</p>
                <p>{data.daily[3].weather[0].main}</p>
                <p>{Math.floor(data.daily[3].temp.min)}°C</p>
                <p>{Math.floor(data.daily[3].temp.max)}°C</p>
                <p>{data.daily[3].wind_speed}</p>
              </div>

              <div>
                <p>{date4}</p>
                <p>{data.daily[4].weather[0].main}</p>
                <p>{Math.floor(data.daily[4].temp.min)}°C</p>
                <p>{Math.floor(data.daily[4].temp.max)}°C</p>
                <p>{data.daily[4].wind_speed}</p>
              </div>

              <div>
                <p>{date5}</p>
                <p>{data.daily[5].weather[0].main}</p>
                <p>{Math.floor(data.daily[5].temp.min)}°C</p>
                <p>{Math.floor(data.daily[5].temp.max)}°C</p>
                <p>{data.daily[5].wind_speed}</p>
              </div>

              <div>
                <p>{date6}</p>
                <p>{data.daily[6].weather[0].main}</p>
                <p>{Math.floor(data.daily[6].temp.min)}°C</p>
                <p>{Math.floor(data.daily[6].temp.max)}°C</p>
                <p>{data.daily[6].wind_speed}</p>
              </div>

            </Daily>
            <Wrapper>
              <Hourly>
                <div><p>Hourly</p></div>
                <div>
                  <p>hour</p>
                  <p>weather</p>
                  <p>t</p>
                  <p>feels like</p>
                  <p>wind</p>
                </div>

                <div></div>

                <div>
                  <p>1 AM</p>
                  <p>{data.hourly[0].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[0].temp)}°C</p>
                  <p>{Math.floor(data.hourly[0].feels_like)}°C</p>
                  <p>{data.hourly[0].wind_speed}</p>
                </div>
                <div>
                  <p>2 AM</p>
                  <p>{data.hourly[1].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[1].temp)}°C</p>
                  <p>{Math.floor(data.hourly[1].feels_like)}°C</p>
                  <p>{data.hourly[1].wind_speed}</p>
                </div>
                <div>
                  <p>3 AM</p>
                  <p>{data.hourly[2].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[2].temp)}°C</p>
                  <p>{Math.floor(data.hourly[2].feels_like)}°C</p>
                  <p>{data.hourly[2].wind_speed}</p>
                </div>
                <div>
                  <p>4 AM</p>
                  <p>{data.hourly[3].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[3].temp)}°C</p>
                  <p>{Math.floor(data.hourly[3].feels_like)}°C</p>
                  <p>{data.hourly[3].wind_speed}</p>
                </div>
                <div>
                  <p>5 AM</p>
                  <p>{data.hourly[4].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[4].temp)}°C</p>
                  <p>{Math.floor(data.hourly[4].feels_like)}°C</p>
                  <p>{data.hourly[4].wind_speed}</p>
                </div>
                <div>
                  <p>6 AM</p>
                  <p>{data.hourly[5].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[5].temp)}°C</p>
                  <p>{Math.floor(data.hourly[5].feels_like)}°C</p>
                  <p>{data.hourly[5].wind_speed}</p>
                </div>
                <div>
                  <p>7 AM</p>
                  <p>{data.hourly[6].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[6].temp)}°C</p>
                  <p>{Math.floor(data.hourly[6].feels_like)}°C</p>
                  <p>{data.hourly[6].wind_speed}</p>
                </div>
                <div>
                  <p>8 AM</p>
                  <p>{data.hourly[7].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[7].temp)}°C</p>
                  <p>{Math.floor(data.hourly[7].feels_like)}°C</p>
                  <p>{data.hourly[7].wind_speed}</p>
                </div>
                <div>
                  <p>9 AM</p>
                  <p>{data.hourly[8].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[8].temp)}°C</p>
                  <p>{Math.floor(data.hourly[8].feels_like)}°C</p>
                  <p>{data.hourly[8].wind_speed}</p>
                </div>
                <div>
                  <p>10 AM</p>
                  <p>{data.hourly[9].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[9].temp)}°C</p>
                  <p>{Math.floor(data.hourly[9].feels_like)}°C</p>
                  <p>{data.hourly[9].wind_speed}</p>
                </div>
                <div>
                  <p>11 AM</p>
                  <p>{data.hourly[10].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[10].temp)}°C</p>
                  <p>{Math.floor(data.hourly[10].feels_like)}°C</p>
                  <p>{data.hourly[10].wind_speed}</p>
                </div>
                <div>
                  <p>12 AM</p>
                  <p>{data.hourly[11].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[11].temp)}°C</p>
                  <p>{Math.floor(data.hourly[11].feels_like)}°C</p>
                  <p>{data.hourly[11].wind_speed}</p>
                </div>
                <div>
                  <p>1 PM</p>
                  <p>{data.hourly[12].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[12].temp)}°C</p>
                  <p>{Math.floor(data.hourly[12].feels_like)}°C</p>
                  <p>{data.hourly[12].wind_speed}</p>
                </div>
                <div>
                  <p>2 PM</p>
                  <p>{data.hourly[13].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[13].temp)}°C</p>
                  <p>{Math.floor(data.hourly[13].feels_like)}°C</p>
                  <p>{data.hourly[13].wind_speed}</p>
                </div>
                <div>
                  <p>3 PM</p>
                  <p>{data.hourly[14].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[14].temp)}°C</p>
                  <p>{Math.floor(data.hourly[14].feels_like)}°C</p>
                  <p>{data.hourly[14].wind_speed}</p>
                </div>
                <div>
                  <p>4 PM</p>
                  <p>{data.hourly[15].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[15].temp)}°C</p>
                  <p>{Math.floor(data.hourly[15].feels_like)}°C</p>
                  <p>{data.hourly[15].wind_speed}</p>
                </div>
                <div>
                  <p>5 PM</p>
                  <p>{data.hourly[16].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[16].temp)}°C</p>
                  <p>{Math.floor(data.hourly[16].feels_like)}°C</p>
                  <p>{data.hourly[16].wind_speed}</p>
                </div>
                <div>
                  <p>6 PM</p>
                  <p>{data.hourly[17].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[17].temp)}°C</p>
                  <p>{Math.floor(data.hourly[17].feels_like)}°C</p>
                  <p>{data.hourly[17].wind_speed}</p>
                </div>
                <div>
                  <p>7 PM</p>
                  <p>{data.hourly[18].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[18].temp)}°C</p>
                  <p>{Math.floor(data.hourly[18].feels_like)}°C</p>
                  <p>{data.hourly[18].wind_speed}</p>
                </div>
                <div>
                  <p>8 PM</p>
                  <p>{data.hourly[19].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[19].temp)}°C</p>
                  <p>{Math.floor(data.hourly[19].feels_like)}°C</p>
                  <p>{data.hourly[19].wind_speed}</p>
                </div>
                <div>
                  <p>9 PM</p>
                  <p>{data.hourly[20].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[20].temp)}°C</p>
                  <p>{Math.floor(data.hourly[20].feels_like)}°C</p>
                  <p>{data.hourly[20].wind_speed}</p>
                </div>
                <div>
                  <p>10 PM</p>
                  <p>{data.hourly[21].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[21].temp)}°C</p>
                  <p>{Math.floor(data.hourly[21].feels_like)}°C</p>
                  <p>{data.hourly[21].wind_speed}</p>
                </div>
                <div>
                  <p>11 PM</p>
                  <p>{data.hourly[22].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[22].temp)}°C</p>
                  <p>{Math.floor(data.hourly[22].feels_like)}°C</p>
                  <p>{data.hourly[22].wind_speed}</p>
                </div>
                <div>
                  <p>12 PM</p>
                  <p>{data.hourly[23].weather[0].main}</p>
                  <p>{Math.floor(data.hourly[23].temp)}°C</p>
                  <p>{Math.floor(data.hourly[23].feels_like)}°C</p>
                  <p>{data.hourly[23].wind_speed}</p>
                </div>
              </Hourly>
            </Wrapper>
          </AdditionalInfo>
        </Info>
        : null}

      <Footer>
        <p>Data source:</p> <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer"><p>OpenWeather API</p></a>
      </Footer>

    </Page >
  );
}

export default App;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-color: black;
  p {
    font-size: 2vh;
  }

  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xxs}) {
    height: calc(116vh);
  }
  @media (min-width: ${sizes.xxs}) and (max-width: ${sizes.xs}) {
    height: calc(123vh + 6vh);
  }
  @media (min-width: ${sizes.xs}) and (max-width: ${sizes.l}){
    height: 100vh;
  }
`
const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid white;
  width: 100vw;
  min-height: 6vh;
  padding-left: 2vw;
  box-sizing: border-box;

  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xxs}) {
    padding-left: 2vw;
  }
`
const ErrorBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 2px solid white;
  border-top: 2px solid white;
  width: 100vw;
  height: 6vh;
  min-height: 6vh;
  max-height: 8vh;
  padding-left: 5rem;
  block-size: fit-content;
  position: absolute;
  top: 6vh;
  background-color: orange;

  @media (max-width: ${sizes.s}){
    p {
      font-size: 0.5vh;
    }
  }
  @media (max-width: ${sizes.m}){
    p {
      font-size: 2vh;
    }
  }
`
const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100%;
  flex-wrap: wrap;

  h1 {
    font-size: 20vh;
    font-family: NeueMetanaNext;
    color: white;
    margin-left: 2vw;
    z-index: 1;
  }
  
`
const Info = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 88vh;

  @media (max-width: ${sizes.l}){
    display: flex;
    flex-direction: column;
  }
 
`
const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: 80%; 
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  border-radius: 50%;
  align-self: center;
  margin: 0 2vw 0 2vw;

  h2 {
    color: black;
    font-size: 10vh;
    margin-bottom: 5vh;
    margin-top: 1vw;
  }
  p {
    color: black;
    font-size: 2rem;
    &:hover {
      font-style: italic;
    }
  }

  @media (min-width: ${sizes.micro} ) and (max-width: ${sizes.mini}){
    padding: 2vh 0 1vh 2.5rem;
    width: 100vw;
    border-right: none;
    height: 48vh;
    box-sizing: border-box;

    background-color: red;
    h1 {
      font-size: 8vh;
    }
    h2 {
      font-size: 6vh;
      margin-bottom: 1vh;
    }
    p {
      font-size: 1rem;
      &:hover {
        font-style: italic;
      }
    }
  }

  @media (min-width: ${sizes.mini}) and (max-width: ${sizes.xxs}){
    padding: 2vh 0 1vh 2.5rem;
    width: 100vw;
    border-right: none;
    height: 48vh;

    background-color: orange;
    h1 {
      font-size: 10vh;
    }
    h2 {
      font-size: 6vh;
      margin-bottom: 0.5vh;
    }
    p {
      font-size: 1rem;
      &:hover {
        font-style: italic;
      }
    }
  }

  @media (min-width: ${sizes.xxs}) and (max-width: ${sizes.m}){
    padding: 4vh 0 1vh 2.5rem;
    width: 100vw;
    border-right: none;
    block-size: fit-content;
    height: 48vh;

    background-color: yellow;
    h1 {
      font-size: 14vh;
    }
    h2 {
      font-size: 8vh;
      margin-bottom: 2vh;
    }
    p {
      font-size: 1.5rem;
      &:hover {
        font-style: italic;
      }
    }
  }

  @media (min-width:  ${sizes.m}) and (max-width:  ${sizes.l}) {
    background-color: green;
    padding: 2vh 0 6vh 2.5rem;
    width: 60vw;
    height: 48vh;
  }
`
const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 100%;
  border-left: 2px solid white;
  box-sizing: border-box;

  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xs}) {
    width: 100vw;
    border-left: none;
  }
  @media (min-width: ${sizes.xs}) and (max-width: ${sizes.l}){
    display: flex;
    flex-direction: row;
    border-left: none;
    width: 100vw;
    height: 40vh;
  }

`
const Daily = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  div {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    align-content: center;
    justify-items: start;
    border-bottom: 0.5px solid white;
    width: 100%;
    height: 4vh;
    &:last-child {
      border-bottom: 2px solid white;
    }
    &:hover {
      font-style: italic;
      background-color: white;
      p {
        color: black;
      }
    }
  }
  p {
    font-size: 1.4vh;
    padding-left: 1vw;
  }

  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xxs}) {
    div {
      justify-items: center;
    }
    p {
      font-size: 1vh;
    }
  }
  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xs}) {
    width: 100vw;
    height: 40vh;
    div {
      &:first-child {
        border-top: 2px solid white;
      }
      &:last-child {
      border-bottom: none;
    }
    }
  }
  @media (min-width: ${sizes.xs}) and (max-width: ${sizes.l}){
    width: 50%;
    height: 40.7vh;
    div {
      padding-left: 0;
      height: 4vh;
      &:first-child {
        border-top: 2px solid white;
      }
      &:last-child {
        border-bottom: none;
      }
      p {
        padding-left: 1vw;
      }
    }

  }
  
`
const Wrapper = styled.div`
  overflow-y: scroll;
  height: 48vh;
  width: 100%;
  background-color: black;

  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xs}) {
    width: 100vw;
    height: 40vh;
  }
  @media (min-width: ${sizes.xs}) and (max-width: ${sizes.l}){
    width: 50%;
    height: 40vh;
    border-left: 2px solid white;
    border-top: 2px solid white;
  }
`
const Hourly = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;

  div {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    align-content: center;
    justify-items: start;
    border-bottom: 0.5px solid white;
    width: 100%;
    height: 4vh;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      font-style: italic;
      background-color: white;
      p {
        color: black;
      }
    }
  }
  p {
    font-size: 1.4vh;
    padding-left: 1vw;
  }

  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xxs}) {
    div {
      justify-items: center;
    }
    p {
      font-size: 1vh;
    }
  }
  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xs}) {
    width: 100%;
    div {
      &:first-child {
        border-top: 2px solid white;
      }
    }
  }

  @media (min-width: ${sizes.xs}) and (max-width: ${sizes.l}){
    width: 100%;
    div {
      padding-left: 0;
      height: 4vh;
      &:last-child {
        border-bottom: none;
      }
      p {
        padding-left: 1vw;
      }
    }
  }
`
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-top: 2px solid white;
  width: 100vw;
  min-height: 6vh;
  height: 6vh;
  margin-top: auto;
  padding-left: 2vw;
  box-sizing: border-box;
  p {
    color: white;
  }
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (min-width: ${sizes.micro}) and (max-width: ${sizes.xxs}) {
    padding-left: 2vw;
  }
`
const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance:none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;

  box-sizing: border-box;
  outline: none;
  outline-offset: none;
  font-size: 1rem;
  font-weight: 100;
  border: 2px solid white;
  border-radius: 40px;
  background-color: white;

  text-align: center;

  width: 20vh;
  height: 3vh;
  p {
    color: white;
  }

  &:hover {
      color: black;
  }
  &:focus {
      outline: none;
      outline-offset: none;
  }
  input::placeholder{
  color: white;
}
`
const Button = styled.button`
  margin: 0 0 0 0.5vw;
  box-sizing: border-box;
  font-family: 'Helvetica', sans-serif;
  font-weight: 50;
  font-size: 0.8rem;
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  opacity: 1;

  width: 10vh;
  height: 3vh;
  padding-top: 0.4vh;

  background-color: white;
  p {
      color: black;
    } 

  border-radius: 40px;
  border: 1px solid white;

  &:hover {
    background-color: black;
    p {
      color: white;
    } 
  }
`