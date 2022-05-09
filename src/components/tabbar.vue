<template>
  <div class="tabbar">
    <div class="tabs">
      <button @click="goto('/collection')">Collection</button>
      <button @click="goto('/todolist')">Todo List</button>
      <button @click="goto('/programlist')">Program List</button>
      <button @click="goto('/wishlist')">Wish List</button>
    </div>
    <!-- themeColor需要回传给app.vue -->
    <select name="themeColor" id="themeColor" v-model="themeColor">
      <option value="1">颜色1</option>
      <option value="2">颜色2</option>
    </select>
    <button class="button" @click="goChooseAddress">地图选点</button>
    <div>【地图信息】：</div>
    <div>城市名称：{{deliveryAddress.cityname}}</div>
    <div>地点名称：{{deliveryAddress.poiname}}</div>
    <div>经纬度：{{deliveryAddress.latlng.lat}} - {{deliveryAddress.latlng.lng}}</div>
    <div class="set_default_area">
      <div>设置默认地址</div>
      <div class="set_default_switch" :style="setDefaultBg" @click="isSetDefault = !isSetDefault">
        <div class="switch_pointer" :style="pointerPosition"></div>
      </div>
    </div>
    <div class="map_area" v-if="showMap">
      <iframe id="mapPage" width="100%" height="100%" frameborder=0
        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=VHBBZ-6CGLD-RD24X-H2TKY-2FE2H-YMFCJ&referer=choose_address">
      </iframe>
    </div>
    <button class="button" @click="backToPrev">返回</button>
    <map name="map"></map>
  </div>
</template>

<script>

export default {
  data() {
    return {
      themeColor: 1,
      showMap: false,
      deliveryAddress: {
        cityname: undefined,
        latlng: {lat: undefined, lng: undefined}
      },
      isSetDefault: false,
    }
  },
  computed: {
    setDefaultBg() {
      return this.isSetDefault? 'background: #fe7e52;': 'background: #efe7e4;'
    },
    pointerPosition() {
      return this.isSetDefault? 'left: 51px;': 'left: 4px;'
    }
  },
  mounted() {
    let that = this
    window.addEventListener('message', function(event) {
      let {data} = event
      console.log("data:", data)
      if(data && data.module == 'locationPicker') {
        console.log("loc data:", data)
        that.deliveryAddress = data
        that.showMap = false
      }
    })
  },
  methods: {
    goto(url) {
      this.$router.push(url)
      console.log(this.$store.state.listMode)
    },
    goChooseAddress() {
      // this.$router.push('/chooseAddress')
      this.showMap = true
    },
    backToPrev() {
      // this.$router.go(-1)
      this.$router.back()
    }
  },
}
</script>

<style>
.tabbar {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.tabs {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.tabs button {
  width: 120px;
  height: 50px;
  /* padding: 15px 20px; */
  background-color: var(--list-tab-color);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;

  border: none;
  outline: none;
}
.button {
  width: 150px;
  height: 60px;
}
.map_area {
  height: 100vh;
  position: fixed;
  top: 0;
  /* bottom: 0; */
  left: 0;
  right: 0;
  z-index: 999;
}
.set_default_area {
  display: flex;
}
.set_default_area > .set_default_switch {
  width: 99px;
  height: 52px;
  background: #efe7e4;
  border-radius: 26px;
  position: relative;
  margin-left: 10px;
  /* display: flex;
  align-items: center; */
  transition: .5s;
}
.set_default_area > .set_default_switch > .switch_pointer {
  width: 44px;
  height: 44px;
  background: #ffffff;
  border-radius: 100%;
  box-shadow: -2px 0px 20px 2px rgba(237,227,223,0.54); 
  position: absolute;
  top: 4px;
  transition: .5s;
}
</style>
