import GetActors from './getActors.js'
import ActorData from './actorData.js'

export default class BioMon extends Application {
    constructor() {
        super();
        this.hooks = [];
        this.setHooks();
    }

    static get defaultOptions() {
        return {
          ...super.defaultOptions,
          id: "biomonitor",
          title: "Biomonitor",
          template: "modules/sr5-biomonitor/templates/monitor.hbs",
          popOut: true,
          top: 500,
          left: 15,
          resizable: true,
          dragDrop: [{dragSelector: null, dropSelector: null}],
          classes: ["sr5-biomonitor"]
        }
      }

    setHooks() {
        
    }

    removeHooks() {
        for (let hook of this.hooks) {
            Hooks.off(hook.hook, hook.id);
        }
    }

    getData() {
        let actors = GetActors.getActors()
        let bioMonData = []

        actors.forEach(actor => {
            bioMonData.push({
                name: actor.name,
                image: ActorData.getImage(actor),
                physTrack: ActorData.getPhysicalTrack(actor),
                stunTrack: ActorData.getStunTrack(actor),
                statuses: ActorData.getStatus(actor)
            })
        });

        return { actors: bioMonData };
    }

    activateListeners(html) {
        
      }

    async close(...args) {
        this.removeHooks();
        this._closed = true;
        return super.close(...args);
    }
}