
export default class ActorData{

    static getPhysicalTrack(actor) {
        return actor?.system.tracks.physical
    }

    static getStunTrack(actor) {
        return actor?.system.tracks.stun
    }

    static getStatus(actor) {
        return actor?.status
    }

    static getImage(actor) {
        return actor?.img ?? "icons/svg/mystery-man.svg"
    }

}