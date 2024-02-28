
export default class ActorData{

    static getPhysicalTrack(actor) {
        return actor?.system.track?.physical
    }

    static getStunTrack(actor) {
        return actor?.system.track?.stun
    }

    static getStatus(actor) {
        let statusIds = actor?.statuses ?? []
        
        let status = [];
        statusIds.forEach(search => {
            let statusEffect = CONFIG.statusEffects.filter(effect => effect.id == search)[0]
            status.push({
                name: statusEffect.name,
                img: statusEffect.icon
            })
        });
        return status;
    }

    static getImage(actor) {
        return actor?.img ?? "icons/svg/mystery-man.svg"
    }

    static getHeartbeats(actor) {
        if(!game.modules.get("JB2A_DnD5e")?.active) {
            return null;
        }

        if(this.isDead(actor)) {
            return 'modules/JB2A_DnD5e/Library/Generic/UI/HeartbeatECG01_01_Regular_Green_400x400.webm'; //dead
        }

        if(this.isUnconcious(actor)) {
            return 'modules/JB2A_DnD5e/Library/Generic/UI/HeartbeatECG01_02_Regular_Green_400x400.webm'; //unconcious
        }

        return null;
    }

    static isUnconcious(actor) {
        return actor?.system.track?.physical.value == actor?.system.track?.physical.base || actor?.system.track?.stun.value == actor?.system.track?.stun.base
    }

    static isDead(actor) {
        return this.isUnconcious(actor) && actor?.system.track?.physical.overflow.value >= actor?.system.track?.physical.overflow.max;
    }

}