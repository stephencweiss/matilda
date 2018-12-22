const goldenRatioConjugate = 0.61803398749895;
const hues = []
const patterns = ['plus', 'cross', 'dash', 'cross-dash', 'dot', 'dot-dash', 'disc', 'ring', 'line', 'line-vertical', 'weave' , 'zigzag', 'zigzag-vertical', 'diagonal', 'diagonal-right-left','square', 'box', 'triangle', 'triangle-inverted', 'diamond', 'diamond-box']
const saturation = 0.8;
const lightness = 0.5;

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255) ];
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function generateComplementaryColors ( numberToGenerate ) {
  let hue = Math.random();
  for (let i = 0; i < numberToGenerate; i += 1) {
    hue += goldenRatioConjugate;
    hue %= 1;
    const [red, green, blue] = hslToRgb(hue, saturation, lightness)
    const hexColor = rgbToHex(red, green, blue);
    const randPattern = patterns[Math.floor(patterns.length * Math.random())]
    hues.push({color: hexColor, pattern: randPattern })
  }
  console.log(hues)
}

// generateComplementaryColors(100);
var oneHundredRandomColors = [ 
  { color: '#19bce5', pattern: 'line' },
  { color: '#e5d319', pattern: 'dash' },
  { color: '#9719e5', pattern: 'box' },
  { color: '#19e55c', pattern: 'cross' },
  { color: '#e52019', pattern: 'box' },
  { color: '#194de5', pattern: 'diamond' },
  { color: '#89e519', pattern: 'dot-dash' },
  { color: '#e519c4', pattern: 'cross-dash' },
  { color: '#19e5ca', pattern: 'line' },
  { color: '#e58f19', pattern: 'square' },
  { color: '#5319e5', pattern: 'diagonal' },
  { color: '#1ae519', pattern: 'diamond-box' },
  { color: '#e51956', pattern: 'line' },
  { color: '#1991e5', pattern: 'zigzag' },
  { color: '#cde519', pattern: 'diagonal-right-left' },
  { color: '#c119e5', pattern: 'zigzag' },
  { color: '#19e586', pattern: 'cross-dash' },
  { color: '#e54a19', pattern: 'disc' },
  { color: '#1923e5', pattern: 'triangle-inverted' },
  { color: '#5fe519', pattern: 'box' },
  { color: '#e5199a', pattern: 'zigzag-vertical' },
  { color: '#19d6e5', pattern: 'disc' },
  { color: '#e5b919', pattern: 'diagonal' },
  { color: '#7d19e5', pattern: 'diamond' },
  { color: '#19e542', pattern: 'triangle' },
  { color: '#e5192c', pattern: 'dash' },
  { color: '#1967e5', pattern: 'diagonal' },
  { color: '#a3e519', pattern: 'square' },
  { color: '#e519de', pattern: 'square' },
  { color: '#19e5b0', pattern: 'line' },
  { color: '#e57519', pattern: 'triangle-inverted' },
  { color: '#3919e5', pattern: 'weave' },
  { color: '#34e519', pattern: 'ring' },
  { color: '#e51970', pattern: 'ring' },
  { color: '#19ace5', pattern: 'dash' },
  { color: '#e5e319', pattern: 'triangle' },
  { color: '#a719e5', pattern: 'dash' },
  { color: '#19e56c', pattern: 'triangle' },
  { color: '#e53019', pattern: 'zigzag-vertical' },
  { color: '#193de5', pattern: 'plus' },
  { color: '#79e519', pattern: 'dash' },
  { color: '#e519b4', pattern: 'dash' },
  { color: '#19e5da', pattern: 'dash' },
  { color: '#e59f19', pattern: 'ring' },
  { color: '#6319e5', pattern: 'diamond' },
  { color: '#19e528', pattern: 'dot' },
  { color: '#e51946', pattern: 'weave' },
  { color: '#1981e5', pattern: 'triangle-inverted' },
  { color: '#bde519', pattern: 'diamond-box' },
  { color: '#d219e5', pattern: 'line-vertical' },
  { color: '#19e596', pattern: 'diamond' },
  { color: '#e55b19', pattern: 'triangle-inverted' },
  { color: '#1f19e5', pattern: 'line-vertical' },
  { color: '#4fe519', pattern: 'line-vertical' },
  { color: '#e5198a', pattern: 'dash' },
  { color: '#19c6e5', pattern: 'line-vertical' },
  { color: '#e5c919', pattern: 'diamond-box' },
  { color: '#8d19e5', pattern: 'disc' },
  { color: '#19e552', pattern: 'diagonal' },
  { color: '#e5191c', pattern: 'plus' },
  { color: '#1957e5', pattern: 'disc' },
  { color: '#93e519', pattern: 'box' },
  { color: '#e519ce', pattern: 'diamond' },
  { color: '#19e5c0', pattern: 'line' },
  { color: '#e58519', pattern: 'diamond-box' },
  { color: '#4919e5', pattern: 'disc' },
  { color: '#24e519', pattern: 'line-vertical' },
  { color: '#e51960', pattern: 'cross' },
  { color: '#199be5', pattern: 'diagonal' },
  { color: '#d7e519', pattern: 'cross' },
  { color: '#b819e5', pattern: 'weave' },
  { color: '#19e57c', pattern: 'cross' },
  { color: '#e54019', pattern: 'diamond' },
  { color: '#192de5', pattern: 'line-vertical' },
  { color: '#69e519', pattern: 'dot' },
  { color: '#e519a4', pattern: 'diamond-box' },
  { color: '#19e0e5', pattern: 'disc' },
  { color: '#e5af19', pattern: 'diamond-box' },
  { color: '#7319e5', pattern: 'plus' },
  { color: '#19e538', pattern: 'triangle-inverted' },
  { color: '#e51936', pattern: 'box' },
  { color: '#1971e5', pattern: 'dot-dash' },
  { color: '#ade519', pattern: 'diamond-box' },
  { color: '#e219e5', pattern: 'diagonal' },
  { color: '#19e5a6', pattern: 'line' },
  { color: '#e56b19', pattern: 'disc' },
  { color: '#2f19e5', pattern: 'line' },
  { color: '#3ee519', pattern: 'triangle' },
  { color: '#e5197a', pattern: 'zigzag-vertical' },
  { color: '#19b5e5', pattern: 'triangle' },
  { color: '#e5d919', pattern: 'diamond-box' },
  { color: '#9d19e5', pattern: 'diagonal-right-left' },
  { color: '#19e562', pattern: 'cross-dash' },
  { color: '#e52619', pattern: 'disc' },
  { color: '#1947e5', pattern: 'line' },
  { color: '#83e519', pattern: 'triangle-inverted' },
  { color: '#e519be', pattern: 'ring' },
  { color: '#19e5d0', pattern: 'diamond-box' },
  { color: '#e59519', pattern: 'diamond' },
  { color: '#5919e5', pattern: 'zigzag' } 
]

export default generateComplementaryColors;
export { oneHundredRandomColors };