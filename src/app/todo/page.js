"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todo() {
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editText, setEditText] = useState("");
  const [list, setList] = useState([]);
  const [listCopy, setListCopy] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [ind, setInd] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    const getData = JSON.parse(localStorage.getItem("list"));
  }, [list]);

  // here value store in state
  const handleChange = (e) => {
    let value = e.target.value;
    let inputName = e.target.name;
    inputName == "todo" && setText(value);
    inputName == "search" && setSearchText(value);
  };

  // here making array of string
  const handleText = () => {
    text.length > 0 &&
      setList([text, ...list]) &
        setListCopy([text, ...list]) &
        toast.success("Added successfully");
    //after add the data in array input is clearing
    setText("");
  };

  const handleRemove = (index) => {
    const filterdList = list.filter((item, ind) => ind !== index);
    setList(filterdList) & toast.success("Removed successfully");
  };

  const handleUpdate = (index, newItem) => {
    let listCopy = list;
    listCopy.splice(index, 1, newItem);
    setList([...listCopy]);
    setListCopy([...listCopy]) & toast.success("Updated successfully");
    setIsEdit(false);
  };

  const handleEditButton = (item, ind) => {
    setEditText(item);
    setIsEdit(true);
    setInd(ind);
  };

  const handleSearch = () => {
    const result = listCopy.filter((item) =>
      item.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );

    setList(result);
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);
  return (
    <>
      <div childre className="min-h-screen">
        <h1>this is Todo page</h1>
        <div>
          <ToastContainer />
        </div>
        <div className="w-full flex justify-center">
          <input
            onChange={handleChange}
            value={text}
            type="text"
            name="todo"
            className="p-3 bg-emerald-500"
          />
          <button onClick={handleText} className="p-3 bg-emerald-500">
            ADD
          </button>
          <input
            onChange={handleChange}
            name="search"
            type="search"
            placeholder="search..."
            className="p-3 bg-emerald-500 ml-4 placeholder:text-black"
          />
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
