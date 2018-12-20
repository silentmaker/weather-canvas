import _ from './Utils';

class Spirit {
  constructor(viewPort, range) {
    this.viewPort = viewPort;

    this.meta = {
      // position
      x: 0,
      y: 0,
      // move rate
      vx: 0,
      vy: 0,
      // options
      radius: 0,
      alpha: 0,
    };

    this.range = {
      x: [0, viewPort.width],
      y: [0, viewPort.height],
      vx: [0, -2],
      vy: [8, 10],
      radius: [1, 2],
      alpha: [0.1, 1],
      ...range,
    };
  }

  getRandOrValue(field) {
    return Array.isArray(this.range[field]) ? _.rand(...this.range[field]) : this.range[field];
  }

  reset() {
    Object.keys(this.meta).forEach((key) => {
      this.meta[key] = this.getRandOrValue(key);
    });
  }
}

export class Star extends Spirit {
  constructor(viewPort) {
    super(viewPort);

    this.reset();
  }

  update() {
    this.meta.radius = _.rand(1, 2);
  }
}

export class Drop extends Spirit {
  constructor(viewPort) {
    super(viewPort, { y: [0, -viewPort.height] });

    this.reset();
  }

  update() {
    this.meta.x += this.meta.vx;
    this.meta.y += this.meta.vy;

    if (this.meta.y + this.meta.radius > this.viewPort.height) {
      this.reset();
    }
  }
}

export class Cloud extends Spirit {
  constructor(viewPort) {
    super(viewPort, {
      y: [0, viewPort.height / 10],
      vx: [-1, 1],
      vy: [-1, 1],
      radius: [viewPort.width / 4, viewPort.height / 2],
      alpha: [0.1, 0.2],
    });

    this.reset();
  }

  update() {
    this.meta.x += this.meta.vx;
    this.meta.y += this.meta.vy;

    if (
      this.meta.y < 0
      || this.meta.y > this.viewPort.height / 8
    ) {
      this.meta.vx = -this.meta.vx;
      this.meta.vy = -this.meta.vy;
    }
  }
}

export class Flake extends Spirit {
  constructor(viewPort) {
    super(viewPort, {
      y: [0, -viewPort.height],
      vx: [-3, 3],
      vy: [2, 5],
      radius: [1, 4],
      alpha: [0.1, 0.9],
    });

    this.reset();
  }

  update() {
    this.meta.x += this.meta.vx;
    this.meta.y += this.meta.vy;

    if (this.meta.y + this.meta.radius > this.viewPort.height) {
      this.reset();
    }
  }
}
