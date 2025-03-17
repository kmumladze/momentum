import { useState } from "react";

import { Link } from "react-router";
import Momentum from "../assets/momentum.jsx";
import Plus from "../assets/plus.jsx";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import DeleteIcon from "../assets/DeleteIcon.jsx";

export default function Navbar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="flex justify-between py-8 px-32">
      <Link to="/">
        <div className="flex items-center cursor-pointer">
          <h1 className="text-[31px] text-[#8338EC] font-bold">Momentum</h1>{" "}
          <Momentum />
        </div>
      </Link>

      <div className="flex items-center gap-10">
        {/* <div className="border border-[#8338EC] px-5 py-3 rounded-md cursor-pointer">
          <p className="text-[#212529]">თანამშრომლის შექმნა</p>
        </div> */}
        <>
          <Button
            className="border border-[#8338EC] px-5 py-[10px] rounded-md cursor-pointer text-[#212529] bg-transparent"
            onPress={onOpen}
          >
            თანამშრომლის შექმნა
          </Button>
          <Modal
            backdrop="blur"
            classNames={{
              backdrop:
                "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-blur-md backdrop-opacity-25",
            }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent className="min-w-[800px] pt-[40px] px-[50px] pb-[60px]">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-center text-[32px] font-[500]">
                    თანამშრომლის დამატება
                  </ModalHeader>
                  <ModalBody>
                    <form action="" className="flex flex-col gap-[37px]">
                      <div className="flex justify-around">
                        <div className="flex flex-col">
                          <label htmlFor="" className="text-[14px]">
                            სახელი*
                          </label>
                          <input
                            type="text"
                            className="border border-[#CED4DA] rounded-[6px] px-[15px] py-[5px]"
                          />
                          <p className="flex items-center gap-2 text-[#6C757D] text-[10px]">
                            <svg
                              width="14"
                              height="10"
                              viewBox="0 0 14 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.3327 1L4.99935 8.33333L1.66602 5"
                                stroke="#6C757D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            მინიმუმ 2 სიმბოლო
                          </p>
                          <p className="flex items-center gap-2 text-[#6C757D] text-[10px]">
                            <svg
                              width="14"
                              height="10"
                              viewBox="0 0 14 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.3327 1L4.99935 8.33333L1.66602 5"
                                stroke="#6C757D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            მინიმუმ 255 სიმბოლო
                          </p>
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="" className="text-[14px]">
                            გვარი*
                          </label>
                          <input
                            type="text"
                            className="border border-[#CED4DA] rounded-[6px] px-[15px] py-[5px]"
                          />
                          <p className="flex items-center gap-2 text-[#6C757D] text-[10px]">
                            <svg
                              width="14"
                              height="10"
                              viewBox="0 0 14 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.3327 1L4.99935 8.33333L1.66602 5"
                                stroke="#6C757D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            მინიმუმ 2 სიმბოლო
                          </p>
                          <p className="flex items-center gap-2 text-[#6C757D] text-[10px]">
                            <svg
                              width="14"
                              height="10"
                              viewBox="0 0 14 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.3327 1L4.99935 8.33333L1.66602 5"
                                stroke="#6C757D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            მინიმუმ 255 სიმბოლო
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <p>ავატარი*</p>
                        {image ? (
                          <div className="relative">
                            <img
                              src={image}
                              alt="Avatar"
                              className="w-[120px] h-[120px] rounded-full object-cover"
                            />
                            <button
                              onClick={handleRemoveImage}
                              className="absolute bottom-1 right-1"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="border border-[#CED4DA] border-dashed rounded-[8px] w-[600px] h-[120px] m-auto"
                          />
                        )}
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="light"
                      onPress={onClose}
                      className="text-[#343A40] border border-[#8338EC] rounded-[5px] px-[16px] py-[10px]"
                    >
                      გაუქმება
                    </Button>
                    <Button
                      onPress={onClose}
                      className="text-[#FFFFFF] bg-[#8338EC] rounded-[5px] px-[20px] py-[10px]"
                    >
                      დაამატე თანამშრომელი
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>

        <Link to="/newtask">
          <div className="flex bg-[#8338EC] text-white text-[15px] px-5 py-[10px] rounded-md">
            <Plus />
            <p>შექმენი ახალი დავალება</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
