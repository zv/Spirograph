import { ContextManager, Position } from './context-manager'

const getCircle = (radians: number, radius: number) =>
  ({
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius
  })

class Dot {
  // public move: DotBehavior;
  public x: number;
  public y: number;
  public ix: number;
  public iy: number;
  public radius: number;
  private ctx: ContextManager;
  private size: number;
  private angle: number;

  constructor(
    radius: number,
    initial: Position,
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

  epicycle(n: number) {
    let { x, y } = getCircle((2*this.angle) + n, this.radius)
    this.ctx.circle({
      x: this.ix + x,
      y: this.iy + y
    }, this.size)
  }
}


let G = 1;
setInterval(() => {
  let thing = document.querySelector('.number')
  thing.innerHTML = `${G}`;
  G += 1
}, 1500)

export class MovingDots {
  private readonly ctx: ContextManager; // HTML Canvas's 2D context
  private dots: Dot[] = [];

  /**
   * Creates a new animation and sets properties of the animation
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = new ContextManager(canvas);

    let count = 50;
    let radius = 120;

    let period = (Math.PI * 2) / count;
    let sz = 3;

    for (let i = 0; i < count; i++) {
      let { x, y } = getCircle(period * i, radius)
      this.dots.push(new Dot(radius, { x, y }, sz, period * i, this.ctx))
    }
  }

  draw(nx: number = 0) {
    this.ctx.clear()
    this.dots.map(dot => dot.epicycle(nx))

    window.requestAnimationFrame(() => this.draw(nx + 0.01));
  }
}
