 import React from "react";
 import { FaRegUserCircle,FaFire } from "react-icons/fa";
 import { IoIosNotifications } from "react-icons/io";
 import { Link } from "react-router-dom";

 function Nav(){
    return(
        <div className="flex flex-col justify-between">
            <div className="flex h-10vh w-screen w-400px">
                <FaFire />
                <Link to="/signup"> <FaRegUserCircle className="cursor-pointer"/></Link>
                <IoIosNotifications />
            </div>
        </div>
    )
 };

 export default Nav;