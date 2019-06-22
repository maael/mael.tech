const styles = {
  box: {
    padding: '20px 100px',
    boxSizing: 'border-box',
    width: '100vw',
    flex: 1,
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  innerBox: {
    padding: '20px 0px',
  }
}

export default ({children, style}) => (
  <div style={{...styles.box, ...style}}>{children}</div>
)

export const InnerBox = ({children}) => (
  <div style={styles.innerBox}>{children}</div>
)
