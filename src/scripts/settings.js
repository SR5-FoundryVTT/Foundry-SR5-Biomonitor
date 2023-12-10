
export default class Settings{

    static addAllSettings() {
        game.settings.register('sr5-biomonitor', 'trackCharacters', {
            name: 'Settings.ActorTypes.trackCharacters',
            scope: 'world',
            config: game.user.isGM,
            type: Boolean,
            default: 'true',
            requiresReload: true
          });

          game.settings.register('sr5-biomonitor', 'trackCritters', {
            name: 'Settings.ActorTypes.trackCritters',
            scope: 'world',
            config: game.user.isGM,
            type: Boolean,
            default: 'false',
            requiresReload: true
          });

          game.settings.register('sr5-biomonitor', 'trackVehicles', {
            name: 'Settings.ActorTypes.trackVehicles',
            scope: 'world',
            config: game.user.isGM,
            type: Boolean,
            default: 'false',
            requiresReload: true
          });

          game.settings.register('sr5-biomonitor', 'trackedActors', {
            name: 'Settings.TrackedActors.trackedActors',
            scope: 'world',
            config: game.user.isGM,
            type: String,
            default: 'user',
            choices: {
                'player': 'Settings.TrackedActors.playerActors',
                'item': 'Settings.TrackedActors.actorsWithItem',
                'user': 'Settings.TrackedActors.userActors',
            },
            requiresReload: true
          });

          game.settings.register('sr5-biomonitor', 'necessaryItem', {
            name: 'Settings.NecessaryItem.necessaryItem',
            scope: 'world',
            config: game.user.isGM,
            type: String,
            default: 'Biomonitor',
            requiresReload: true
          });
    }
}