export type Position = {
  x: number,
  y: number
}


export class ContextManager {
  public readonly ctx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  public readonly canvasWidth: number; // width of the canvas
  public readonly canvasHeight: number; // height of the canvas
  public readonly center: Position;

  /**
   * Creates a new animation and sets properties of the animation
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.ctx.fillStyle = `white`;

    this.center = {
      y: this.canvasHeight / 2,
      x: this.canvasWidth / 2
    }
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

  circle({ x, y }: Position, sz: number) {
    this.ctx.beginPath();
    this.ctx.arc(x + this.cx, y + this.cy, sz, 0, 2*Math.PI, false);
    console.log(x + this.cx, y + this.cy, sz, 0, 2*Math.PI, false)
    this.ctx.fill();
  }

}
