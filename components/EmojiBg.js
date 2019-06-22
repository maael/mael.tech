function firstDraw (c, emojis) {
  if (!c) return;
  c.width = window.innerWidth;
  c.height = c.parentElement.clientHeight;
  const ctx = c.getContext("2d");
  ctx.globalCompositeOperation = "xor";
  const initialEmojis = [].concat(emojis);

  function getEmoji () {
    if (!initialEmojis.length) initialEmojis.concat(emojis);
    return initialEmojis.splice(Math.floor(Math.random() * initialEmojis.length), 1);
  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ffffff";
    const emojiSize = 20;
    const padding = 20;
    const height = c.height;
    const width = c.width - padding * 2;
    const emojiBlockWidth = emojiSize * (Math.floor(width / emojiSize) / 10);
    const emojiBlockHeight = emojiSize * (Math.floor(height / emojiSize) / 6);
    ctx.font = `${emojiSize}px Arial`;
    const eWidth = width;
    const eHeight = height;
    const eWAmount = Math.floor(eWidth / emojiBlockWidth);
    const eHAmount = Math.floor(eHeight / emojiBlockHeight);
    for(let x = 1; x <= eWAmount; x++) {
      for(let y = 1; y <= eHAmount; y++) {
        const calcX = padding + (emojiBlockWidth * x) - (emojiBlockWidth / 2) - (emojiSize / 2);
        const calcY = padding + (emojiBlockHeight * y) - (emojiBlockHeight / 2) + (emojiSize / 2);
        ctx.fillText(getEmoji(), calcX, calcY);
      }
    }
  }

  window.requestAnimationFrame(draw);
}

export default class EmojiBg extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render () {
    const {emojis} = this.props;
    return <canvas style={{opacity: 0.75, position: 'fixed', zIndex: -1}} ref={(ref) => {
      firstDraw(ref, emojis)
    }}></canvas>;
  }
}
