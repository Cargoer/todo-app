<template>
  <div class="login">
    <h1>登录</h1>
    <div class="login-api-key">
      <label for="api-key">API Key</label>
      <input type="text" name="api-key" id="api-key" placeholder="请输入API Key" v-model.trim="api_key">
    </div>
    <div class="login-base-key">
      <label for="api-key">base标识</label>
      <input type="text" name="base-key" id="base-key" placeholder="请输入base标识" v-model.trim="base_key">
    </div>
    <button @click="submitAPIKey">登录</button>
    <p>没有API Key？<a href="https://airtable.com/api">去airtable获取</a></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_key: '',
      base_key: '',
    }
  },
  methods: {
    submitAPIKey() {
      this.$store.commit("initBase", {
        api_key: this.api_key,
        base_key: this.base_key,
      })
    }
  }
}
</script>