import "./styles/App.css";
import styles from "./styles/App.module.css";
import Board from "./components/Board/Board";
import { GroupPriorityProvider } from "./providers/GroupPriorityProvider";
import Navbar from "./components/Navbar/Navbar";

function App() {
  
  return (
    <main className={styles.app}>
      <GroupPriorityProvider>
        <Navbar />
        <Board />
      </GroupPriorityProvider>
    </main>
  );
}

export default App;
