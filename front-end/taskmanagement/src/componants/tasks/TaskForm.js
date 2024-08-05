import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
} from "@mui/material";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  Toolbar,
  AppBar,
  Typography,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import * as TablePaginationActions from "../common/TablePagination";
import TablePagination from "@mui/material/TablePagination";
import DialogBox from "../common/DialogBox";
import { Delete, Get, Post, Put } from "../../utils/HttpSerive";
import { urls } from "../../utils/Constant";
import { taskActions } from "./TaskListSliceReducer";

function TaskForm() {
  const [taskForm, setTaskForm] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState(null);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { allTasks } = useSelector((store) => store.task);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deu_date: "",
    status: "",
    details: "",
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!newTask.title) {
      newErrors.title = 'Title is required';
    }
    if (!newTask.description) {
      newErrors.description = 'Description is required';
    }
    if (!newTask.deu_date) {
      newErrors.deu_date = 'Due Date is required';
    }
    if (!newTask.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [newTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      handleAddTask(); // Assuming this function handles the task addition logic
    }
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openConfirmDialog = (id) => {
    setConfirmDialogOpen(true);
    setRecordToDeleteId(id);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setRecordToDeleteId(null);
  };

  useEffect(() => {
    Get(urls.task)
      .then((response) => {
        console.log("Response data:", response.data);
        setTaskForm(response.data);
        dispatch(taskActions.GET_TASK(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  const handleDelete = () => {
    if (recordToDeleteId !== null) {
      Delete(`${urls.task}${recordToDeleteId}`)
        .then(() => {
          dispatch(taskActions.DELETE_TASK(recordToDeleteId));
          setTaskForm((prevState) =>
            prevState.filter((task) => task.id !== recordToDeleteId)
          );
          setConfirmDialogOpen(false);
          setRecordToDeleteId(null);
        })
        .catch((error) => {
          console.error("Error deleting task:", error.response || error);
          alert("Error deleting task. Please try again.");
          setConfirmDialogOpen(false);
          setRecordToDeleteId(null);
        });
    }
  };

  //   ADD DATA

  const openAddTaskDialog = () => {
    setIsAddTaskDialogOpen(true);
  };

  const closeAddTaskDialog = () => {
    setIsAddTaskDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    console.log("Adding task with due date:", newTask.deu_date);
    Post(urls.task, newTask)
      .then((response) => {
        // Assuming your response contains the new task
        dispatch(taskActions.ADD_TASK(response.data));
        setIsAddTaskDialogOpen(false);
        setNewTask({ title: "", description: "", deu_date: "", status: "" }); // Reset form
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        alert("Error adding task. Please try again.");
      });
  };

  // EDIT DATA
  const openEditTaskDialog = (task) => {
    setCurrentTask(task);
    setIsEditTaskDialogOpen(true);
  };

  const closeEditTaskDialog = () => {
    setIsEditTaskDialogOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleEditTask = () => {
    console.log("Editing task with due date:", currentTask.deu_date);
    Put(`${urls.task}${currentTask.id}/`, currentTask)
      .then((response) => {
        dispatch(taskActions.UPDATE_TASK(response.data));
        setIsEditTaskDialogOpen(false);
        setCurrentTask(null); // Reset current task
      })
      .catch((error) => {
        console.error("Error editing task:", error);
        alert("Error editing task. Please try again.");
      });
  };

  return (
    <div>
      <Card
        sx={{
          marginRight: "25px",
          marginTop: 7,
          position: "relative",
          right: 20,
          borderRadius: "0px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {/* <CssBaseline /> */}
          <AppBar component="nav" position="static" sx={{ boxShadow: "none" }}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  textAlign: "left",
                }}
              >
                Manage Holiday
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAddTaskDialog}
          >
            Add Task
          </Button>

          <TableContainer>
            <Table aria-label="simple table">
              <TableHead style={{ overflow: "auto" }}>
                <TableRow>
                  <TableCell align="center">Sr No</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Deu Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTasks &&
                  allTasks.length > 0 &&
                  allTasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{data.title}</TableCell>
                        <TableCell align="center">{data.description}</TableCell>
                        <TableCell align="center">{data.deu_date}</TableCell>
                        <TableCell align="center">{data.status}</TableCell>
                        <TableCell align="center">
                          {/* <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          > */}
                            <Button
                            sx={{
                              marginRight:"5px"
                            }}
                              variant="contained"
                              color="primary"
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                setRecordToDeleteId(data.id);
                                setConfirmDialogOpen(true);
                              }}
                            >
                              Delete
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon />}
                              onClick={() => openEditTaskDialog(data)}
                            >
                              Edit
                            </Button>
                          {/* </Box> */}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          count={allTasks?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions.default}
        />

        <DialogBox
          open={confirmDialogOpen}
          onClose={closeConfirmDialog}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete this record?`}
          title={`Delete Record`}
          submitLabel={`Delete`}
          show={true} // Ensure this is true to show the delete button
          showCancel={true} // Set to true if you want to show the cancel button
        />

        <Dialog open={isAddTaskDialogOpen} onClose={closeAddTaskDialog}>
          <DialogTitle>Add New Task</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Title"
                type="text"
                fullWidth
                value={newTask.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                value={newTask.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
              />
              <TextField
                margin="dense"
                name="deu_date"
                label="Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newTask.deu_date}
                onChange={handleInputChange}
                error={!!errors.deu_date}
                helperText={errors.deu_date}
              />
              <TextField
                select
                margin="dense"
                name="status"
                label="Status"
                value={newTask.status}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.status}
                helperText={errors.status}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                name="details"
                label="Details"
                type="text"
                fullWidth
                value={newTask.details}
                onChange={handleInputChange}
              />
            </DialogContent>
            
          
          <DialogActions>
            <Button onClick={closeAddTaskDialog} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddTask} color="primary" disabled={!isFormValid}>
              Add
            </Button>
          </DialogActions>
          </form>
        </Dialog>

        <Dialog open={isEditTaskDialogOpen} onClose={closeEditTaskDialog}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={currentTask?.title || ""}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={currentTask?.description || ""}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="deu_date"
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={currentTask?.deu_date || ""}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="status"
              label="Status"
              type="text"
              fullWidth
              value={currentTask?.status || ""}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="details"
              label="Details"
              type="text"
              fullWidth
              value={currentTask?.details || ""}
              onChange={handleEditInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditTaskDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditTask} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}

export default TaskForm;
