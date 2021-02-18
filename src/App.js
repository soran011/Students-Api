import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router exact path="/home">
      <Switch>
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
