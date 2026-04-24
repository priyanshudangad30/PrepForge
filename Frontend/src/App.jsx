import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import ProblemList from "./components/problems/ProblemList";
import ProblemDetail from "./components/problems/ProblemDetail";
import Progress from "./components/progress/Progress";
import Revision from "./components/revision/Revision";
import Profile from "./components/profile/Profile";
import Streak from "./components/streak/Streak";
import Landing from "./components/home/Landing";

function App() {
  const { user } = useAuth();
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "12px",
            padding: "12px 16px",
          },
        }}
      />
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <Landing />} 
        />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problems/:slug" element={<ProblemDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/streak" element={<Streak />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                <p className="text-slate-500 mb-4">Page not found</p>
                <a href="/" className="text-blue-600 hover:underline text-sm font-medium">
                  Go home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
