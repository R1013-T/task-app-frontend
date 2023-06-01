import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../mutations/taskMutations";
import { GET_TASKS } from "../queries/taskQueries";
import { useNavigate } from "react-router-dom";

const DeleteTask = ({ id, userId }: { id: number; userId: number }) => {
  const navigate = useNavigate();

  const [deleteTask] = useMutation<{ deleteTask: number }>(DELETE_TASK);

  const handleDeleteTask = async () => {
    try {
      await deleteTask({
        variables: { id },
        refetchQueries: [{query: GET_TASKS, variables: {userId}}]
      });
      alert("Task deleted successfully");
    } catch (error: any) {
      if (error === 'unauthorized') {
        localStorage.removeItem("token");
        alert("Token expired, please sign in again");
        navigate("/signin");
        return
      }
      alert("Task deletion failed");
    }
  }

  return (
    <div>
      <Tooltip title="Delete Task">
        <IconButton onClick={handleDeleteTask} >
          <DeleteIcon color="action" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DeleteTask;
