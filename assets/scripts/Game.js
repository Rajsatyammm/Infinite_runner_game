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
        },
        gameFinished: {
            default: null,
            type: cc.Label,
        },
        backgroundNode: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad() {
        this.enablePhysics()

        this.hero.on('score', () => {
            ++Globals.score
            this.score.string = Globals.score.toString()
        })

        this.hero.on('die', () => {
            this.gameFinished.string = `Game Finished
Score :: ${Globals.score}`
            this.node.children.forEach(child => {
                if (child.name === 'Platforms' || child.name === 'hero' || child.name === 'score') {
                    child.destroy()
                }
            })``
            this.backgroundNode.getComponent('Background').stopMovingBackground = true
        })

    },

    start() {
    },

    // update (dt) {},

    enablePhysics() {
        let physicsManager = cc.director.getPhysicsManager()
        physicsManager.enabled = true

        let collisionManager = cc.director.getCollisionManager()
        collisionManager.enabled = true
    },

});
