// import React from "react";
// import DesktopSidebar from "./DesktopSidebar";
// import MobileSidebar from "./MobileSidebar";

// const Sidebar = () => {
//     return (
//         <div className="relative h-screen w-fit shadow-custom">
//             {/* Desktop Sidebar */}
//             <div className="hidden md:block overflow-hidden">
//                 <DesktopSidebar />
//             </div>

//             {/* Mobile Sidebar */}
//             <div className="md:hidden">
//                 <MobileSidebar />
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

const Sidebar = () => {
    return (
        <div className="relative h-screen w-fit shadow-custom">
            {/* Desktop Sidebar */}
            <div className="hidden md:block overflow-hidden">
                <DesktopSidebar />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                <MobileSidebar />
            </div>
        </div>
    );
};

export default Sidebar;
