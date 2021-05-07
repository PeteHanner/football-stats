import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import StatsTable from './components/StatsTable/StatsTable';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Header/>
          <StatsTable />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
