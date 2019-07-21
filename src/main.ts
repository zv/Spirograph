import { MovingDots } from './dot-manager';

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById('moving-dots');
  const dots = new MovingDots(canvas);
  dots.draw(0)
}

main();
