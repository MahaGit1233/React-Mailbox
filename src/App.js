import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mailbox from "./components/Pages/Mailbox";
import Signup from "./components/Register/Signup";
import Mails from "./components/Pages/Mails";
import Sent from "./components/Pages/Sent";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact >{isLoggedIn ? <Mailbox /> : <Signup />}</Route>
        <Route path="/mails" exact component={Mails} />
        <Route path="/sent" component={Sent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
