import _ from './Utils';

class Star {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.alpha = 0;
    this.reset();
  }

  reset() {
    this.x = _.rand(0, window.innerWidth);
    this.y = _.rand(0, window.innerHeight);
    this.radius = _.rand(1, 2);
    this.alpha = _.rand(0.1, 1);
  }

  update() {
    this.radius = _.rand(1, 2);
  }
}

export default class Starry {
  constructor({ context }) {
    this.context = context;
    this.stars = [];
    this.paint = this.paint.bind(this);
    requestAnimationFrame(this.paint);
  }

  paint() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (this.stars.length < window.innerWidth / 3) this.stars.push(new Star());
    this.stars.map((star) => {
      star.update();
      this.context.save();
      this.context.fillStyle = '#fff';
      this.context.beginPath();
      this.context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = star.alpha;
      this.context.fill();
      this.context.restore();
      return false;
    });
    requestAnimationFrame(this.paint);
  }
}
