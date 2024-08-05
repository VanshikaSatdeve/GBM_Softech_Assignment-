import {
  AppBar,
  Box,
  Button,
  Card,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Get } from "../../utils/HttpSerive";
import { urls } from "../../utils/Constant";
import { taskActions } from "./TaskListSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function TaskItem() {
  const [expanded, setExpanded] = React.useState(false);
  const [taskItem, setTaskItem] = useState([]);
  const { allTasks } = useSelector((store) => store.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigateToTaskList = () => {
    navigate("/task-list");
  };

  useEffect(() => {
    Get(`${urls.task}${id}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setTaskItem(response.data);
        dispatch(taskActions.GET_TASK(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  return (
    <div>
      <Card
        sx={{
          marginTop: 7,
          position: "relative",
          right: 20,
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
                Task Details
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
       
          <Card >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {taskItem.details}
              </Typography>
            </CardContent>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", margin: 1 }}
            >
              <Button onClick={navigateToTaskList}>Back to Task</Button>
            </Box>
          </Card>
        
      </Card>
    </div>
  );
}

export default TaskItem;
