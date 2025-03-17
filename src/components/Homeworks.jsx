import Navbar from "./Navbar";
import { useEffect, useState } from "react";

import Medium from "../assets/medium.jsx";
import Low from "../assets/low.jsx";
import High from "../assets/high.jsx";

const TOKEN = import.meta.env.VITE_API_TOKEN;
const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

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
      <section>
        <h1 className="text-[#212529] text-[34px] font-bold">
          დავალებების გვერდი
        </h1>
        {/*TODO: autocomplete */}

        <div className="flex gap-4">
          {statuses.map((status, index) => (
            <div key={status.id}>
              <div className={`bg-[${colors[index]}]`}>{status.name}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col border border-[#FB5607] rounded-[15px] p-[20px] gap-[28px] w-[381px] cursor-pointer"
            >
              <div className="flex justify-between">
                <p>{task.priority.name}</p>
                <p>{task.due_date}</p>
              </div>

              <div className="flex flex-col gap-[12px] text-center">
                <p>{task.name}</p>
                <p>{task.description}</p>
              </div>

              <div className="flex justify-between">
                <img
                  className="w-[31px] h-[31px] rounded-full"
                  src={task.employee.avatar}
                  alt=""
                />
                <p>{task.total_comments}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
