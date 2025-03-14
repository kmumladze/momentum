import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

export default function Homeworks() {
  const [statuses, setStatuses] = useState([]);
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
      </section>
    </>
  );
}
