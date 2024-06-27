let Globals = require('Globals')

cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node,
        },
        score: {
            default: null,
            type: cc.Label,
        }
    },

    onLoad() {
        this.enablePhysics()

        this.hero.on('score', () => {
            ++Globals.score
            this.score.string = Globals.score.toString()
        })
    },

    start() {
    },

    enablePhysics() {
        let physicsManager = cc.director.getPhysicsManager()
        physicsManager.enabled = true

        let collisionManager = cc.director.getCollisionManager()
        collisionManager.enabled = true
    },

    // update (dt) {},
});
