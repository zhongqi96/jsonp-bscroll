<template>
  <div class="slider" ref="sliderContainer">
    <div class="slider-container" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span v-for="(item, index) in dots" class="dot" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted () {
      setTimeout(() => {
        this._initWidth()
        this._initDots()
        this._initBScroll()
      }, 20)
    },
    destroyed () {
      clearTimeout(this.timer)
    },
    methods: {
      _initWidth () {
        this.sliderGroup = this.$refs.sliderGroup
        this.singleWidth = this.sliderGroup.clientWidth
        this.slider = this.sliderGroup.children
        this.fullWidth = 0
        for (let i = 0; i < this.slider.length; i++) {
          this.slider[i].style.width = this.singleWidth + 'px'
          this.slider[i].className = this._addClass(this.slider[i], 'slider-item')
          this.fullWidth += this.singleWidth
        }
        if (this.loop) {
          this.fullWidth += 2 * this.singleWidth
        }
        this.sliderGroup.style.width = this.fullWidth + 'px'
      },
      _initBScroll () {
        this.scroll = new BScroll(this.$refs.sliderContainer, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          click: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        this.scroll.on('scrollEnd', () => {
          let pageIndex = this.scroll.getCurrentPage().pageX
          this.currentPageIndex = pageIndex
          if (this.loop) {
            this.currentPageIndex --
          }
          this._play()
        })
        this.scroll.on('beforeScrollStart', () => {
          clearTimeout(this.timer)
        })
        this._play()
      },
      _play () {
        this.timer = setTimeout(() => {
          let pageIndex = this.currentPageIndex + 1
          pageIndex = this.loop ? (pageIndex + 1) : pageIndex
          this.scroll.goToPage(pageIndex, 0, 400)
        }, this.interval)
      },
      _initDots () {
        this.dots = new Array(this.slider.length)
      },
      _addClass (el, addName) {
        if (this._hasClass(el, addName)) {
          return
        }
        let str = el.className.split('')
        str.push(addName)
        str.join('')
        return str
      },
      _hasClass (el, addName) {
        let reg = new RegExp('(^|\\s)' + addName + '($|\\s)')
        return reg.test(el.className)
      }
    }
  }
</script>
<style lang="less" scoped>
.slider{
  position: relative;
  overflow: hidden;
  width:100%;
  font-size:0;
  img{
    width:100%;
  }
  .slider-item{
    float: left;
  }
  .slider-container:after{
    display: block;
    content: '';
    visibility: hidden;
    clear: both;
  }
}
  .dots{
    position: absolute;
    bottom:5px;
    width:100%;
    height:10px;
    left:0;
    text-align: center;
    .dot{
      display: inline-block;
      width:10px;
      height:10px;
      border-radius: 5px;
      background: #333;
      margin:0 2px;
      &.active{
        background: #990000;
      }
    }
  }
</style>
