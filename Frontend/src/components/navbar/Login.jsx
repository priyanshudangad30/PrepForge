import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }
  return (
    <div className="flex justify-center items-center h-screen bg-amber-50">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <label className="mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded mb-3"
        />

        <label className="mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded mb-4"
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>

    </div>
  );
}

export default Login;