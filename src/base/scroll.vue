<template>
  <div  ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'slider',
    props: {
      data: {
        type: Array,
        default: null
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: null
      }
    },
    mounted () {
      setTimeout(() => {
        this._initBScroll()
      }, 20)
    },
    destroyed () {
      clearTimeout(this.timer)
    },
    methods: {
      _initBScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: this.click,
          probeType: this.probeType
        })
        this.scroll.on('scrollEnd', () => {
          console.log(1)
        })
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () {
        console.log(1000)
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
