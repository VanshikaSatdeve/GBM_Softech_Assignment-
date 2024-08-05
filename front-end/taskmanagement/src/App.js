import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./componants/dashboard/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createStore from "./store";
import { Provider } from "react-redux";
import PrivateRoute from "./componants/common/PrivateRoute";
import TaskList from "./componants/tasks/TaskList";
import TaskItem from "./componants/tasks/TaskItem";
import TaskForm from "./componants/tasks/TaskForm";
import Statistics from "./componants/tasks/Statistics";
const store = createStore();

function App() {
  const colortheme = createTheme({
    palette: {
      primary: {
        main: "#FF4A17",
      },
      secondary: {
        main: "#000000",
      },
    },
  });

  const router = createBrowserRouter([
    // { path: '/task-list', element: <TaskList /> },
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/task-list",
          element: <TaskList />,
        },
        { path: "task-item", element: <TaskItem /> },
        { path: "task-item/:id", element: <TaskItem /> },
        { path: "task-form", element: <TaskForm /> },
        { path: "task-statistic", element: <Statistics /> },
      ],
    },
  ]);

  
  return (
    <Provider store={store}>
      <ThemeProvider theme={colortheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
    // <Provider store={store}>
    //   <ThemeProvider theme={colortheme}>
    //     <div className="App" data-testid="AppWrapper">
    //       <RouterProvider router={router} />
    //     </div>
    //   </ThemeProvider>
    // </Provider>
  );
}

export default App;
