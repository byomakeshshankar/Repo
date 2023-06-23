import { Box } from "@mui/material";
import React, { useState } from "react";
import ListTask from "./ListTask";
const Signup = () => {
  const [task, setTask] = useState({
    title: "",
    desc: "",
    date: "",
  });

  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, desc, date } = task;

    if (!title) {
      setError("title can't be empty");
    } else if (!desc) {
      setError("description can't be empty");
    } else if (!date) {
      setError("date can't be empty");
    } else {
      await fetch(" http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          desc: desc,
          date: date,
        }),
      }).then((res) => res.json());
      window.location.reload();
    }
  };

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleReset = () => {
    setTask({
      title: "",
      desc: "",
      date: "",
    });
    setError("");
  };

  return (
    <div>
      <Box className="box">
        <div className="register">Task</div>
        <div className="box-label">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group col-md-4 mt-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="title"
                value={task.title}
                onChange={(e) => handleInputchange(e)}
              />
            </div>
            <div className="form-group col-md-4 mt-3">
              <label className="form-label">Description</label>
              <textarea
                type="text"
                className="form-control form-control-lg"
                name="desc"
                value={task.desc}
                onChange={(e) => handleInputchange(e)}
              />
            </div>

            <div className="form-group col-md-4 mt-3">
              <div>
                <label className=" m-2">Due Date</label>
              </div>
              <input
                type="date"
                name="date"
                value={task.date}
                className="form-control form-control-lg"
                onChange={(e) => handleInputchange(e)}
              />
            </div>
            <div className="error">{error}</div>
            <div className="taskButton">
              <div className="panel-footer ">
                <div className="mt-2 mb-2">
                  <button className="btn btn-primary">Add Task</button>
                </div>
              </div>
              <div className="panel-footer ">
                <div className="mt-2 mb-2">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleReset}
                  >
                    Clear Task
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Box>
      <ListTask />
    </div>
  );
};

export default Signup;
