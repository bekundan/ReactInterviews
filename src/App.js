import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
//https://randomuser.me/api

interface UserName {
  first: string;
  last: string;
  title: string;
}
interface UserInfo {
  name: UserName;
  picture: UserPicture;
}
interface UserPicture {
  thumbnail: string;
}

const fetchRandomData = () => {
  return axios
    .get("https://randomuser.me/api")
    .then(({ data }) => {
      // handle success
      console.log(data);
      // return JSON.stringify(data, null, 2);
      return data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const getFullUserName = (userInfo: UserInfo) => {
  const {
    name: { first, last }
  } = userInfo;
  return `${first} ${last};`;
};

export default function App() {
  const [number, setNumber] = useState(0);
  const [userInfo, setuserInfo] = useState([]);
  const [usrJsonData, setusrJsonData] = useState("");
  function handleCLick() {
    return setNumber(number + 1);
  }
  useEffect(() => {
    fetchRandomData().then((randomUser) => {
      setusrJsonData(JSON.stringify(randomUser, null, 2) || "no user found");
      setuserInfo(randomUser.results);
    });
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{number} </p>
      {/* <p>{usrJsonData}</p> */}

      {userInfo.map((userInfo: UserName, idx: number) => (
        <div key={idx}>
          <p>{getFullUserName(userInfo)} </p>
          <img src={userInfo.picture.thumbnail} />
        </div>
      ))}
      <pre>{usrJsonData}</pre>
      <button onClick={handleCLick}>Increase Counter </button>
      <button onClick={fetchRandomData}>Fetch random Data </button>
    </div>
  );
}
