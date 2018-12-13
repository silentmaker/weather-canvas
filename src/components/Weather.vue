<template>
  <div ref="container"></div>
</template>

<script>
import Snowy from '../modules/Snowy';
import Rainy from '../modules/Rainy';
import Starry from '../modules/Starry';
import Cloudy from '../modules/Cloudy';

export default {
  name: 'weather',
  props: {
    type: {
      type: String,
      default: 'snowy',
    },
  },
  mounted() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.$refs.container.appendChild(this.canvas);
    window.addEventListener('resize', this.resize);
    this.resize();
    this.init();
  },
  watch: {
    type: 'init',
  },
  methods: {
    init() {
      this.weather = null;
      this[this.type]();
    },
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    windy() {
      this.weather = new Snowy({ context: this.context });
    },
    rainy() {
      this.weather = new Rainy({ context: this.context });
    },
    cloudy() {
      this.weather = new Cloudy({ context: this.context });
    },
    foggy() {
      this.weather = new Snowy({ context: this.context });
    },
    starry() {
      this.weather = new Starry({ context: this.context });
    },
    snowy() {
      this.weather = new Snowy({ context: this.context });
    },
  },
};
</script>

<style scoped lang="less">

</style>
