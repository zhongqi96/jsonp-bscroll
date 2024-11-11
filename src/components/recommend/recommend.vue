<template>
  <div class="recommend">
    <scroll ref="scroll"  class="recommend-content"  v-if="disclist.length>0">
      <div>
        <div v-if="sliderList.length">
          <slider >
            <div v-for="item in sliderList" >
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="disclist">
          <ul>
            <li v-for="item in disclist">
              <div class="left">
                <img v-lazy="item.imgurl" alt="">
              </div>
              <div class="right">
                {{item.dissname}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import {getSliderList, getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import Slider from '../slider/slider.vue'
  import Scroll from '../../base/scroll.vue'
  export default {
    name: 'recommend',
    data () {
      return {
        sliderList: [],
        disclist: []
      }
    },
    created () {
      this._initSlider()
      this._getDiscList()
    },
    methods: {
      loadImage () {
        if (!this.checkloaded) {
          this.checkloaded = true
          console.log(this.$refs.scroll)
          this.$refs.scroll.refresh()
        }
      },
      _initSlider () {
        getSliderList().then((res) => {
          if (res.code === ERR_OK) {
            this.sliderList = res.data.slider
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.disclist = res.data.list
          }
        })
      }
    },
    components: {
      Slider,
      Scroll
    }
  }
</script>
<style lang="less" scoped="">
  .disclist{
    li{
      &:after{
        display: block;
        content: '';
        clear: both;
        visibility: hidden;
      }
    }
    .left{
      width:70px;
      height:70px;
      float: left;
      img{
        width:100%;
        height:100%;
      }
    }
    .right{
      font-size:12px;
      width: 220px;
      float: right;
    }
  }
  .recommend-content{
    height: 100%;
    overflow: hidden;
  }
  .recommend{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
  }
</style>
