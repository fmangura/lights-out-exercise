import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <Board key={Math.floor(Math.random() * 10)} nrows={6} ncols={6} chanceLightStartsOn={0.5}/>
      </div>
  );
}

export default App;
