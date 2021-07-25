import Navbar from './Component/Navbar';
import Mainbody from './Component/Mainbody'
import Page from './Component/Page';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/Classroom-Clone/" component={Mainbody} />
          <Route exact path="/Classroom-Clone/page" component={Page} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
