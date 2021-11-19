import Navbar from './Component/Navbar';
import { Mainbody } from './Component/Mainbody'
import { Login } from './Component/Login';
import './App.css';
import { Join } from './Component/Join'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Create } from './Component/Create';
import { Room } from './Component/Room';
import firebase from 'firebase'
import { useDispatch} from 'react-redux'
import { _login, _logout, _Data } from './REDUX/Actions/index'

function App() {

  const dispatch = useDispatch()
  // const log = useSelector(state => state.Log)
  // let logged_ = false;
  const getdata = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch((_Data(user)))
        dispatch(_login())
      }
      else {
        dispatch(_logout())
      }
    })
    // let email = localStorage.getItem("email")
    // if (!email) return
    // let displayName = localStorage.getItem("name")
    // let photoURL = localStorage.getItem("photoURL")
    // displayName = displayName.replace(/"/g, "");
    // photoURL = photoURL.replace(/"/g, "");
    // logged_ = { email, displayName, photoURL }
  }


  getdata()



  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/" >
            <Navbar/>
            <Mainbody/>
          </Route>
          <Route exact path="/join">
            <Join/>
          </Route>
          <Route exact path="/create">
            <Create/>
          </Route>
          <Route
            exact
            path="/join/:code"
            render={(props) => <Join {...props}/>}
          />
          <Route
            exact
            path="/room/:code"
            render={(props) => <Room {...props}/>}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;


