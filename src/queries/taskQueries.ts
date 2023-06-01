import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks($userId: Int!) {
    getTasks(userId: $userId) {
      id
      name
      dueDate
      status
      description
    }
  }
`