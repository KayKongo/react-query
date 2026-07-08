import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./src/utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });

  return { isLoading, data, error };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (taskItem) => customFetch.post("/", { title: taskItem }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Triggers the refresh functionality
      toast.success("Task Added Successfully!");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { createTask, isPending };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task Item Updated!");
    },
  });

  return { editTask };
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: deleteTaskPending } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task Item Removed!");
    },
  });

  return { deleteTask, deleteTaskPending };
};
