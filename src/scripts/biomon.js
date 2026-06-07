import GetActors from './getActors.js'
import ActorData from './actorData.js'

// Destructure the required V2 classes from the Foundry API
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

// Wrap ApplicationV2 with the Handlebars mixin to parse your .hbs templates
export default class BioMon extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(options) {
        super(options);
        this.setHooks();
    }

    // Replace defaultOptions with the static DEFAULT_OPTIONS property
    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
        id: "biomonitor",
        classes: ["sr5-biomonitor"],
        window: {
            title: "Biomonitor",
            resizable: true
        },
        position: {
            top: 500,
            left: 15,
            width: "auto",
            height: "auto"
        }
    }, { inplace: false });

    // V2 uses PARTS to define templates. You can have multiple parts, 
    // but here we just need one for your main monitor interface.
    static PARTS = {
        monitor: {
            template: "modules/sr5-biomonitor/templates/monitor.hbs"
        }
    };

    setHooks() {
        this.hooks = [
            { hook: "updateActor", fn: this.updateBiomon.bind(this) },
            { hook: "deleteActiveEffect", fn: this.updateBiomon.bind(this) },
            { hook: "createActiveEffect", fn: this.updateBiomon.bind(this) },
        ];
        for (let hook of this.hooks) {
            hook.id = Hooks.on(hook.hook, hook.fn);
        }
    }

    updateBiomon() {
        // In V2, calling render with force: true ensures the window 
        // updates its content properly when actor data changes
        this.render({ force: true });
    }

    removeHooks() {
        if (this.hooks) {
            for (let hook of this.hooks) {
                Hooks.off(hook.hook, hook.id);
            }
        }
    }

    // Replace getData() with _prepareContext()
    async _prepareContext(options) {
        // Always grab the super context first
        const context = await super._prepareContext(options);
        
        let actors = GetActors.getActors();
        let bioMonData = [];

        actors.forEach(actor => {
            bioMonData.push({
                name: actor.name,
                id: actor.uuid,
                image: ActorData.getImage(actor),
                physTrack: ActorData.getPhysicalTrack(actor),
                stunTrack: ActorData.getStunTrack(actor),
                statuses: ActorData.getStatus(actor),
                heartbeat: ActorData.getHeartbeats(actor)
            });
        });

        // Attach your data to the context object
        context.actors = bioMonData;
        
        return context;
    }

    // Replace close() with _onClose() for teardown logic
    _onClose(options) {
        this.removeHooks();
        super._onClose(options);
    }
}