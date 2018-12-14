import _ from './Utils';

class Drop {
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
    this.y = _.rand(0, -window.innerHeight);
    this.vx = _.rand(0, -2);
    this.vy = _.rand(8, 10);
    this.radius = 1;
    this.alpha = _.rand(0.2, 1);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.radius > window.innerHeight) {
      this.reset();
    }
  }
}

export default class Rainy {
  constructor({ context }) {
    this.context = context;
    this.drops = [];
    this.paint = this.paint.bind(this);
    this.destroy = this.destroy.bind(this);
    this.createDrops();
    requestAnimationFrame(this.paint);
  }

  createDrops() {
    const amount = window.innerWidth / 2;
    this.drops = [];
    for (let i = 0; i < amount; i += 1) {
      this.drops.push(new Drop());
    }
  }

  paint() {
    if (this.destroyed) return;
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.drops.map((drop) => {
      drop.update();
      this.context.save();
      this.context.fillStyle = '#fff';
      this.context.beginPath();
      this.context.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = drop.alpha;
      this.context.fill();
      this.context.restore();
      return false;
    });
    requestAnimationFrame(this.paint);
  }

  destroy() {
    this.destroyed = true;
  }
}
