/* eslint-disable react/prop-types */
import { useState } from "react";

export default function CustomSelect1({ setSelectedLang, text }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "English 🇺🇲 انگلیسی", value: "en" },
    { label: "German 🇩🇪 آلمانی", value: "de" },
    { label: "French 🇲🇫 فرانسوی", value: "fr" },
    { label: "Persian 🇮🇷 فارسی", value: "fa" },
    { label: "Arabic 🇸🇦 عربی", value: "ar-sa" },
    { label: "Chinese 🇨🇳 چینی", value: "zh-hk" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedLang(option.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full">
      <div
        className="p-2 bg-white rounded cursor-pointer border-2 border-slate-200"
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-600 font-semibold">
            {selectedOption.label || text}
          </span>
          <span className="text-xl text-gray-500 font-semibold">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-chevron-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            )}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 p-2 bg-white rounded border-2 border-slate-200">
          <ul className="flex flex-col gap-2">
            {options.map((option, index) => (
              <li
                key={index}
                className="text-gray-600 font-semibold text-base rounded hover:bg-slate-100 transition p-1 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
