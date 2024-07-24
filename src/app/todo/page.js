"use client";
import { useState } from "react";

export default function Todo() {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [list, setList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [ind, setInd] = useState(null);

  console.log("editText :", editText);
  console.log("list :", list);

  // here value store in state
  const handleChange = (e) => {
    let value = e.target.value;
    setText(value);
    // setEditText(value);
  };

  // here making array of string
  const handleText = () => {
    text.length > 0 && setList([text, ...list]);
    //after add the data in array input is clearing
    setText("");
  };

  const handleRemove = (index) => {
    const filterdList = list.filter((item, ind) => ind !== index);
    setList(filterdList);
  };

  const handleUpdate = (index, newItem) => {
    let listCopy = list;
    listCopy.splice(index, 1, newItem);
    setList(listCopy);
    setIsEdit(false);
  };

  const handleEditButton = (item, ind) => {
    setEditText(item);
    setIsEdit(true);
    setInd(ind);
  };

  return (
    <>
      <div childre className="min-h-screen">
        <h1>this is Todo page</h1>
        <div className="w-full flex justify-center">
          <input
            onChange={handleChange}
            value={text}
            type="text"
            className="p-3 bg-emerald-500"
          />
          <button onClick={handleText} className="p-3 bg-emerald-500">
            ADD
          </button>
        </div>
        <div className="w-full">
          {list?.map((item, index) => (
            <div key={index} className="w-full  m-3">
              {isEdit && ind == index ? (
                <div className="w-full">
                  <input
                    type="text"
                    className="p-3 w-3/5"
                    name="editText"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="p-3 bg-emerald-500 w-1/5"
                    onClick={() => handleUpdate(index, editText)}
                  >
                    SAVE
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <span className="w-2/5 inline-block"> {item} </span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="w-1/5 p-3 bg-emerald-500 ml-2"
                  >
                    REMOVE
                  </button>
                  <button
                    onClick={() => handleEditButton(item, index)}
                    className="p-3 w-1/5 bg-emerald-500 ml-2"
                  >
                    EDIT
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
