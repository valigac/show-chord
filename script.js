// const whiteNotes = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ];
// const blackNotes = [ 'C#', 'D#', 'F#', 'G#', 'A#' ];
const notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const input = document.getElementById('search-input');
console.log(input);

input.onkeydown = (e) => {
  console.log(e);
}

/* Basic init */
function initKeys() {
  const octavesEl = document.getElementsByClassName('octave');
  let keys = {};
  for (let i = 0; i < octavesEl.length; i++) {
    // let key = octavesEl[i].childNodes;
    let tmp = octavesEl[i].getElementsByTagName('span');
    for (let j = 0; j < tmp.length; j++) {
      keys[notes[j] + i] = { note: notes[j], octave: i,
        element: tmp[j], color: (notes[1]) ? 'black' : 'white' };
    }
  }
  return keys;
}

const keys = initKeys();

/* Color change for notes in array */
function activeKeys(selected) {
  selected.forEach((n) => {
    keys[n].element.style.background = (keys[n].color != 'black') ? '#5e9cff' : '#063f99';
  });
}

/* Color change for notes in array (back to original) */
function deactiveKeys(selected) {
  selected.forEach((n) => {
    keys[n].element.style.background = (keys[n].color == 'black') ? 'white' : 'black';
  });
}

activeKeys(['C0', 'E0', 'G0']);
