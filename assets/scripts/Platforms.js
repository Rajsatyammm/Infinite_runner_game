cc.Class({
    extends: cc.Component,

    properties: {
        xOffsetMin: 60,
        xOffsetMax: 150,
        yOffsetMin: -100,
        yOffsetMax: 100,
        tilesCountMin: 2,
        tilesCountMax: 4,
        platform: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad() {
        this.platforms = [];
    },

    generateRandomData() {
        let data = {
            tilesCount: 0,
            x: 0,
            y: 0
        };

        // logic
        const xOffset = this.xOffsetMin + Math.random() * (this.xOffsetMax - this.xOffsetMin);
        const yOffset = this.yOffsetMin + Math.random() * (this.yOffsetMax - this.yOffsetMin);
        data.x = this.current.node.x + this.current.node.width + xOffset;
        let y = this.current.node.y + yOffset;
        const screenTop = cc.winSize.height / 2;
        const screenBottom = -cc.winSize.height / 2;
        y = Math.min(y, screenTop - this.current.node.height * 2);
        y = Math.max(y, screenBottom + this.current.node.height);
        data.y = y;
        data.tilesCount = this.tilesCountMin + Math.floor(Math.random() * (this.tilesCountMax - this.tilesCountMin));
        return data;
    },

    start() {
        this.createPlatform({
            tilesCount: 2,
            x: -200,
            y: -200
        });
    },

    createPlatform(data) {
        if (!data) {
            data = this.generateRandomData();
        }
        // const platform = this.platforms.find(platform => !platform.active);
        const nodeOne = cc.instantiate(this.platform);
        this.node.addChild(nodeOne);
        this.current = nodeOne.getComponent('Platform');
        // this.platforms.push(node
        // );
        // this.current.active = true;
        this.current.init(data.tilesCount, data.x, data.y);
    },

    update(dt) {
        const screenRight = cc.winSize.width / 2;
        const currentPlatformRight = this.current.node.x + this.current.node.width;
        if (currentPlatformRight < screenRight) {
            this.createPlatform();
        }
    },
}); 