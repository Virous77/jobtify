import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Landing,
  Register,
  Error,
  Profile,
  AddJob,
  AllJobs,
  SharedLayout,
  Stats,
} from "./pages/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <section className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer
        style={{
          marginTop: "1rem",
          fontSize: "1rem",
        }}
        position="top-center"
      />
    </section>
  );
}

export default App;
