import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import DashboardHome from "./Components/Pages/Dashboard/DashboardHome";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Navbar from "./Components/Pages/Navbar";
import RequireAuth from "./Components/Pages/RequireAuth";
import Signup from "./Components/Pages/Signup";

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<DashboardHome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
