import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "./pages/HomePage";
import requestPage from "./pages/Request"
import AdminPage from "./pages/adminPage";
import hostpage from "./pages/hostpage";
import AddUser from "./pages/adduser";
import financeTeam from "./pages/finaceTeam";
import MyHome from "./pages/home";
import RequestDetail from "./pages/RequestDetails";
import Host from "./pages/host";
import ITToolsList from "./pages/Ittools";
import Policies from "./pages/privacypolicy/Privacy&Policy"
import Employeelist from "./pages/Employeedirectory/employeelist";
import Callendar from "./pages/CallenderModule/Callender"
import policy from "./pages/privacypolicy/policy"

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/request" component={requestPage} exact />
      <Route path="/admin" component={AdminPage} exact />
      <Route path="/hostpage" component={hostpage} exact />
      <Route path="/adduser" component={AddUser} exact />
      <Route path="/Financeteam" component={financeTeam} exact />
      <Route path="/home" component={MyHome} exact />
      <Route path="/host" component={Host} exact />
      <Route path="/employees" component={Employeelist} exact />
      <Route path="/policies" component={Policies} exact />
      <Route path="/it-tools" component={ITToolsList} exact />
      <Route path="/policy" component={policy} exact />
      <Route path="/callender" component={Callendar} exact />
      <Route path="/request/:requestId" component={RequestDetail} exact />
    </div>
  );
}

export default App;
