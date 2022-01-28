<template>
  <div class="map_area">
    <iframe id="mapPage" width="100%" height="100%" frameborder=0
      src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=VHBBZ-6CGLD-RD24X-H2TKY-2FE2H-YMFCJ&referer=choose_address">
    </iframe>
    <button class="button" @click="goback">返回</button>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      loc: {}
    }
  },
  mounted() {
    let that = this
    window.addEventListener('message', function(event) {
      let {data} = event
      console.log("data:", data)
      if(data && data.module == 'locationPicker') {
        console.log("loc data:", data)
        that.loc = data
        that.goback()
      }
    })
  },
  methods: {
    goback() {
      this.$router.push('/todolist')
    }
  }
}
</script>

<style scoped>
.map_area {
  width: 600px;
  height: 800px;
}
.button {
  width: 150px;
  height: 60px;
}
</style>