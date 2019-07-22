import { MovingDots } from './dot-manager';

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById('moving-dots');
  const dots = new MovingDots(canvas);

  // change drawing configuration in response to keys.
  const keyHandler = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      dots.config.drawLines = !dots.config.drawLines
    }
    if (e.key === 's') {
      dots.config.rate = 2
    }
  }

  dots.draw(0)
  document.addEventListener('keydown', keyHandler);
}


main();
