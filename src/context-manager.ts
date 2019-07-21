export type Coordinates = {
  x: number,
  y: number
}

export class ContextManager {
  public readonly ctx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  public readonly canvasWidth: number; // width of the canvas
  public readonly canvasHeight: number; // height of the canvas
  public readonly center: Coordinates;

  /**
   * Creates a new animation and sets properties of the animation
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.color = 'white'

    this.center = {
      y: this.canvasHeight / 2,
      x: this.canvasWidth / 2
    }
  }

  set color(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
  }

  get cx() {
    return this.center.x;
  }

  get cy() {
    return this.center.y;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasHeight, this.canvasHeight);
  }

  circle({ x, y }: Coordinates, sz: number) {
    this.ctx.beginPath();
    this.ctx.arc(x + this.cx, y + this.cy, sz, 0, 2*Math.PI, false);
    this.ctx.fill();
  }

  line(origin: Coordinates, dest: Coordinates) {
    const {x, y} = dest;
    this.ctx.beginPath();
    this.ctx.moveTo(origin.x + this.cx, origin.y + this.cy);
    this.ctx.lineTo(x + this.cx, y + this.cy);
    this.ctx.stroke();
  }

  lineToCenter(dest: Coordinates) {
    let { x, y } = dest;
    this.line({x, y}, {x: this.cx, y: this.cy});
  }

}
