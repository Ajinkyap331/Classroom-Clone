import React from "react";
import "./Mainbody.css";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PermContactCalendarOutlinedIcon from "@material-ui/icons/PermContactCalendarOutlined";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";

export default class Mainbody extends React.Component {
  render() {
    function dropdown(id) {
      if (document.getElementById(id).style.padding === "0.5rem") {
        document.getElementById(id).style.padding = "0";
        document.getElementById(id).style.width = "0";
        document.getElementById(id).style.fontSize = "0";
        document.getElementById(id).style.border = "none";
      } else {
        document.getElementById(id).style.padding = "0.5rem";
        document.getElementById(id).style.width = "auto";
        document.getElementById(id).style.fontSize = "1rem";
        document.getElementById(id).style.border = "0.1rem solid gray";
      }
    }
    return (
      <>
        <div className="todo-cal">
          <ListAltOutlinedIcon id="todo" />
          <section>To-Do</section>
          <CalendarTodayIcon />
          <section>Calender</section>
        </div>
        <div className="cards">
          <article></article>
          <section>
            <div className="card">
              <PersonRoundedIcon id="person" />
              <article style={{ backgroundColor: "aqua" }}>
                <div id="dropdown1">
                  <h4>Move</h4>
                  <h4>Unenroll</h4>
                </div>
                <MoreVertRoundedIcon
                  id="dot"
                  onClick={() => dropdown("dropdown1")}
                />
                <h2>Engineering Mechnics</h2>
                <h5>Divison M</h5>
                <h4>Ganesh Tarte</h4>
              </article>
              <div></div>
              <footer>
                <section>
                  <PermContactCalendarOutlinedIcon />
                  <FolderOpenOutlinedIcon />
                </section>
              </footer>
            </div>
            <div className="card">
              <PersonRoundedIcon id="person" />
              <article style={{ backgroundColor: "green" }}>
                <div id="dropdown2">
                  <h4>Move</h4>
                  <h4>Unenroll</h4>
                </div>
                <MoreVertRoundedIcon
                  id="dot"
                  onClick={() => dropdown("dropdown2")}
                />
                <h2>Engineering Mechnics</h2>
                <h5>Divison M</h5>
                <h4>Ganesh Tarte</h4>
              </article>
              <div></div>
              <footer>
                <section>
                  <PermContactCalendarOutlinedIcon />
                  <FolderOpenOutlinedIcon />
                </section>
              </footer>
            </div>
            <div className="card">
              <PersonRoundedIcon id="person" />
              <article style={{ backgroundColor: "orange" }}>
                <div id="dropdown3">
                  <h4>Move</h4>
                  <h4>Unenroll</h4>
                </div>
                <MoreVertRoundedIcon
                  id="dot"
                  onClick={() => dropdown("dropdown3")}
                />
                <h2>Engineering Mechnics</h2>
                <h5>Divison M</h5>
                <h4>Ganesh Tarte</h4>
              </article>
              <div></div>
              <footer>
                <section>
                  <PermContactCalendarOutlinedIcon />
                  <FolderOpenOutlinedIcon />
                </section>
              </footer>
            </div>
            <div className="card">
              <PersonRoundedIcon id="person" />
              <article style={{ backgroundColor: "blue" }}>
                <MoreVertRoundedIcon id="dot" />
                <h2>Engineering Mechnics</h2>
                <h5>Divison M</h5>
                <h4>Ganesh Tarte</h4>
              </article>
              <div></div>
              <footer>
                <section>
                  <PermContactCalendarOutlinedIcon />
                  <FolderOpenOutlinedIcon />
                </section>
              </footer>
            </div>
          </section>
        </div>
        <div className="cards">
          <article></article>
          <section>
            <div className="card">
              <PersonRoundedIcon id="person" />
              <article style={{ backgroundColor: "aqua" }}>
                <MoreVertRoundedIcon id="dot" />
                <h2>Engineering Mechnics</h2>
                <h5>Divison M</h5>
                <h4>Ganesh Tarte</h4>
              </article>
              <div></div>
              <footer>
                <section>
                  <PermContactCalendarOutlinedIcon />
                  <FolderOpenOutlinedIcon />
                </section>
              </footer>
            </div>
            <div className="card">
              <PersonRoundedIcon id="person" />
              <article style={{ backgroundColor: "green" }}>
                <MoreVertRoundedIcon id="dot" />
                <h2>Engineering Mechnics</h2>
                <h5>Divison M</h5>
                <h4>Ganesh Tarte</h4>
              </article>
              <div></div>
              <footer>
                <section>
                  <PermContactCalendarOutlinedIcon />
                  <FolderOpenOutlinedIcon />
                </section>
              </footer>
            </div>
            <div className="card">
              <PersonRoundedIcon id="person" />
              <article style={{ backgroundColor: "orange" }}>
                <MoreVertRoundedIcon id="dot" />
                <h2>Engineering Mechnics</h2>
                <h5>Divison M</h5>
                <h4>Ganesh Tarte</h4>
              </article>
              <div></div>
              <footer>
                <section>
                  <PermContactCalendarOutlinedIcon />
                  <FolderOpenOutlinedIcon />
                </section>
              </footer>
            </div>
            <div className="card">
              <PersonRoundedIcon id="person" />
              <article style={{ backgroundColor: "blue" }}>
                <MoreVertRoundedIcon id="dot" />
                <h2>Engineering Mechnics</h2>
                <h5>Divison M</h5>
                <h4>Ganesh Tarte</h4>
              </article>
              <div></div>
              <footer>
                <section>
                  <PermContactCalendarOutlinedIcon />
                  <FolderOpenOutlinedIcon />
                </section>
              </footer>
            </div>
          </section>
        </div>
      </>
    );
  }
}
