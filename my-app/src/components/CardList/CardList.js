import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  MdOutlinePerson,
  MdOutlinePerson2,
  MdOutlineMailOutline,
} from "react-icons/md";
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { CgGenderMale, CgGenderFemale } from "react-icons/cg";
import { IoIosAdd } from "react-icons/io";
// import { IoIosInformationCircleOutline } from "react-icons/io";
import Filter from "../Filter/Filter";
import { usersContext } from "../../Context/usersContext";
import { FaSearch } from "react-icons/fa";
import logo from "../Assets/logo.png";

const CardList = ({ items, manualItems, onDelete, openForm }) => {
  const { filterItems, info } = useContext(usersContext);
  const [view, setView] = useState(true);
  const [hoveredInfo, setHoveredInfo] = useState(null); // Track the hovered info (name or email)
  const [addScroll, setAddScroll] = useState(false);
  const itemsData = items.reverse();

  function capitalizeFirstLetter(string) {
    if (string && typeof string === "string") {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return string;
  }

  const filterData = (e) => {
    const filterInput = e.target.value.toLowerCase();
    filterItems(filterInput);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 90) {
      setAddScroll(true);
    } else {
      setAddScroll(false);
    }
    // console.log(window.scrollY)
  });

  return (
    <div className="flex flex-col items-center">
      <div className="z-20 bg-white fixed top-0 flex items-center justify-between  w-[100vw] p-4 md:top-0">
        <div className="flex items-center">
          <img className="w-[50px] rounded-[50%]" src={logo} alt="logo" />
        </div>

        <div className="flex items-center justify-center py-3">
          <div className="relative mx-2">
            <input
              type="text"
              onChange={filterData}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex items-center">
          {view ? (
            <IoIosAdd
              onClick={openForm}
              className={`cursor-pointer${
                addScroll
                  ? " visible h-[45px] w-[50px] bg-slate-600 text-slate-400 font-bold text-[200px] p-1 shadow-lg"
                  : " hidden"
              } text-5xl mr-3 rounded-lg hover:shadow-lg duration-200"} rounded-lg hover:shadow-lg duration-200`}
            />
          ) : (
            <IoIosAdd
              onClick={openForm}
              className="cursor-pointer visible h-[45px] w-[50px] bg-slate-600 text-slate-400 font-bold text-[200px] p-1 shadow-lg
              text-5xl mr-3 duration-200 rounded-lg hover:shadow-lg"
            />
          )}
          <p className="cursor-pointer w-[fit] text-center ml-auto border-slate-800 border rounded-md flex">
            <span
              className={`p-1 ${view ? "bg-slate-300 rounded-l-md" : " "}`}
              onClick={() => setView(true)}
            >
              <CiGrid41 className="to-black text-2xl rounded-l-md" />
            </span>
            <span
              className={`p-1 ${view ? "" : "bg-slate-300 rounded-r-md"}`}
              onClick={() => {
                setView(false);
              }}
            >
              <CiGrid2H className="to-black text-2xl" />
            </span>
          </p>
        </div>
      </div>
      <div className="z-20 fixed bottom-[0px] w-[95vw] rounded-xl p-4 justify-between bg-white flex items-center md:w-fit md:rounded-none md:p-0 md:left-4">
        <Filter/>
        <h1 className="text-sm ml-3 md:hidden">{items.length} Log items</h1>
      </div>

      <div className="flex justify-center items-center w-[100vw] h-[100]">
        <div
          className={`px-8 w-[100vw] mt-[100px] ${
            view ? "flex flex-wrap" : "grid grid-cols"
          }`}
        >
          <IoIosAdd
            className={` cursor-pointer${
              view
                ? ""
                : " hidden sticky top-[30px] ml-auto mr-[90px] z-50 h-[45px] w-[50px] bg-slate-600 text-slate-400 font-bold text-[200px] p-1 shadow-lg"
            } ${
              addScroll
                ? " hidden"
                : "text-[300px] text-slate-400 border-slate-600 h-[180px] w-[300px] mx-3 mt-3 cursor-pointer bg-slate-200 p-1 rounded-lg hover:shadow-lg duration-200"
            } rounded-lg hover:shadow-lg duration-200`}
            onClick={openForm}
          />
          {itemsData.length !== 0 ? (
            itemsData.map((eachItem) => (
              <div
                key={eachItem.id}
                className={`bg-[#e6e1d3] m-3 p-5 ${
                  view ? "h-[fit] w-[300px]" : ""
                } overflow-auto rounded-md relative group transform transition-all duration-300 ${
                  view ? "hover:scale-105 hover:z-10" : ""
                }`}
              >
                <div
                  className={`relative group p-4 rounded-lg ${
                    view ? "" : "flex items-center"
                  }`}
                >
                  <div
                    className={`${view ? "" : "flex items-center w-[100vw]"}`}
                  >
                    <h1
                      className={`flex items-center ${
                        view ? "" : "w-[20%] mr-5"
                      }`}
                    >
                      {eachItem.gender === "male" ? (
                        <MdOutlinePerson className="mr-1 text-xl w-5 h-5 flex-shrink-0" />
                      ) : (
                        <MdOutlinePerson2 className="mr-1 text-xl w-5 h-5 flex-shrink-0" />
                      )}

                      {/* Hover effect for name: Display full name when hovered */}
                      {view && eachItem.name.length >= 20 ? (
                        <span
                          className="flex items-center"
                          onMouseEnter={() =>
                            setHoveredInfo({
                              type: "name",
                              value: eachItem.name,
                            })
                          }
                          onMouseLeave={() => setHoveredInfo(null)}
                        >
                          {capitalizeFirstLetter(eachItem.name.slice(0, 20))}...
                        </span>
                      ) : (
                        capitalizeFirstLetter(eachItem.name)
                      )}

                      {/* Tooltip for name */}
                      {hoveredInfo?.type === "name" &&
                        hoveredInfo?.value === eachItem.name && (
                          <div>
                            <div className="absolute h-fit w-fit p-3 -top-3 right-[53px] bottom-[30px] bg-black text-white px-2 py-1 rounded-md text-sm z-50 text-nowrap tooltip-name">
                              {capitalizeFirstLetter(eachItem.name)}
                            </div>
                            <div className="rotate-180 absolute top-[15px] right-[100px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-transparent border-l-transparent border-r-transparent border-b-[10px] border-b-black"></div>
                          </div>
                        )}
                    </h1>

                    {/* Hover effect for email */}
                    <div
                      className={`flex items-center ${
                        view ? "" : "hidden md:flex"
                      } flex-nowrap`}
                    >
                      <MdOutlineMailOutline className="mr-1 text-xl w-5 h-5 flex-shrink-0" />
                      <div>
                        {(() => {
                          const email = eachItem.email.split("@");
                          const firstPart =
                            view && email[0].length >= 10
                              ? email[0].slice(0, 8)
                              : email[0];
                          const secPart =
                            view && email[1].length > 9
                              ? email[1].slice(0, 7) + "..."
                              : email[1];

                          return (
                            <div className="flex items-center mr-5">
                              <span
                                className=""
                                onMouseEnter={() =>
                                  setHoveredInfo({
                                    type: "email",
                                    value: eachItem.email,
                                  })
                                }
                                onMouseLeave={() => setHoveredInfo(null)}
                              >
                                {capitalizeFirstLetter(firstPart) +
                                  "@" +
                                  secPart}
                              </span>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Tooltip for email with triangle pointing to the icon */}
                      {hoveredInfo?.type === "email" &&
                        hoveredInfo?.value === eachItem.email && (
                          <div>
                            <div className="absolute z-50 h-fit w-fit p-3 top-[10px] right-1 bottom-[5px] bg-black text-white px-2 py-1 rounded-md text-sm text-nowrap tooltip-email">
                              {capitalizeFirstLetter(eachItem.email)}
                            </div>
                            <div className="rotate-180 absolute top-[35px] right-[100px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-transparent border-l-transparent border-r-transparent border-b-[10px] border-b-black"></div>
                          </div>
                        )}
                    </div>

                    {/* Gender */}
                    <p
                      className={`flex items-center ${
                        view ? "" : "w-[20%] ml-auto mr-5"
                      }`}
                    >
                      <span>
                        {eachItem.gender === "male" ? (
                          <CgGenderMale className="mr-1 text-xl w-5 h-5 flex-shrink-0" />
                        ) : (
                          <CgGenderFemale className="mr-1 text-xl w-5 h-5 flex-shrink-0" />
                        )}
                      </span>
                      {capitalizeFirstLetter(eachItem.gender)}
                    </p>

                    {/* Status */}
                    <p
                      className={`flex items-center ${
                        view ? "" : "w-[20%] mr-5"
                      }`}
                    >
                      {eachItem.status === "inactive" ? (
                        <HiOutlineExclamationCircle className="mr-1 text-xl w-5 h-5 flex-shrink-0" />
                      ) : (
                        <HiOutlineCheckCircle className="mr-1 text-xl w-5 h-5 flex-shrink-0" />
                      )}
                      {capitalizeFirstLetter(eachItem.status)}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <RiDeleteBinLine
                      className="cursor-pointer absolute right-2 bottom-2 w-6 h-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => onDelete(eachItem.id)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-[80vh] w-[100vw] flex items-center justify-center">
              <p>{info !== "" ? info : "Loading..."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardList;
