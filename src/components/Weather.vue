<template>
  <div ref="container"></div>
</template>

<script>
import {
  Snowy, Rainy, Starry, Cloudy,
} from '../modules/Scene';

const weatherMap = new Map([
  ['windy', args => new Snowy(args)],
  ['rainy', args => new Rainy(args)],
  ['cloudy', args => new Cloudy(args)],
  ['foggy', args => new Snowy(args)],
  ['starry', args => new Starry(args)],
  ['snowy', args => new Snowy(args)],
]);

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

    this.viewPort = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.resize();
    this.init();
  },
  watch: {
    type: 'init',
  },
  methods: {
    init() {
      if (this.weather && this.weather.destroy) this.weather.destroy();

      const options = { context: this.context, viewPort: this.viewPort };

      this.weather = weatherMap.get(this.type)(options);
      this.weather.run();
    },
    resize() {
      this.canvas.width = this.viewPort.width;
      this.canvas.height = this.viewPort.height;
    },
  },
};
</script>

<style scoped lang="less">

</style>
