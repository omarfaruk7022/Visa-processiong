import { Route, Routes } from "react-router-dom";
import "./App.css";
import Companies from "./Components/Pages/Dashboard/Companies";
import CompanyStatus from "./Components/Pages/Dashboard/CompanyStatus";
import Completed from "./Components/Pages/Dashboard/Completed";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import DashboardHome from "./Components/Pages/Dashboard/DashboardHome";
import PriceFixed from "./Components/Pages/Dashboard/PriceFixed";
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

        <Route path="companyStatus/:id" element={<CompanyStatus />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <RequireAuth>
                <DashboardHome />
              </RequireAuth>
            }
          />
          <Route
            path="companies"
            element={
              <RequireAuth>
                <Companies />
              </RequireAuth>
            }
          />
          <Route
            path="completed"
            element={
              <RequireAuth>
                <Completed />
              </RequireAuth>
            }
          />
          <Route
            path="fixed"
            element={
              <RequireAuth>
                <PriceFixed />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
