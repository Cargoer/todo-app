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
    <div>地图信息：</div>
    <div class="map_area" v-if="showMap">
      <iframe id="mapPage" width="100%" height="100%" frameborder=0
        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=VHBBZ-6CGLD-RD24X-H2TKY-2FE2H-YMFCJ&referer=choose_address">
      </iframe>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      themeColor: 1,
      showMap: false,
      deliveryAddress: {}
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
</style>
