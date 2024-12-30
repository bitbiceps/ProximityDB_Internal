import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { routes, sideBarTabs } from "../../utils"; // Ensure your routes and sidebar tabs are defined in utils
import { AiOutlineClose } from "react-icons/ai";
import { TbDashboardFilled } from 'react-icons/tb';
import packageIcon from "../../assets/sidebar/package.svg";
import topicGeneratorIcon from "../../assets/sidebar/topic.svg";
import articleIcon from "../../assets/sidebar/article.svg";
import profileIcon from "../../assets/sidebar/profile.svg";
import logoutIcon from "../../assets/sidebar/logout.svg";
import logo from "../../assets/sidebar/logo.svg";
import Divider from "../common/Divider";

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // Manage mobile sidebar open/close state
    const navigate = useNavigate();
    const location = useLocation();
    const isHovered = true; // Set the hover state
    const transition = "transition-all duration-200 ease-in-out";

    // Nav items with Profile and Logout options
    const navItems1 = [
        { name: sideBarTabs.dashboard, to: routes.root, icon: TbDashboardFilled },
        { name: sideBarTabs.analytics, to: routes.analytics, img: packageIcon },
    ];
    const navItems2 = [
        { name: sideBarTabs.profile, to: routes.profile, img: profileIcon }, // Added Profile
        { name: sideBarTabs.logout, to: null, img: logoutIcon }, // Logout (no route)
    ]

    const handleNavigation = (path) => {
        setIsOpen(false); // Close the sidebar on navigation
        if (path) {
            navigate(path); // Navigate to the new path
        }
        // Handle Logout logic if applicable (e.g., clearing tokens, redirecting to login page)
        if (path === null) {
            console.log("Logging out...");
            // Perform your logout logic here (clear tokens, etc.)
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 bg-gray-800 text-white transition-transform duration-300  ${isOpen ? "-translate-x-10" : "-translate-x-full"}`}
        >
            <div className="p-4 flex justify-between items-center pl-24">
                <div className="flex items-center justify-between p-8">
                    <img className="filter brightness-0 invert" src={logo} alt="Logo" />
                </div>
                <button onClick={() => setIsOpen(false)}>
                    <AiOutlineClose size={24} />
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <div className="w-full flex flex-col justify-between">
                    <ul className="h-[65vh]">
                        {navItems1.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to || "#"} // Ensure no route issue with null paths
                                onClick={() => handleNavigation(item.to)} // Navigate on click
                                className={`${transition} flex pl-24 items-center w-full h-[60px] gap-6 ${location.pathname === item.to ? "mb-4" : ""}`}
                            >
                                <li
                                    className={`${transition} flex text-[18px] items-center p-2 ${isHovered ? "w-[75%] h-[50px]" : "w-fit h-fit"} pl-6 rounded-md ${location.pathname === item.to ? "bg-app-blue-1 text-white" : "hover:bg-gray-100 text-app-grey-1"
                                        } ${!isHovered ? "justify-center" : ""}`}
                                >
                                    {isHovered ? (
                                        <>
                                            {item.icon && <item.icon size={26} className="mr-2" />}
                                            {item.img && <img src={item.img} className={`mr-2 ${location.pathname === item.to ? "filter brightness-0 invert" : ""}`} />}
                                            <p className={`${location.pathname === item.to ? "font-semibold" : ""}`}>{item.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            {item.icon && <item.icon size={26} className="mr-2" />}
                                            {item.img && <img src={item.img} className="mr-2" />}
                                        </>
                                    )}
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                    <ul className="h-fit">
                        <div>
                            <Divider color="border-app-grey-1" />
                        </div>
                        {navItems2.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to || "#"} // Ensure no route issue with null paths
                                onClick={() => handleNavigation(item.to)} // Navigate on click
                                className={`${transition} pl-24 flex items-center w-full h-[60px] gap-6 ${location.pathname === item.to ? "mb-4" : ""}`}
                            >
                                <li
                                    className={`${transition} flex text-[18px] items-center p-2 ${isHovered ? "w-[75%] h-[50px]" : "w-fit h-fit"} pl-6 rounded-md ${location.pathname === item.to ? "bg-app-blue-1 text-white" : "hover:bg-gray-100 text-app-grey-1"
                                        } ${!isHovered ? "justify-center" : ""}`}
                                >
                                    {isHovered ? (
                                        <>
                                            {item.icon && <item.icon size={26} className="mr-2" />}
                                            {item.img && <img src={item.img} className={`mr-2 ${location.pathname === item.to ? "filter brightness-0 invert" : ""}`} />}
                                            <p className={`${location.pathname === item.to ? "font-semibold" : ""}`}>{item.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            {item.icon && <item.icon size={26} className="mr-2" />}
                                            {item.img && <img src={item.img} className="mr-2" />}
                                        </>
                                    )}
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default MobileSidebar;
