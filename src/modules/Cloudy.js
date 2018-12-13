import _ from './Utils';

class Cloud {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.alpha = 0;
    this.reset();
  }

  reset() {
    this.x = _.rand(0, window.innerWidth);
    this.y = _.rand(0, window.innerHeight / 8);
    this.vx = _.rand(-1, 1);
    this.vy = _.rand(-1, 1);
    this.radius = _.rand(window.innerWidth / 6, window.innerWidth / 4);
    this.alpha = _.rand(0.1, 0.2);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y < 0 || this.y > window.innerHeight / 8) {
      this.vx = -this.vx;
      this.vy = -this.vy;
    }
  }
}

export default class Cloudy {
  constructor({ canvas, context }) {
    this.canvas = canvas;
    this.context = context;
    this.clouds = [];
    this.paint = this.paint.bind(this);
    this.createClouds();
    requestAnimationFrame(this.paint);
  }

  createClouds() {
    const amount = 10;
    this.clouds = [];
    for (let i = 0; i < amount; i += 1) {
      this.clouds.push(new Cloud());
    }
  }

  paint() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.clouds.map((cloud) => {
      cloud.update();
      this.context.save();
      this.context.fillStyle = '#f1f2f3';
      this.context.beginPath();
      this.context.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = cloud.alpha;
      this.context.fill();
      this.context.restore();
      return false;
    });
    requestAnimationFrame(this.paint);
  }
}
