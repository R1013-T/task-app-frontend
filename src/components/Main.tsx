import jwtDecode from "jwt-decode";
import Header from "./Header";
import TaskTable from "./TaskTable";
import { Payload } from "../types/payload";
import { GET_TASKS } from "../queries/taskQueries";
import { useQuery } from "@apollo/client";
import { Task } from "../types/task";
import Loading from "./Loading";
import { Stack, Typography } from "@mui/material";
import AddTask from "./AddTask";

const Main = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<Payload>(token!);
  const userId = decodedToken.sub;

  const { loading, data, error } = useQuery<{ getTasks: Task[] }>(GET_TASKS, {
    variables: { userId },
  });

  console.log("data :", data);

  return (
    <>
      <Header />
      <Stack spacing={4} direction="column" m={8} alignItems="center">
        {loading && <Loading />}
        {error && <Typography color="red">Error</Typography>}
        {!loading && !error && (
          <>
            <AddTask userId={userId} />
            <TaskTable tasks={data?.getTasks} userId={userId} />
          </>
        )}
      </Stack>
    </>
  );
};

export default Main;
