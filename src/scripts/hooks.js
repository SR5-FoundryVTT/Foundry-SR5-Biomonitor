import BioMon from "./biomon.js"


Hooks.on("ready", () => {
    ui.BIOMONITOR = new BioMon();
    ui.BIOMONITOR.render(true);
  });