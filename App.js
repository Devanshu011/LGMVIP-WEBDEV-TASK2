import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./loader";
import logoLGM from "./logo.png";

const App = () => {
  const [userCardData, setUserCardData] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const allData = async () => {
    if (visibility) {
      const response = await axios.get("https://reqres.in/api/users?page=1 ");
      const delay = 2000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      setUserCardData(response.data.data);
    }
    setLoading(false);
  };

  const display = () => {
    setVisibility(true);
    setLoading(true);
  }
  useEffect(() => {
    if (visibility) {
      allData();
    } // eslint-disable-next-line
  }, [loading]);

  const renderUserCard = (user) => {
    if (loading) {
      return Loader;
    }
    else {
      return (
        <div className="userCard div text-center">
          <img
            src={user.avatar}
            alt=""
            className="round-img"
            style={{ width: "150px" , height:"200px" }}
          />
          <h3>User ID : {user.id}</h3>
          <h3>User Name : {user.first_name} {user.last_name}</h3>
          <h3>E-Mail : {user.email}</h3>
        </div>
      );
    }
  };
  return (
    <div className="App">
      <nav className="navbar" style={{ backgroundColor: "black" }}>
        <img src={logoLGM} alt="" style={{ height: "80px", width: "200px" }} />
      
        <div class="container"
          onClick={display}
        >
          <span>Get Users</span>
        </div>
      </nav>

      {loading ? <Loader /> : null}
      <div className="userCardContainer" style={userStyle}>
        {loading ? null : userCardData.map(renderUserCard)}
      </div>
    </div>
  );
};

const userStyle = {
  display:"grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "4rem",
  marginBottom: "40px",
};

export default App;
Footer
