import SideBarContainer from "./containers/SideBarContainer/SideBarContainer";
import TaskContainer from "./containers/TaskContainer/TaskContainer";
import TasksContextProvider from "./context/TasksContextProvider";
import styles from "./App.module.scss";
import { Bounce, Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <TasksContextProvider>
      <div className={styles.container}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="colored"
          transition={Slide}
          toastStyle={{
            background: "#a89a8e",
            color: "#fff",
            fontFamily: `"Work Sans", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
          }}
        />
        <SideBarContainer />
        <TaskContainer />
      </div>
    </TasksContextProvider>
  );
}

export default App;
