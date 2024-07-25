"use client";
import { useEffect, useState } from "react";

export default function Traffic() {
  const [counter, setCounter] = useState(0);
  const [stop, setStop] = useState("");
  const [wait, setWait] = useState("");
  const [go, setGo] = useState("");
  const [inter, setInter] = useState(null);

  useEffect(() => {
    counter > 0 && setStop("red");
    counter > 5 && setStop("") & setWait("yellow");
    counter > 10 && setGo("green") & setWait("");
    counter > 15 && handleStop() & setGo("") & setStop("red");
  }, [counter]);

  const handleCounter = () => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000); // Change interval to 1000ms (1 second)
    setInter(interval);
  };

  const handleStop = () => {
    inter && clearInterval(inter);
  };

  return (
    <>
      <div>
        Traffic
        <h1>{counter}</h1>
        <button className="p-3 px-5 m-1 bg-blue-700 rounded-md " onClick={handleCounter}> Start</button>
        <button className="p-3 px-5 m-1 bg-red-700 rounded-md " onClick={handleStop}> stop</button>
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-black w-40 p-5">
            <div
              className={`bg-${stop}-600 w-[100px] h-[100px] rounded-full m-2`}
            ></div>
            <div
              className={`bg-${wait}-500 w-[100px] h-[100px] rounded-full m-2`}
            ></div>
            <div
              className={`bg-${go}-500 w-[100px] h-[100px] rounded-full m-2`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
