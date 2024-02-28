import GetActors from './getActors.js'
import ActorData from './actorData.js'

export default class BioMon extends Application {
    constructor() {
        super();
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
        this.hooks = [
            {
                hook: "updateActor",
                fn: this.updateBiomon.bind(this),
            },
            {
                hook: "deleteActiveEffect",
                fn: this.updateBiomon.bind(this),
            },
            {
                hook: "createActiveEffect",
                fn: this.updateBiomon.bind(this),
            },
        ];
        for (let hook of this.hooks) {
            hook.id = Hooks.on(hook.hook, hook.fn);
        }
    }

    updateBiomon() {
        this.render()
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
                id: actor.uuid,
                image: ActorData.getImage(actor),
                physTrack: ActorData.getPhysicalTrack(actor),
                stunTrack: ActorData.getStunTrack(actor),
                statuses: ActorData.getStatus(actor),
                heartbeat: ActorData.getHeartbeats(actor)
            })
        });

        return { actors: bioMonData };
    }

    async close(...args) {
        this.removeHooks();
        this._closed = true;
        return super.close(...args);
    }
}