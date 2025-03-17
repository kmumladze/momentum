import { useState, useEffect } from "react";
import Navbar from "./Navbar";

import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { DatePicker } from "@heroui/react";

const TOKEN = import.meta.env.VITE_API_TOKEN;

export default function NewTask() {
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function fetchPriorities() {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/priorities"
        );
        const resData = await response.json();
        console.log(resData);

        setPriorities(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchPriorities();
  }, []);

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
    async function fetchDepartments() {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/departments"
        );
        const resData = await response.json();
        console.log(resData);

        setDepartments(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDepartments();
  }, []);

  async function CreateTask(e) {
    console.log(TOKEN);

    e.preventDefault();

    try {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({
            name: "შექმენით readme ფაილი",
            description: "აღწერეთ შესრულებული დავალება რიდმი ფაილით",
            due_date: "2027-07-21T17:32:28Z",
            status_id: 1,
            employee_id: 1,
            priority_id: 1,
          }),
        }
      );

      //   const res = await response.json();

      //   if (!res.accessToken || !res.refreshToken) {
      //     throw new Error("Invalid credentials");
      //   }
      //   localStorage.setItem("accessToken", res.accessToken);
      //   localStorage.setItem("refreshToken", res.refreshToken);

      navigate("/");
    } catch (err) {
      console.log("error", err);

      //   Swal.fire({
      //     icon: "error",
      //     title: "Login Failed",
      //     text: `due to:  ${err.message}`,
      //     footer: '<a href="#">Why do I have this issue?</a>',
      //   });
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <div>
          <h1 className="text-[#212529] font-bold text-[34px]">
            შექმენი ახალი დავალება
          </h1>
          <form
            onSubmit={CreateTask}
            action=""
            className="flex flex-col gap-[50px]"
          >
            <div className="flex justify-around">
              <div className="flex flex-col gap-[55px]">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-[#343A40]">
                    სათაური*
                  </label>
                  <input
                    type="text"
                    className="border border-[#DEE2E6]"
                    required
                  />
                  <p className="text-[#6C757D] text-[10px]">
                    მინიმუმ 2 სიმბოლო
                  </p>
                  <p className="text-[#6C757D] text-[10px]">
                    მაქსიმუმ 255 სიმბოლო
                  </p>
                </div>

                <div className="flex flex-col">
                  <label className="text=[#343A40] text-[16px]">აღწერა</label>
                  <input
                    type="text"
                    className="border border-[#DEE2E6] rounded-[5px] p-[14px]"
                    required
                  />
                  <p className="text-[#6C757D] text-[10px]">
                    მინიმუმ 2 სიმბოლო
                  </p>
                  <p className="text-[#6C757D] text-[10px]">
                    მაქსიმუმ 255 სიმბოლო
                  </p>
                </div>

                <div className="flex gap-[32px]">
                  <div className="flex flex-col">
                    <p className="text-[#343A40] text-[16px]">პრიორიტეტი*</p>
                    <Autocomplete
                      allowsCustomValue
                      className="max-w-xs"
                      defaultItems={priorities}
                      defaultSelectedKey={2}
                      label={
                        priorities.length > 0 ? priorities[1].name : "საშუალო"
                      }
                      variant="bordered"
                    >
                      {(item) => (
                        <AutocompleteItem key={item.id}>
                          {item.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-[#343A40] text-[16px]">სტატუსი*</p>
                    <Autocomplete
                      allowsCustomValue
                      className="max-w-xs"
                      defaultItems={statuses}
                      defaultSelectedKey={2}
                      label={
                        statuses.length > 0 ? statuses[0].name : "დასაწყები"
                      }
                      variant="bordered"
                    >
                      {(element) => (
                        <AutocompleteItem key={element.id}>
                          {element.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[52px]">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-[#343A40]">
                    დეპარტამენტი*
                  </label>
                  <Autocomplete
                    allowsCustomValue
                    className="max-w-xs"
                    defaultItems={departments}
                    defaultSelectedKey={2}
                    label={
                      departments.length > 0
                        ? departments[0].name
                        : "ადმინისტრაციის დეპარტამენტი"
                    }
                    variant="bordered"
                  >
                    {(dep) => (
                      <AutocompleteItem key={dep.id}>
                        {dep.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="" className="text-[#ADB5BD] text-[16px]">
                    პასუხისმგებელი თანამშრომელი
                  </label>
                  <input type="text" className="border rounded-[5px]" />
                </div>

                <div className="flex flex-col">
                  <p className="text-[#343A40] text-[16px]">დედლაინი</p>
                  <div className="w-full max-w-xl flex flex-row gap-4">
                    <DatePicker
                      showMonthAndYearPickers
                      //   label="Birth Date"
                      variant="bordered"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              className="text-white text-[18px] bg-[#8338EC] py-[10px] px-[20px] rounded-[5px] w-[208px]"
              type="submit"
            >
              დავალების შექმნა
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
