import SideBarContainer from "./containers/SideBarContainer/SideBarContainer";
import TaskContainer from "./containers/TaskContainer/TaskContainer";
import TasksContextProvider from "./context/TasksContextProvider";
import styles from "./App.module.scss";

function App() {
  return (
    <TasksContextProvider>
      <div className={styles.container}>
        <SideBarContainer />
        <TaskContainer />
      </div>
    </TasksContextProvider>
  );
}

export default App;
