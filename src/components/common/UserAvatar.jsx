// import React from 'react'
// import { CiCircleChevDown } from "react-icons/ci";


// const UserAvatar = ({ user }) => {
//     return (
//         <div className='flex items-center justify-center w-fit h-fit gap-2'>
//             <div className='rounded-full overflow-hidden'>
//                 <img src={user.avatar} alt="Aatar" />
//             </div>
//             <div>
//                 <p className='text-[16px] font-semibold'>{user.name}</p>
//                 <p className='text-[14px]'>{user.role}</p>
//             </div>
//             <CiCircleChevDown className='text-xl text-app-grey-4 ml-2' />
//         </div>
//     )
// }

// export default UserAvatar

import React from 'react'
import { CiCircleChevDown } from "react-icons/ci";


const UserAvatar = ({ user }) => {
    return (
        <div className='flex items-center justify-center w-fit h-fit gap-2'>
            <div className='rounded-full overflow-hidden'>
                <img src={user.avatar} alt="Aatar" />
            </div>
            <div>
                <p className='text-[16px] font-semibold'>{user.name}</p>
                <p className='text-[14px]'>{user.role}</p>
            </div>
            <CiCircleChevDown className='text-xl text-app-grey-4 ml-2' />
        </div>
    )
}

export default UserAvatar