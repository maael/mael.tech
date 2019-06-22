import {useState} from 'react';
import Input from './Input';
const emoji = require('node-emoji/lib/emoji.json');

export default ({onSelect}) => {
  const [search, updateSearch] = useState('');
  const [selected, updatedSelected] = useState();
  return (
    <div>
      <Input placeholder='🔎 Search emojis...' value={search} onChange={({target}) => updateSearch(target.value)} /> {selected && selected.emoji} {selected && selected.label}
      <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
        {search ? Object.entries(emoji).filter((e) => search === '*' ? true : e.some((i) => i.includes(search))).map(([label, emoji]) => (
          <div onClick={() => {
            if (selected && selected.label === label) {
              updatedSelected()
              onSelect && onSelect()
            } else {
              updatedSelected({label, emoji})
              onSelect && onSelect({label, emoji})
            }
          }} style={{flex: 0, cursor: 'pointer', background: selected && selected.label === label ? 'rgba(100, 100, 100, 0.75)' : 'transparent', padding: '0px 0px 0px 5px', textAlign: 'center', borderRadius: '2em'}} key={label}>
            {emoji}
          </div>
        )) : null}
      </div>
    </div>
  )
}
