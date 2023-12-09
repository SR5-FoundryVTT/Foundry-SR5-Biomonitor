
export default class ActorData{

    static getPhysicalTrack(actor) {
        return actor?.system.track?.physical
    }

    static getStunTrack(actor) {
        return actor?.system.track?.stun
    }

    static getStatus(actor) {
        return actor?.statuses ?? []
    }

    static getImage(actor) {
        return actor?.img ?? "icons/svg/mystery-man.svg"
    }

}