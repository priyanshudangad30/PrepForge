import React, { useState } from "react";

function Signup() {
    const [name, setName] = useState(" ");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await res.json();
            console.log(data);

            setName("");
            setEmail("");
            setPassword("");


        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="flex justify-center align-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

                <label className="mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded mb-3"
                />

                <label className="mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Signup
                </button>
            </form>

        </div>
    )
}

export default Signup;