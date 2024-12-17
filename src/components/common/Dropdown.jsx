import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ options, selected, onSelect, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleOptionSelect = (country) => {
        onSelect(country); // Notify parent component
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeDropdown);
        return () => document.removeEventListener("mousedown", closeDropdown);
    }, []);


    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="text-black bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
            >
                {selected ? (
                    <div className="flex items-center gap-2">
                        <img alt="Seleced Flag" src={selected.flag} className="w-5 object-contain" />
                        {selected.name}
                    </div>
                ) : (
                    { label }
                )}
                <svg
                    className={`w-2.5 h-2.5 ms-3 transition-transform ${isOpen ? "rotate-0" : "rotate-90"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700">
                        {options.map((country, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleOptionSelect(country)}
                                    className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                >
                                    <img src={country.flag} className="w-5  object-contain" alt="Language Country" />
                                    {country.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
