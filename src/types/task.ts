import { TaskStatus } from "./taskStatus";

export type Task = {
  id: number;
  name: string;
  dueDate: Date;
  status: TaskStatus;
  description: string;
}