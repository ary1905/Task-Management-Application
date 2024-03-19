import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Activate from './containers/Activate';
import ResetPass from './containers/ResetPass';
import ResetPassConfirm from './containers/ResetPassConfirm';
import Layout from './hocs/Layout'
import { Provider } from "react-redux";
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/reset-password" element={<ResetPass></ResetPass>}></Route>
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassConfirm></ResetPassConfirm>}></Route>
            <Route path="/activate/:uid/:token" element={<Activate></Activate>}></Route>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}


export default App;
