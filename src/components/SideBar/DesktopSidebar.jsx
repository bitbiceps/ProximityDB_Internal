// export default DesktopSidebar;
import React, { useState } from 'react';
import logo from "../../assets/sidebar/logo.svg";
import { NavLink } from 'react-router-dom';
import { routes, sideBarTabs } from '../../utils';
import { TbDashboardFilled } from 'react-icons/tb';
import packageIcon from "../../assets/sidebar/package.svg"
import profileIcon from "../../assets/sidebar/profile.svg"
import logoutIcon from "../../assets/sidebar/logout.svg"
import Divider from '../common/Divider';

const DesktopSidebar = () => {
    const [active, setActive] = useState(sideBarTabs.dashboard); // Track the active state of the sidebar
    const isHovered = true
    const transition = "transition-all duration-200 ease-in-out"


    const navItems1 = [
        { name: sideBarTabs.dashboard, to: routes.root, icon: TbDashboardFilled },
        { name: sideBarTabs.analytics, to: routes.analytics, img: packageIcon },
    ]

    const navItems2 = [
        { name: sideBarTabs.profile, to: routes.profile, img: profileIcon },
        { name: sideBarTabs.logout, img: logoutIcon },
    ]


    return (
        <div
            className={`flex flex-col h-screen bg-white text-white transition-width duration-300 sidebar-shadow ${isHovered ? 'w-72' : 'w-24'} sticky top-0 left-0`}
        >
            <div className="flex items-center justify-between px-2 py-8 lg:p-8 ">
                <img src={logo} alt="Logo" />
            </div>
            <nav className="flex-1 overflow-y-auto">
                <div className='flex flex-col justify-between h-full'>
                    <ul className='h-fit'>
                        {navItems1.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                onClick={() => setActive(item.name)} // Set active on click
                                className={`${transition} flex items-center w-full h-[60px] gap-6 ${active == item.name && "mb-4"}`}
                            >
                                <div className={`${transition} ${active == item.name ? "bg-app-blue-1" : "bg-white"} ${isHovered ? "h-full" : "h-full"} w-[4px] rounded-r-lg`} />
                                <li
                                    className={`${transition} flex text-[18px] items-center p-2 ${isHovered ? "w-[75%] h-[55px]" : "w-fit h-fit"} pl-6  rounded-lg ${active == item.name ? 'bg-app-blue-1 text-white' : 'hover:bg-gray-100 text-app-grey-1'} ${!isHovered ? 'justify-center' : ''}`}
                                >
                                    {isHovered ? (
                                        <>
                                            {item.icon && <item.icon size={26} className="mr-2" />}
                                            {item.img && <img src={item.img} className={`mr-2 ${active === item.name && "filter brightness-0 invert"}`} />}
                                            <p className={`${active == item.name && "font-semibold"}`}>
                                                {item.name}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            {item.icon && <item.icon size={26} />}
                                            {item.img && <img src={item.img} size={26} className={`${active === item.name && "filter brightness-0 invert"}`} />}
                                        </>
                                    )}
                                </li>
                            </NavLink>
                        ))}
                    </ul>

                    <ul className='h-fit mb-12'>
                        <Divider className={"mb-4"} />
                        {navItems2.map((item) => (
                            <>
                                {item.to ? (
                                    <NavLink
                                        key={item.name}
                                        to={item.to}
                                        onClick={() => setActive(item.name)} // Set active on click
                                        className={`${transition} flex items-center w-full h-[60px] gap-6 ${active == item.name && "mb-4"}`}
                                    >
                                        <div className={`${transition} ${active == item.name ? "bg-app-blue-1" : "bg-white"} ${isHovered ? "h-full" : "h-full"} w-[4px] rounded-r-lg`} />
                                        <li
                                            className={`${transition} flex text-[18px] items-center p-2 ${isHovered ? "w-[75%] h-[55px]" : "w-fit h-fit"} pl-6  rounded-lg ${active == item.name ? 'bg-app-blue-1 text-white' : 'hover:bg-gray-100 text-app-grey-1'} ${!isHovered ? 'justify-center' : ''}`}
                                        >
                                            {isHovered ? (
                                                <>
                                                    {item.icon && <item.icon size={26} className="mr-2" />}
                                                    {item.img && <img src={item.img} className={`mr-2 ${active === item.name && "filter brightness-0 invert"}`} />}
                                                    <p className={`${active == item.name && "font-semibold"}`}>
                                                        {item.name}
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    {item.icon && <item.icon size={26} />}
                                                    {item.img && <img src={item.img} size={26} className={`${active === item.name && "filter brightness-0 invert"}`} />}
                                                </>
                                            )}
                                        </li>
                                    </NavLink>
                                ) : (
                                    <div
                                        key={item.name}
                                        onClick={() => setActive(item.name)} // Set active on click
                                        className={`${transition} cursor-pointer flex items-center w-full h-[60px] gap-6 ${active == item.name && "mb-4"}`}
                                    >
                                        <div className={`${transition} ${active == item.name ? "bg-app-blue-1" : "bg-white"} ${isHovered ? "h-full" : "h-full"} w-[4px] rounded-r-lg`} />
                                        <li
                                            className={`${transition} flex text-[18px] items-center p-2 ${isHovered ? "w-[75%] h-[55px]" : "w-fit h-fit"} pl-6  rounded-lg ${active == item.name ? 'bg-app-blue-1 text-white' : 'hover:bg-gray-100 text-app-grey-1'} ${!isHovered ? 'justify-center' : ''}`}
                                        >
                                            {isHovered ? (
                                                <>
                                                    {item.icon && <item.icon size={26} className="mr-2" />}
                                                    {item.img && <img src={item.img} className={`mr-2 ${active === item.name && "filter brightness-0 invert"}`} />}
                                                    <p className={`${active == item.name && "font-semibold"}`}>
                                                        {item.name}
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    {item.icon && <item.icon size={26} />}
                                                    {item.img && <img src={item.img} size={26} className={`${active === item.name && "filter brightness-0 invert"}`} />}
                                                </>
                                            )}
                                        </li>
                                    </div>
                                )}
                            </>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default DesktopSidebar;
