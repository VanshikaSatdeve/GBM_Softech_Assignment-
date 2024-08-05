import {
  AppBar,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Statistics() {
  const { allTasks } = useSelector((store) => store.task);

  // Calculate statistics
  const totalTasks = allTasks.length;

  // Optionally, you can also calculate completed and pending tasks
  const completedTasks = allTasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="statistics">
      <Card
        sx={{
          marginTop: 7,
          position: "relative",
          right: 20,
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
                Task Statistic
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <CardContent>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead style={{ overflow: "auto" }}>
                <TableRow>
                  <TableCell align="center">Sr No</TableCell>
                  <TableCell align="center">Total Task</TableCell>
                  <TableCell align="center">Completed Task</TableCell>
                  <TableCell align="center"> Pending Task</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">{totalTasks}</TableCell>
                  <TableCell align="center">{completedTasks}</TableCell>
                  <TableCell align="center">{pendingTasks}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default Statistics;
