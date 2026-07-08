import { useFetchTasks } from "../reactQueryCustomHooks";
import SingleItem from "./SingleItem";

// Main codebase
const Items = () => {
  const { isLoading, data, error } = useFetchTasks();

  // What to do when loading
  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>;
  }

  if (error) {
    return `Uh-oh, we got a ${error}!`;
  }

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
