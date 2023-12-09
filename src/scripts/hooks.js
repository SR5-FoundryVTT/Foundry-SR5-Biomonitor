import BioMon from "./biomon.js"
import Settings from "./settings.js"

Hooks.on("ready", () => {
    Settings.addAllSettings();
    
    ui.BIOMONITOR = new BioMon();
    ui.BIOMONITOR.render(true);
  });