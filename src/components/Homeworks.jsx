import Navbar from "./Navbar";
import { useEffect, useState } from "react";

import Medium from "../assets/medium.jsx";
import Low from "../assets/low.jsx";
import High from "../assets/high.jsx";
import ComentsIcon from "../assets/ComentsIcon.jsx";
import { Link } from "react-router";

const TOKEN = import.meta.env.VITE_API_TOKEN;
const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

const PRIORITY_ICON_MAP = {
  დაბალი: <Low />,
  მაღალი: <High />,
  საშუალო: <Medium />,
};

function formatDate(dateString) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("ka-GE", options);
}

export default function Homeworks() {
  const [statuses, setStatuses] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/statuses"
        );
        const resData = await response.json();
        console.log(resData);

        setStatuses(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchStatus();
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/tasks",
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
  }, []);

  console.log(tasks);

  return (
    <>
      <Navbar />
      <section className="flex flex-col gap-4 px-32">
        <h1 className="text-[#212529] text-[34px] font-bold">
          დავალებების გვერდი
        </h1>
        {/*TODO: autocomplete */}

        <div className="grid grid-cols-4 gap-8">
          {statuses.map((status, index) => (
            <div
              className="rounded-[10px] py-[10px] px-[15px] text-white text-center"
              key={status.id}
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              {status.name}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8">
          {tasks.map((task) => (
            <Link to="/taskdetail">
              <div
                key={task.id}
                className="flex flex-col border border-[#FB5607] rounded-[15px] p-[20px] gap-[28px] cursor-pointer w-full"
              >
                <div className="flex gap-2 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p
                      className={`flex items-center gap-[4px] border-2 p-[4px] rounded-[4px] ${
                        task.priority.name === "დაბალი"
                          ? "text-[#08A508] border-[#08A508]"
                          : task.priority.name === "საშუალო"
                          ? "text-[#FFBE0B] border-[#FFBE0B]"
                          : task.priority.name === "მაღალი"
                          ? "text-[#FA4D4D] border-[#FA4D4D]"
                          : "text-gray-600 border-gray-600"
                      }`}
                    >
                      {PRIORITY_ICON_MAP[task.priority.name]}
                      {task.priority.name}
                    </p>
                    <p className="max-w-[100px] whitespace-nowrap text-ellipsis overflow-hidden bg-[#FF66A8] text-white py-[5px] px-[9px] rounded-[15px] text-[12px]">
                      {task.department.name}
                    </p>
                  </div>
                  <p className="text-[12px] w-[76px]">
                    {formatDate(task.due_date)}
                  </p>
                </div>

                <div className="flex flex-col gap-[12px]">
                  <p className="text-[#212529] text-[15px] font-bold">
                    {task.name}
                  </p>
                  <p className="text-[#343A40] text-[14px] font-normal">
                    {task.description}
                  </p>
                </div>

                <div className="flex justify-between">
                  <img
                    className="w-[31px] h-[31px] rounded-full"
                    src={task.employee.avatar}
                    alt=""
                  />
                  <p className="flex items-center gap-2">
                    <ComentsIcon />
                    {task.total_comments}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
