import {colours} from '../lib/theme';

const style = {
  background: colours.background,
  color: '#FFFFFF',
  border: 'none',
  outline: 'none',
  '-webkit-appearance': 'menulist-button',
  height: 30,
  width: '100%'
}

export default ({children, onChange, value}) => (
  <div style={{background: colours.background, padding: 0, margin: 5, width: '100%'}}>
    <select style={style} onChange={onChange} value={value}>
      {children}
    </select>
  </div>
)
