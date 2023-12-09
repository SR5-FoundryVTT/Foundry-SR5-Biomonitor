
export default class Settings{

    static addAllSettings() {
        game.settings.register('sr5-biomonitor', 'trackCharacters', {
            name: 'Settings.ActorTypes.trackCharacters',
            scope: 'world',
            config: true,
            type: Boolean,
            default: 'true',
            requiresReload: true
          });

          game.settings.register('sr5-biomonitor', 'trackCritters', {
            name: 'Settings.ActorTypes.trackCritters',
            scope: 'world',
            config: true,
            type: Boolean,
            default: 'false',
            requiresReload: true
          });

          game.settings.register('sr5-biomonitor', 'trackVehicles', {
            name: 'Settings.ActorTypes.trackVehicles',
            scope: 'world',
            config: true,
            type: Boolean,
            default: 'false',
            requiresReload: true
          });

          game.settings.register('sr5-biomonitor', 'trackedActors', {
            name: 'Settings.TrackedActors.trackedActors',
            scope: 'world',
            config: true,
            type: String,
            default: 'user',
            choices: {
                'player': 'Settings.TrackedActors.playerActors',
                'item': 'Settings.TrackedActors.actorsWithItem',
                'user': 'Settings.TrackedActors.userActors',
            },
            requiresReload: true
          });
    }
}