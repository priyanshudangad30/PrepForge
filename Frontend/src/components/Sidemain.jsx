import React from "react";

function Sidemain() {
    return (
         <div className="h-screen flex justify-start">
            <div className="bg-[#111827] p-4">
                <button className="block text-white mb-8">Home</button>
                <button className="block text-white mb-8">Problems</button>
                <button className="block text-white mb-8">Progress</button>
                <button className="block text-white mb-8">Revision</button>
            </div>
        </div>
    );
}

export default Sidemain;