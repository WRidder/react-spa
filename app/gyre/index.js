import GyreJS from "gyrejs";
// import GyreDebugger from "../../node_modules/gyrejs/src/debugger";
// import GyreDebuggerGUI from "../../node_modules/gyrejs/src/debugger-gui";

import aggregates from "./aggregates";
import commands from "./commands";
import events from "./events";
import projections from "./projections";

const gyre = GyreJS.createGyre({
  id: "main",
  volatile: true,
  commands,
  events,
  aggregates,
  projections
});

export default gyre;