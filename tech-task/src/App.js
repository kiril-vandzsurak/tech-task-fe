import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [crudElements, setCrudElements] = useState([]);
  const [singleElement, setSingleElement] = useState({});
  const [newElement, setNewElement] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3001/crud/getAll");
        setCrudElements(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  async function handleGetSingleElement(id) {
    try {
      const response = await axios.get(
        `http://localhost:3001/crud/getSingle/${id}`
      );
      setSingleElement(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePost() {
    try {
      const response = await axios.post(
        "http://localhost:3001/crud/post",
        newElement
      );
      setNewElement({
        name: "",
        description: "",
        price: "",
      });
      setCrudElements([...crudElements, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id) {
    try {
      const response = await axios.put(
        `http://localhost:3001/crud/update/${id}`,
        singleElement
      );
      setCrudElements(
        crudElements.map((element) => {
          if (element._id === response.data._id) {
            return response.data;
          } else {
            return element;
          }
        })
      );
      setSingleElement(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/crud/delete/${id}`);
      setCrudElements(crudElements.filter((element) => element._id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="App">
      <h1>CRUD Elements</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crudElements.map((element) => (
            <tr key={element._id}>
              <td>{element.name}</td>
              <td>{element.description}</td>
              <td>{element.price}</td>
              <td>
                <button onClick={() => handleGetSingleElement(element._id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(element._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Create New Element</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handlePost();
        }}
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={newElement.name}
            onChange={(event) =>
              setNewElement({ ...newElement, name: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            value={newElement.description}
            onChange={(event) =>
              setNewElement({ ...newElement, description: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="description">Price: </label>
          <input
            type="text"
            id="description"
            value={newElement.price}
            onChange={(event) =>
              setNewElement({ ...newElement, price: event.target.value })
            }
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <h2>Edit Element</h2>
      {singleElement ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdate(singleElement._id);
          }}
        >
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              value={singleElement.name || ""}
              onChange={(event) =>
                setSingleElement({
                  ...singleElement,
                  name: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              value={singleElement.description || ""}
              onChange={(event) =>
                setSingleElement({
                  ...singleElement,
                  description: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="price">Price: </label>
            <input
              type="text"
              id="price"
              value={singleElement.price || ""}
              onChange={(event) =>
                setSingleElement({
                  ...singleElement,
                  price: event.target.value,
                })
              }
            />
          </div>
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>No element selected</p>
      )}
    </div>
  );
}

export default App;
