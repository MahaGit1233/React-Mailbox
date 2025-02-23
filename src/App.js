import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Mailbox from "./components/Pages/Mailbox";
import Signup from "./components/Register/Signup";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact >{isLoggedIn ? <Mailbox /> : <Signup />}</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
