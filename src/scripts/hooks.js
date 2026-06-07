import '../styles/module.css'; 
import BioMon from "./biomon.js";
import Settings from "./settings.js";
import { registerBasicHelpers } from "./handlebarHelpers.js"; 

registerBasicHelpers();

Hooks.on("ready", () => {
  Settings.addAllSettings();
  ui.BIOMONITOR = new BioMon();
  console.log("Bio Mon Established");
});

Hooks.on("getSceneControlButtons", (controls) => {
    
    // 1. Safe-Guard: Normalize 'controls' to be an Array
    let controlList = null;
    if (Array.isArray(controls)) controlList = controls;
    else if (typeof controls === "object" && controls !== null) controlList = Object.values(controls);

    // Fallback to ui.controls if the argument is broken
    if (!controlList && ui.controls?.controls) {
        controlList = Array.isArray(ui.controls.controls) ? ui.controls.controls : Object.values(ui.controls.controls);
    }

    if (!controlList) return;

    // 2. Find the "Token" controls layer
    const tokenControl = controlList.find(c => c.name === "token" || c.name === "tokens");
    if (!tokenControl) return;

    // 3. Define the tool action
    const toggleBioMon = () => {
        if (ui.BIOMONITOR.rendered) {
            ui.BIOMONITOR.close();
        } else {
            ui.BIOMONITOR.render({ force: true });
        }
    };

    // 4. Build the config and dynamically assign onClick/onChange
    const toolConfig = {
        name: "sr5-biomon",
        title: "BioMon",
        icon: "fas fa-heartbeat",
        button: true
    };

    // Check the Foundry core version. V13+ uses onChange, older uses onClick.
    if (game.release.generation >= 13) {
        toolConfig.onChange = toggleBioMon;
    } else {
        toolConfig.onClick = toggleBioMon;
    }

    // 5. Safely add the tool to the list
    if (Array.isArray(tokenControl.tools)) {
        if (tokenControl.tools.some(tool => tool.name === "sr5-biomon")) return;
        tokenControl.tools.push(toolConfig);
    } 
    else if (typeof tokenControl.tools === "object" && tokenControl.tools !== null) {
        if (tokenControl.tools["sr5-biomon"]) return;
        tokenControl.tools["sr5-biomon"] = toolConfig;
    }
});

Hooks.on('renderApplication', async function(app, html) {
  // Standardize html to a native DOM element for V14
  const element = html instanceof jQuery ? html[0] : html;
  if (!element) return;
  
  const actorBoxes = element.querySelectorAll('.sr5-biomon-actors-box');
  
  actorBoxes.forEach(box => {
    box.addEventListener('click', async (ev) => {
        const uuid = ev.currentTarget.getAttribute('actor-uuid');
        if (uuid) {
            const document = await fromUuid(uuid);
            document?.sheet?.render(true);
        }
    });
  });
});