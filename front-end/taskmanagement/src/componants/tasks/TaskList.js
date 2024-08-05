import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get } from "../../utils/HttpSerive";
import { urls } from "../../utils/Constant";
import { taskActions } from "./TaskListSliceReducer";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [sortField, setSortField] = useState('due_date');
  const { allTasks } = useSelector((store) => store.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    Get(urls.task)
      .then((response) => {
        let tasks = response.data;

        // Apply filters
        if (statusFilter) {
          tasks = tasks.filter(task => task.status === statusFilter);
        }

        if (dueDateFilter) {
          tasks = tasks.filter(task => task.deu_date === dueDateFilter);
        }

        // Apply search
        if (searchTerm) {
          tasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Apply sorting
        tasks = tasks.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
          } else {
            return a[sortField] < b[sortField] ? 1 : -1;
          }
        });

        dispatch(taskActions.GET_TASK(tasks));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch, statusFilter, dueDateFilter, searchTerm, sortOrder, sortField]);

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
                Task List
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Search Tasks"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flexGrow: 1 }}
              />

              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Status' }}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                {/* Add other statuses as needed */}
              </Select>

              <Select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Sort Field' }}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="title">Title</MenuItem>
                {/* Add other sort fields as needed */}
              </Select>

              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Sort Order' }}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>

             
            {/* </Box>

            <Box sx={{ display: 'flex', gap: 2 }}> */}
            
            </Box>
          </Box>


          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sr No</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Due Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTasks &&
                  allTasks.length > 0 &&
                  allTasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, index) => (
                      <TableRow
                        key={data.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{data.title}</TableCell>
                        <TableCell align="center">{data.description}</TableCell>
                        <TableCell align="center">{data.deu_date}</TableCell>
                        <TableCell align="center">{data.status}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => navigate(`/task-item/${data.id}`)}
                            >
                              View Details
                            </Button>
                          </Box>
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
        />
      </Card>
    </div>
  );
}

export default TaskList;
