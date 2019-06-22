import {colours} from '../lib/theme';

const styles = {
  default: {
    padding: 10,
    background: colours.background,
    border: '1px solid transparent',
    color: '#FFFFFF',
    outline: 'none',
    margin: 5
  },
  submit: {
    padding: 10,
    background: colours.background,
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    margin: 5
  }
}

export default ({type = 'text', placeholder, value, onChange, style}) => (
  <input placeholder={placeholder} type={type} value={value} onChange={onChange} style={{...(styles[type] || styles.default), ...style}} />
)
