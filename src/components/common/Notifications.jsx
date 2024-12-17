// import React from 'react'
// import bellIcon from "../../assets/header/bell.svg"


// const Notifications = () => {
//     return (
//         <div className="relative inline-block">
//             <img src={bellIcon} alt="Notification Bell" className="w-8 h-8" />
//             <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                 6 {/* Replace with dynamic notification count */}
//             </div>
//         </div>
//     )
// }

// export default Notifications
import React from 'react'
import bellIcon from "../../assets/header/bell.svg"


const Notifications = () => {
    return (
        <div className="relative inline-block">
            <img src={bellIcon} alt="Notification Bell" className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                6 {/* Replace with dynamic notification count */}
            </div>
        </div>
    )
}

export default Notifications