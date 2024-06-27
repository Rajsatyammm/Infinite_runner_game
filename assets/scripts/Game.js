cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.enablePhysics()
    },

    start() {
    },

    enablePhysics() {
        let physicsManager = cc.director.getPhysicsManager()
        physicsManager.enabled = true
    },

    // update (dt) {},
});
