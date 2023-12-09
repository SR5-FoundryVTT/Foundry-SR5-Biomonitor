
export default class GetActors{

    static getActors() {
        let types = [];

      if(game.settings.get('sr5-biomonitor', 'trackCharacters')) {
        types.push('character')
      }

      if(game.settings.get('sr5-biomonitor', 'trackCritters')) {
        types.push('critter')
      }

      if(game.settings.get('sr5-biomonitor', 'trackVehicles')) {
        types.push('vehicle')
      }

      let actors = this.getActorsOfType(types)

      switch(game.settings.get('sr5-biomonitor', 'trackedActors')) {
        case 'player' : return this.filterPlayerActors(actors)
        case 'item' : return this.filterActorsWithItem()
        case 'user' : return this.filterUserActors(actors)
        default: return actors;
      }

    }

    static getActorsOfType(types) {
        return game.actors.filter(actor =>types.includes(actor.type))
    }

    static filterPlayerActors(actors) {
        return actors.filter(actor => actor.hasPlayerOwner)
    }

    static filterActorsWithItem(actors, items) {
        return actors.filter(actor => true)
    }

    static filterUserActors(actors) {
        let userActors = game.users.map(user => user.character).filter(actor => actor != null);
        return userActors.filter(actor => actors.includes(actor));
    }
}