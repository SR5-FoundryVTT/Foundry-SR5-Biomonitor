
export default class GetActors{

    static getActors() {
        return game.actors.filter(actor => actor.hasPlayerOwner && actor.type == 'character')
    }
}