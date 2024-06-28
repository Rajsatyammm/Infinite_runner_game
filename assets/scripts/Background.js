cc.Class({
    extends: cc.Component,

    properties: {
        speed: 50,
    },

    onLoad() {

    },

    start() {

    },

    update(dt) {
        this.node.children.forEach(node => {
            this.move(node, dt * this.speed)
        })
    },

    move(node, offSet) {
        const spriteRightX = node.x + node.width / 2
        const leftScreenX = -cc.winSize.width / 2
        if (spriteRightX <= leftScreenX) {
            node.x += node.width * 2 - offSet
        }
        else {
            node.x -= offSet
        }
    }
});
