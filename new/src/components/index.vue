<template>
  <div class="index"></div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {};
  },
  created() {
    console.log(this.$root.websock)
  },
  methods: {},
  mounted() {
    var _this = this;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/public/css/index.css';
</style>
