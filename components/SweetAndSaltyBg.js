import {randomBetween, randomBetweenFloat} from '../lib/util';

export const colours = [
  {
    r: 209,
    g: 53,
    b: 144
  },
  {
    r: 240,
    g: 126,
    b: 62
  },
  {
    r: 105,
    g: 201,
    b: 209
  },
  {
    r: 186,
    g: 171,
    b: 89
  },
  {
    r: 229,
    g: 34,
    b: 83
  }
]

function firstDraw (c) {
  if (!c) return;
  c.width = window.innerWidth;
  const ctx = c.getContext("2d");
  ctx.globalCompositeOperation = "xor";

  let circles = [];

  function createNewCircle() {
    if (circles.length > 3) return
    if (randomBetween(0, 75) > 1) return;
    const maxWidth = randomBetween(5, 15);
    circles.push({
      id: circles.length,
      x: randomBetween(0, c.width),
      y: randomBetween(0, c.height),
      radius: 0,
      max: randomBetween(Math.min(c.height / 10, c.width / 10), Math.max(c.height / 4, c.width / 4)),
      speed: randomBetweenFloat(0.5, 0.8),
      widthMax: maxWidth,
      width: maxWidth,
      opacity: 1,
      color: colours[randomBetween(0, colours.length)]
    })
  }

  function draw() {
    createNewCircle();
    circles = circles.filter((c) => c.radius <= c.max);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = '64px LeagueGothic';
    ctx.fillText('Matthew Elphick', 50, 100);
    ctx.font = '48px LeagueGothic';
    ctx.fillText('Software Engineer', 50, 175);
    [...circles].forEach((circle) => {
      ctx.save();
      circle.radius += circle.speed;
      if (circle.radius > circle.max - (circle.widthMax * 2)) {
         circle.width -= circle.speed / 2;
        if (circle.width < 0) circle.width = 0;
         circle.opacity -= 0.01;
        if (circle.opacity < 0) circle.opacity = 0;
      }
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx.lineWidth = circle.width;
      ctx.strokeStyle = `rgba(${circle.color.r},${circle.color.g},${circle.color.b},${circle.opacity})`
      ctx.stroke();
      ctx.restore();
    })

    window.requestAnimationFrame(draw);
  }

  window.requestAnimationFrame(draw);
}

export default () => {
  return <canvas height={250} ref={async (ref) => {
    await (new FontFace('LeagueGothic', 'url(/static/fonts/leaguegothic-regular-webfont.ttf)')).load();
    firstDraw(ref)
  }}></canvas>;
}
