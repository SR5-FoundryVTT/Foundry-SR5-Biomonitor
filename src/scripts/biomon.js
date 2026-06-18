import GetActors from './getActors.js';
import ActorData from './actorData.js';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export default class BioMon extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(options = {}) {
        let themeValue = "dark";
        try {
            const uiConfig = game.settings.get("core", "uiConfig");
            themeValue = uiConfig?.colorScheme?.applications || "dark";
        } catch (e) {
            console.warn("BioMon | Failed to retrieve core theme settings:", e);
        }
        const currentTheme = `theme-${themeValue}`;

        options.classes = [
            ...(options.classes || []),
            "sr5-biomonitor",
            "themed",
            currentTheme,
            "min-w-[320px]"
        ];

        super(options);
        this.setHooks();
    }

    /** @override */
    static get DEFAULT_OPTIONS() {
        return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
            id: "biomonitor",
            window: {
                title: "BioMonitor",
                resizable: true,
                icon: "fas fa-heartbeat"
            },
            position: {
                width: 380,
                height: "auto",
                top: 500,
                left: 15
            },
            actions: {
                openActorSheet: this.#onOpenActorSheet
            }
        }, { inplace: false });
    }

    /** @override */
    static PARTS = {
        main: {
            template: "modules/sr5-biomonitor/templates/monitor.hbs"
        }
    };

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
        this.render();
    }

    removeHooks() {
        for (let hook of this.hooks) {
            Hooks.off(hook.hook, hook.id);
        }
    }

    /** @override */
    async _prepareContext(options) {
        let actors = GetActors.getActors();
        let bioMonData = [];

        actors.forEach(actor => {
            const physTrack = ActorData.getPhysicalTrack(actor);
            const stunTrack = ActorData.getStunTrack(actor);

            const physWounds = physTrack?.wounds || 0;
            const stunWounds = stunTrack?.wounds || 0;

            const physModifier = physWounds > 0 ? `-${physWounds}` : null;
            const stunModifier = stunWounds > 0 ? `-${stunWounds}` : null;

            bioMonData.push({
                name: actor.name,
                id: actor.uuid,
                image: ActorData.getImage(actor),
                physTrack: physTrack,
                stunTrack: stunTrack,
                physModifier: physModifier,
                stunModifier: stunModifier,
                statuses: ActorData.getStatus(actor),
                heartbeat: ActorData.getHeartbeats(actor)
            });
        });

        return { actors: bioMonData };
    }

    /** @override */
    async close(options = {}) {
        this.removeHooks();
        return super.close(options);
    }

    static async #onOpenActorSheet(event, target) {
        const uuid = target.dataset.actorUuid;
        if (uuid) {
            const document = await fromUuid(uuid);
            document?.sheet?.render(true);
        }
    }
}