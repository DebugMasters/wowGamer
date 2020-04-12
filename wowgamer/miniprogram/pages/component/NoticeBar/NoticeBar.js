const VALID_MODE = ['closeable'];
const FONT_COLOR = '#f60';
const BG_COLOR = '#fff7cc';

Component({
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    properties: {
        closable: {
            type: Boolean,
            value: false
        },
        icon: {
            type: String,
            value: ''
        },
        loop: {
            type: Boolean,
            value: false
        },
        // 背景颜色
        backgroundcolor: {
            type: String,
            value: '#fefcec'
        },
        // 字体及图标颜色
        color: {
            type: String,
            value: '#f76a24'
        },
        // 滚动速度
        speed: {
            type: Number,
            value: 1000
        },
        contentList: {
            type: Array,
            value: []
        }
    },

    data: {
        show: true,
        wrapWidth: 0,
        width: 0,
        duration: 0,
        animation: null,
        timer: null,
        content: '',
        contentIndex: 0
    },
    detached() {
        this.destroyTimer();
    },
    ready() {
        if (this.data.loop) {
            this.initAnimation();
        }
    },

    methods: {
        initAnimation() {
            this.setData({
                content: this.properties.contentList[0],
                contentIndex: 0
            })
            wx.createSelectorQuery().in(this).select('.notice-bar-content-wrap').boundingClientRect((wrapRect) => {
                wx.createSelectorQuery().in(this).select('.notice-bar-content').boundingClientRect((rect) => {
                    const duration = wrapRect.width / 40 * this.data.speed;
                    const animation = wx.createAnimation({
                        duration: duration,
                        timingFunction: "linear",
                    });
                    this.setData({
                        wrapWidth: wrapRect.width,
                        width: rect.width,
                        duration: duration,
                        animation: animation
                    }, () => {
                        this.startAnimation();
                    });
                }).exec();

            }).exec();
        },
        startAnimation() {
            //reset
            if (this.data.animation.option.transition.duration !== 0) {
                this.data.animation.option.transition.duration = 0;
                const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step();
                this.setData({
                    animationData: resetAnimation.export(),
                    content: this.properties.contentList[this.data.contentIndex]
                });
            }
            this.data.animation.option.transition.duration = this.data.duration;
            const animationData = this.data.animation.translateX(-this.data.width).step();
            setTimeout(() => {
                this.setData({
                    animationData: animationData.export(),
                    content: this.properties.contentList[this.data.contentIndex]
                });
            }, 100);
            const timer = setTimeout(() => {
                if(this.data.contentIndex < this.properties.contentList.length - 1) {
                    this.setData({
                        contentIndex: this.data.contentIndex + 1
                    })
                } else {
                    this.setData({
                        contentIndex: 0
                    })
                }
                this.startAnimation();
            }, this.data.duration);
            this.setData({
                timer,
            });
        },
        destroyTimer() {
            if (this.data.timer) {
                clearTimeout(this.data.timer);
            }
        },
        handleClose() {
            this.destroyTimer();
            this.setData({
                show: false,
                timer: null
            });
        }
    }
});
