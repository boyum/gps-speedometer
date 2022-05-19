import type { Component } from "solid-js";
import styles from "./App.module.css";
import { Speedometer } from "./components/Speedometer";

const App: Component = () => {
  return (
    <div class={styles["App"]}>
      <Speedometer />
    </div>
  );
};

export default App;
