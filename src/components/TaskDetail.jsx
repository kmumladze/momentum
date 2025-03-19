import { useEffect, useState } from "react";
import Navbar from "./Navbar";

import StatusIcon from "../assets/StatusIcon.jsx";
import UserIcon from "../assets/UserIcon.jsx";
import CalendarIcon from "../assets/CalendarIcon.jsx";
import { useParams } from "react-router";
import High from "../assets/high.jsx";
import Low from "../assets/low.jsx";
import Medium from "../assets/medium.jsx";

const TOKEN = import.meta.env.VITE_API_TOKEN;

const PRIORITY_ICON_MAP = {
  დაბალი: <Low />,
  მაღალი: <High />,
  საშუალო: <Medium />,
};

function formatDate(dateString) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("ka-GE", options);
}

export default function TaskDetail() {
  const { id } = useParams();

  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        const resData = await response.json();
        console.log(resData);

        setTasks(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchTasks();
  }, [id]);
  console.log(tasks);

  if (!tasks) return <p>loading...</p>;

  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-col gap-[26px] w-[715px] h-[239px]">
          <div className="flex gap-[12px]">
            <p
              className={`flex items-center gap-[4px] border-2 py-[4px] px-[5px] rounded-[4px] ${
                tasks.priority.name === "დაბალი"
                  ? "text-[#08A508] border-[#08A508]"
                  : tasks.priority.name === "საშუალო"
                  ? "text-[#FFBE0B] border-[#FFBE0B]"
                  : tasks.priority.name === "მაღალი"
                  ? "text-[#FA4D4D] border-[#FA4D4D]"
                  : "text-gray-600 border-gray-600"
              }`}
            >
              {PRIORITY_ICON_MAP[tasks.priority.name]}
              {tasks.priority.name}
            </p>

            <p className="max-w-[100px] whitespace-nowrap text-ellipsis overflow-hidden bg-[#FF66A8] text-white py-[5px] px-[9px] rounded-[15px] text-[12px]">
              {tasks.department.name}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-[600] text-[#212529] text-[34px]">
              {tasks.name}
            </p>
            <p className="text-[18px]">{tasks.description}</p>
          </div>
        </div>

        {/* <div className="w-[493px] flex flex-col gap-[16px]">
          <h1 className="text-[24px] font-medium text-[#2A2A2A]">
            დავალების დეტალები
          </h1>

          <div className="flex items-center gap-[12px]">
            <StatusIcon />
            <span>სტატუსი</span>
            <button className="border border-[#CED4DA] rounded-[5px] px-[12px] py-[6px] text-[#0D0F10]">
              {tasks.status.name}
            </button>
          </div>

          <div className="flex items-center gap-[12px]">
            <UserIcon />
            <span>თანამშრომელი</span>
            <div className="flex items-center gap-[10px]">
              <img
                className="w-[32px] h-[32px] rounded-full object-cover"
                src={tasks.employee.avatar}
                alt=""
              />
              <div className="flex flex-col">
                <p className="text-[#979797] text-[10px] leading-[12px]">
                  {tasks.department.name}
                </p>
                <p className="text-[#0D0F10] text-[14px] font-medium">
                  {tasks.employee.name}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[12px]">
            <CalendarIcon />
            <span>დავალების ვადა</span>
            <p className="text-[#0D0F10] text-[14px] font-medium">
              {formatDate(tasks.due_date)}
            </p>
          </div>
        </div> */}

        <div className="w-[493px] flex flex-col gap-[16px]">
          <h1 className="text-[24px] font-[600] text-[#2A2A2A]">
            დავალების დეტალები
          </h1>

          <div className="flex gap-[70px] w-[493px] h-[277px]">
            <div className="flex flex-col gap-[18px]">
              <div className="flex gap-2 items-center">
                <StatusIcon />
                <span className="text-[20px]">სტატუსი</span>
              </div>

              <div className="flex gap-2 items-center">
                <UserIcon />
                <span className="text-[20px]">თანამშრომელი</span>
              </div>

              <div className="flex gap-2 items-center">
                <CalendarIcon />
                <span className="text-[20px]">დავალების ვადა</span>
              </div>
            </div>

            <div className="flex flex-col gap-[18px]">
              <div className="text-[#0D0F10] border border-[#CED4DA] rounded-[5px] p-[14px] max-w-[259px] h-[45px]">
                {tasks.status.name}
              </div>
              <div className="flex gap-4">
                <img
                  className="w-[32px] h-[32px] rounded-full object-cover"
                  src={tasks.employee.avatar}
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-[#979797] text-[10px] leading-[12px]">
                    {tasks.department.name}
                  </p>
                  <p className="text-[#0D0F10] text-[14px] font-medium">
                    {tasks.employee.name} {tasks.employee.surname}
                  </p>
                </div>
              </div>
              <div className="text-[#0D0F10] text-[14px] font-medium">
                {formatDate(tasks.due_date)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
