<template>
  <div id="app">
    <div class="controls">
      <span>Let's Make It</span>
      <ul class="types"
        :style="{transform: `translateY(${(types.length - current - 1) * 32}px)`}">
        <li v-for="(type, index) in types" :key="type"
          :style="{
            transform: `scale(${1 - Math.abs(index - current) * 0.1})`,
            opacity: `${1 - Math.abs(index - current) * 0.15}`,
          }"
          @click="current = index">{{ capitalize(type) }}</li>
      </ul>
      <span>Now!</span>
    </div>

    <Weather :type="types[current]" />
  </div>
</template>

<script>
import _ from './modules/Utils';
import Weather from './components/Weather.vue';

export default {
  name: 'app',
  components: { Weather },
  data() {
    return {
      types: ['foggy', 'windy', 'cloudy', 'rainy', 'starry', 'snowy'],
      current: 4,
      capitalize: _.capitalize,
    };
  },
};
</script>

<style lang="less">
body,html,ul {
  margin: 0;
  padding: 0;
}
body {
  background-color: #333;
}
.controls {
  font-family: 'Courier New', Courier, monospace;
  position: absolute;
  bottom: 160px;
  left: 20px;
  line-height: 32px;
  font-size: 24px;
  color: #fff;

  .types {
    display: inline-block;
    list-style: none;
    padding: 0 16px;
    vertical-align: baseline;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    -webkit-tap-highlight-color: transparent;

    li {
      line-height: 32px;
    }
  }
}
</style>
