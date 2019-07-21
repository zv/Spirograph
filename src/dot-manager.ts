import { ContextManager, Coordinates } from './context-manager'

// The (changing) rate at which the epicycles are drawn.
let RATE = 34;

/**
 * Get the position of a dot on the perimeter of a circle, given an angle from
 * the center.
 */
const getCircle = (radians: number, radius: number) => ({
  x: Math.cos(radians) * radius,
  y: Math.sin(radians) * radius
})

/**
 * Get the position of a dot on the perimeter of a Square, given an angle from
 * the center.
 */
const getSquare = (radians: number, size: number) => {
  const t = radians;
  const m = (t: number) => Math.max(Math.abs(Math.cos(t)), Math.abs(Math.sin(t)))
  return {
    x: (size / m(t)) * Math.cos(t),
    y: (size / m(t)) * Math.sin(t)
  }
}

class Dot {
  private readonly ctx: ContextManager;
  x: number;
  y: number;
  readonly ix: number;
  readonly iy: number;
  radius: number;
  size: number;
  angle: number;

  constructor(
    radius: number,
    initial: Coordinates,
    size: number,
    angle: number,
    ctx: ContextManager
  ) {
    this.x = initial.x;
    this.y = initial.y;
    this.radius = radius;
    this.ix = initial.x;
    this.iy = initial.y;
    this.ctx = ctx;
    this.size = size;
    this.angle = angle;
  }

  draw({ x, y }: Coordinates) {
    this.x = this.ix + x;
    this.y = this.iy + y;
    this.ctx.circle({
      x: this.x,
      y: this.y
    }, this.size)
  }

  epicycle(n: number) {
    this.draw(getCircle((RATE * this.angle) + n, this.radius * 1.5))
  }

  episquare(n: number) {
    this.draw(getSquare((RATE * this.angle) + n, this.radius))
  }

  lineToCenter() {
    let { x, y } = this
    this.ctx.lineToCenter({ x, y })
  }
}

export class MovingDots {
  private readonly ctx: ContextManager; // HTML Canvas's 2D context
  private dots: Dot[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = new ContextManager(canvas);
    // Setup the dots
    let count = 100;
    let radius = 120;
    let period = (Math.PI * 2) / count;
    let sz = 5;
    for (let i = 0; i < count; i++) {
      let { x, y } = getCircle(period * i, radius)
      this.dots.push(new Dot(radius, { x, y }, sz, period * i, this.ctx))
    }
  }

  // Tick action
  draw(nx: number = 0) {
    this.ctx.clear()
    this.dots.forEach(dot => dot.epicycle(nx))
    this.dots.forEach((dot, i) => {
      let len = this.dots.length
      let { x, y } = this.dots[((i + (len + (len / 2))) % len)]
      this.ctx.line({ x: dot.x, y: dot.y }, { x, y })
    })

    window.requestAnimationFrame(() => this.draw(nx + 0.01));
  }
}

// Change the rate
setInterval(() => {
  RATE += 1
  document.querySelector('.rate').innerHTML = `${RATE}`;
}, 1000)
