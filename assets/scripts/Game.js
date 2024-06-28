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
        },
        music: {
            default: null,
            type: cc.AudioClip,
        },
        sound: {
            default: null,
            type: cc.AudioClip,
        }
    },

    onLoad() {
        this.enablePhysics()
        Globals.score = 0
        if (!cc.audioEngine.isPlayingMusic)
            cc.audioEngine.playMusic(this.music, true)

        this.hero.on('score', () => {
            cc.audioEngine.play(this.sound)
            ++Globals.score
            this.score.string = Globals.score.toString()
        })

        this.hero.once('die', () => {
            cc.audioEngine.stopMusic(this.music)
            cc.director.loadScene('Score')
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
