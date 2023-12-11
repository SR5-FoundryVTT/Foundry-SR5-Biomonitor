import BioMon from "./biomon.js"
import Settings from "./settings.js"

  Hooks.on("ready", () => {
    Settings.addAllSettings();
  });

 Hooks.on('getSceneControlButtons', (controls) => {
   const tokenControls = controls.find((c) => c.name === 'token');

   tokenControls.tools.push({
       name: 'sr5-biomon',
       title: 'BioMon',
       icon: 'fas fa-heartbeat',
       button: true
   });
 });

 Hooks.on('renderSceneControls', (controls, html) => {
    html.find('[data-tool="sr5-biomon"]').on('click', (event) => {
         event.preventDefault();
         ui.BIOMONITOR = new BioMon();
         ui.BIOMONITOR.render(true);
      });
 });