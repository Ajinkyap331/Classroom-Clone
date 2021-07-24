import React from "react";
import "./Navbar.css";
import ReorderIcon from "@material-ui/icons/Reorder";
import AddIcon from "@material-ui/icons/Add";
import AppsIcon from "@material-ui/icons/Apps";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

export default class Navbar extends React.Component {
  render() {
    function slidebar() {
      document.getElementById("mySidenav").style.width = "20%";
    }
    function rslidebar() {
      document.getElementById("mySidenav").style.width = "0rem";
    }
    return (
      <div className="navbar">
        <div id="mySidenav" className="sidenav">
          <ClearOutlinedIcon
            onClick={rslidebar}
            style={{ float: "right", padding: "0.5rem", cursor: "pointer" }}
          />
          <p>
            <HomeOutlinedIcon style={{ fontSize: "1.5rem" }} />
            <section>Classes</section>
          </p>
          <p style={{ marginTop: "0.1rem" }}>
            <CalendarTodayOutlinedIcon style={{ fontSize: "1.5rem" }} />
            <section>Calender</section>
          </p>
          <h5>
            Enrolled
          </h5>
          <section>
            Division M
          </section>
        </div>
        <ReorderIcon id="slide-bar" onClick={slidebar} />
        <img
          id="navbar-img"
          src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
          alt=""
        />
        <section style={{ marginTop: "0.25rem" }}>Classroom</section>
        <div id="navbar-right">
          <article>
            <AddIcon />
          </article>
          <article>
            <AppsIcon />
          </article>
          <img
            class="logo"
            src="https://www.promarinetrade.com/cache/promarine/public/shop_product_picture/_1200x800x0/4602_A.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }
}
