import Navbar from './Component/Navbar';
import { Mainbody } from './Component/Mainbody'
import { Login } from './Component/Login';
import './App.css';
import { Join } from './Component/Join'
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Create } from './Component/Create';
import { Room } from './Component/Room';


function App() {



  let logged_ = false;
  const getdata = async () => {
    let email = localStorage.getItem("email")
    if (!email) return
    let displayName = localStorage.getItem("name")
    let photoURL = localStorage.getItem("photoURL")
    displayName = displayName.replace(/"/g, "");
    photoURL = photoURL.replace(/"/g, "");
    logged_ = { email, displayName, photoURL }
  }


  getdata()



  const [logged, setlogged] = useState(logged_)


  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login _logged={(data) => setlogged(data)} />
          </Route>
          <Route exact path="/" >
            <Navbar _logged={() => setlogged(false)} logged={logged} />
            <Mainbody logged={logged} />
          </Route>
          <Route exact path="/join">
            <Join logged={logged} />
          </Route>
          <Route exact path="/create">
            <Create logged={logged} />
          </Route>
          <Route
            exact
            path="/join/:code"
            render={(props) => <Join {...props} logged={logged} />}
          />
          <Route
            exact
            path="/room/:code"
            render={(props) => <Room {...props} logged={logged} />}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;


