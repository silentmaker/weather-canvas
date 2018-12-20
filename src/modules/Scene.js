import {
  Flake, Cloud, Star, Drop,
} from './Spirit';

class Scene {
  constructor({ viewPort, context }) {
    if (viewPort == null || context == null) {
      throw new Error('viewPort and context mustn\'t be falsy');
    }

    this.actors = [];
    this.viewPort = viewPort;
    this.context = context;
  }

  createActor(Actor, amount) {
    if (this.actors.length >= amount) return;

    for (let i = 0; i < amount; i += 1) {
      this.actors.push(new Actor(this.viewPort));
    }
  }

  destory() {
    this.actors = [];
    this.context = null;
    this.viewPort = null;
  }
}

export class Snowy extends Scene {
  createFlakes() {
    this.createActor(Flake, this.viewPort.width / 4);
  }

  run() {
    this.createFlakes();
    requestAnimationFrame(this.paint.bind(this));
  }

  paint() {
    if (this.destoryed) return;

    this.context.clearRect(0, 0, this.viewPort.width, this.viewPort.height);

    this.actors.forEach((flake) => {
      flake.update();

      this.context.save();

      this.context.fillStyle = '#fff';
      this.context.beginPath();
      this.context.arc(flake.meta.x, flake.meta.y, flake.meta.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = flake.meta.alpha;
      this.context.fill();

      this.context.restore();
    });

    requestAnimationFrame(this.paint.bind(this));
  }
}

export class Cloudy extends Scene {
  createClouds() {
    this.createActor(Cloud, 10);
  }

  run() {
    console.log('cloud');
    console.log(this);
    this.createClouds();
    requestAnimationFrame(this.paint.bind(this));
  }

  paint() {
    if (this.destoryed) return;

    this.context.clearRect(0, 0, this.viewPort.width, this.viewPort.height);

    this.actors.forEach((cloud) => {
      cloud.update();

      this.context.save();

      this.context.fillStyle = '#f1f2f3';
      this.context.beginPath();
      this.context.arc(cloud.meta.x, cloud.meta.y, cloud.meta.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = cloud.meta.alpha;
      this.context.fill();

      this.context.restore();
    });

    requestAnimationFrame(this.paint.bind(this));
  }
}

export class Starry extends Scene {
  run() {
    requestAnimationFrame(this.paint.bind(this));
  }

  paint() {
    if (this.destroyed) return;

    this.context.clearRect(0, 0, this.viewPort.width, this.viewPort.height);

    if (this.actors.length < this.viewPort.width / 3) this.actors.push(new Star(this.viewPort));

    this.actors.forEach((star) => {
      star.update();

      this.context.save();

      this.context.fillStyle = '#fff';
      this.context.beginPath();
      this.context.arc(star.meta.x, star.meta.y, star.meta.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = star.meta.alpha;
      this.context.fill();

      this.context.restore();
    });

    requestAnimationFrame(this.paint.bind(this));
  }
}

export class Rainy extends Scene {
  createDrops() {
    this.createActor(Drop, this.viewPort.width / 2);
  }

  run() {
    this.createDrops();
    requestAnimationFrame(this.paint.bind(this));
  }

  paint() {
    if (this.destroyed) return;

    this.context.clearRect(0, 0, this.viewPort.width, this.viewPort.height);

    this.actors.forEach((drop) => {
      drop.update();

      this.context.save();
      this.context.fillStyle = '#fff';
      this.context.beginPath();
      this.context.arc(drop.meta.x, drop.meta.y, drop.meta.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = drop.meta.alpha;
      this.context.fill();

      this.context.restore();
    });
    requestAnimationFrame(this.paint.bind(this));
  }
}
