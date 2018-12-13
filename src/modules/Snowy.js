const rand = (min, max) => Math.random() * (max - min) + min;

class Flake {
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
    this.x = rand(0, window.innerWidth);
    this.y = rand(0, -window.innerHeight);
    this.vx = rand(-3, 3);
    this.vy = rand(2, 5);
    this.radius = rand(1, 4);
    this.alpha = rand(0.1, 0.9);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.radius > window.innerHeight) {
      this.reset();
    }
  }
}

export default class Snowy {
  constructor({ canvas, context }) {
    this.canvas = canvas;
    this.context = context;
    this.flakes = [];
    this.paint = this.paint.bind(this);
    this.createFlakes();
    requestAnimationFrame(this.paint);
  }

  createFlakes() {
    const amount = window.innerWidth / 4;
    this.flakes = [];
    for (let i = 0; i < amount; i += 1) {
      this.flakes.push(new Flake());
    }
  }

  paint() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.flakes.map((flake) => {
      flake.update();
      this.context.save();
      this.context.fillStyle = '#fff';
      this.context.beginPath();
      this.context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = flake.alpha;
      this.context.fill();
      this.context.restore();
      return false;
    });
    requestAnimationFrame(this.paint);
  }
}
