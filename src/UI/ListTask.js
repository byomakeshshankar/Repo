import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const ListTask = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowid, setRowid] = useState("");
  const [user, setUser] = useState({
    checkbox: [],
  });

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const res = await fetch(" http://localhost:3001/tasks");
    const lists = await res.json();
    setTasks(lists);
  };

  const deleteUser = async () => {
    const res = await fetch(` http://localhost:3001/tasks/${rowid}`, {
      method: "DELETE",
    });
    window.location.reload();
    setOpen(false);
  };

  const checkboxChange = (e) => {
    const { value, checked } = e.target;
    const { checkbox } = user;
    if (checked) {
      setUser({ checkbox: [...checkbox, value] });
    } else {
      setUser({ checkbox: checkbox.filter((e) => e !== value) });
    }
  };

  const handleClickOpen = (id) => {
    setRowid(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h2>Lists</h2>
      {tasks < 1 ? (
        <div className="listData">No Data</div>
      ) : (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Sl</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.desc}</td>
                <td>{task.date}</td>

                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleClickOpen(task.id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckChecked"
                    name="checkbox"
                    value={task.title}
                    onChange={(e) => checkboxChange(e)}
                    // disabled={user.checkbox.includes(task.title) ? true : false}
                  />

                  <span
                    className={
                      user?.checkbox?.includes(task.title)
                        ? "confirmstatus"
                        : "pendingstatus"
                    }
                  >
                    {user?.checkbox?.includes(task.title)
                      ? "Completed"
                      : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do You Want To Delete</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteUser} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListTask;
