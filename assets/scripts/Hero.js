cc.Class({
    extends: cc.Component,

    properties: {
        jumpSpeed: cc.v2({ x: 0, y: 300 }),
        maxJumpDistance: 300,
        jumpSprite: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    start() {
    },

    onBeginContact() {
        this.isTouching = true
    },

    onEndContact() {
        this.isTouching = false
    },

    jump() {
        if (this.isTouching) {
            this.body.linearVelocity = this.jumpSpeed
            this.isJumpFinished = false
            this.isJumping = true
        }

    },

    update() {
        if (this.isKeyPressed) {
            this.jump()
        }
    },


    // LIFE- CYCLE CALLBACKS:
    onLoad() {

    },

    start() {
        this.body = this.getComponent(cc.RigidBody);
        this.isJumping = false;
        this.jumpKeyPressed = false;
        this.touching = false;
        this.startJumpY = false;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, event => {
            switch (event.keyCode) {
                case cc.macro.KEY.space:
                    this.jumpKeyPressed = true;
                    break;
            }
        });

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, event => {
            switch (event.keyCode) {
                case cc.macro.KEY.space:
                    this.jumpKeyPressed = false;
                    this.isJumping = false;
                    break;
            }
        });

        this.node.parent.on(cc.Node.EventType.TOUCH_START, () => {
            this.jumpKeyPressed = true;
        });

        this.node.parent.on(cc.Node.EventType.TOUCH_END, () => {
            this.jumpKeyPressed = false;
            this.isJumping = false;
        });
    },

    onBeginContact() {
        this.touching = true;
    },

    onEndContact() {
        this.touching = false;
    },

    update(dt) {
        if (this.jumpKeyPressed) {
            this.jump();
        }

        if (this.node.y < -cc.winSize.height / 2) {
            this.node.emit('die');
        }
    },

    jump() {
        if (this.touching) {
            //  remember hero's start position
            this.startJumpY = this.node.y;
            this.jumpFinished = false;
            this.isJumping = true;

            //  set hero's speed on Y axis
            this.body.linearVelocity = this.jumpSpeed;

            //else if hero is jumping and jump is not finished
        } else if (this.isJumping && !this.jumpFinished) {

            const jumpDistance = this.node.y - this.startJumpY;

            //  if jump distance is not maximum
            if (jumpDistance < this.maxJumpDistance) {
                //    keep hero's Y speed
                this.body.linearVelocity = this.jumpSpeed;

            } else {
                this.jumpFinished = true;
            }
        }
    }


});