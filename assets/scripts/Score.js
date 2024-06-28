let Globals = require('Globals')

cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            default: null,
            type: cc.Label,
        },
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            cc.director.loadScene('Scene')
        })
    },

    start() {
        this.score.string = `Score : ${Globals.score.toString()}`
    },

    // update (dt) {},
});
