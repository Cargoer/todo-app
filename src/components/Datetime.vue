<template>
  <div class="datetime">
    <div class="date">
      {{year}}/{{month}}/{{day}}
    </div>
    <div class="time">
      {{hour}}: {{minute}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datetime: new Date()
    }
  },
  computed: {
    year() {
      return this.datetime.getFullYear()
    },
    month() {
      return this.datetime.getMonth()+1
    },
    day() {
      return this.datetime.getDate()
    },
    hour() {
      return this.datetime.getHours()
    },
    minute() {
      let minute = this.datetime.getMinutes()
      return minute < 10? '0'+minute: minute
    },
  },
  created() {
    setInterval(() => {
      this.datetime = new Date()
    }, 1000)
  }
}
</script>

<style>
.datetime {
  display: flex;
  gap: 10px;
}
.date,
.time {
  width: 70px;
  height: 20px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  padding: 8px;
  box-shadow: 1px 1px 5px var(--datetime-shadow-color);
  border-radius: 6px;
}
</style>