// import React, { useState } from 'react'
// import searchIcon from "../../assets/common/search.svg"
// import avatar from "../../assets/header/avatar.svg"
// import Notifications from './Notifications'
// import UserAvatar from './UserAvatar'
// import Dropdown from './Dropdown'
// import spainish from "../../assets/lang_flags/spanish.svg"
// import uk from "../../assets/lang_flags/uk.svg"
// import french from "../../assets/lang_flags/french.svg"

// const Header = () => {
//     const [search, setSearch] = useState("")
//     const langOptions = [
//         { name: "Spanish", flag: spainish },
//         { name: "French", flag: french },
//         { name: "English", flag: uk },
//     ];
//     const [selected, setSelected] = useState(langOptions[0])


//     const handleCountrySelect = (country) => {
//         console.log("Selected Country:", country.name);
//     };
//     return (
//         <div className='w-full h-[100px] bg-white shadow-custom flex items-center px-12  justify-between'>
//             <div className='flex items-center w-fit h-[50px] bg-app-grey-2  rounded-full overflow-hidden px-8 gap-4 border border-app-grey-3'>
//                 <img src={searchIcon} alt="Search" />
//                 <input placeholder='Search' value={search} className='bg-transparent h-[80%] outline-none border-none w-[346px]' onChange={e => setSearch(e.target.value)} type="text" name="" id="" />
//             </div>
//             <div className='flex items-center gap-12'>
//                 {/* Notifications */}
//                 <Notifications />
//                 {/* User */}
//                 <UserAvatar user={{ name: "Sana Ray", role: "Admin", avatar }} />
//                 {/* <Dropdown label="Select Language" onSelect={handleCountrySelect} options={langOptions} selected={selected} /> */}
//             </div>
//         </div>
//     )
// }

// export default Header
import React, { useState } from 'react'
import searchIcon from "../../assets/common/search.svg"
import avatar from "../../assets/header/avatar.svg"
import Notifications from './Notifications'
import UserAvatar from './UserAvatar'
import Dropdown from './Dropdown'
import spainish from "../../assets/lang_flags/spanish.svg"
import uk from "../../assets/lang_flags/uk.svg"
import french from "../../assets/lang_flags/french.svg"

const Header = () => {
    const [search, setSearch] = useState("")
    const langOptions = [
        { name: "Spanish", flag: spainish },
        { name: "French", flag: french },
        { name: "English", flag: uk },
    ];
    const [selected, setSelected] = useState(langOptions[0])


    const handleCountrySelect = (country) => {
        console.log("Selected Country:", country.name);
    };
    return (
        <div className='w-full h-[100px] bg-white shadow-custom flex items-center px-12  justify-between'>
            <div className='flex items-center w-fit h-[50px] bg-app-grey-2  rounded-full overflow-hidden px-8 gap-4 border border-app-grey-3'>
                <img src={searchIcon} alt="Search" />
                <input placeholder='Search' value={search} className='bg-transparent h-[80%] outline-none border-none w-[346px]' onChange={e => setSearch(e.target.value)} type="text" name="" id="" />
            </div>
            <div className='flex items-center gap-12'>
                {/* Notifications */}
                <Notifications />
                {/* User */}
                <UserAvatar user={{ name: "Sana Ray", role: "Admin", avatar }} />
                {/* <Dropdown label="Select Language" onSelect={handleCountrySelect} options={langOptions} selected={selected} /> */}
            </div>
        </div>
    )
}

export default Header