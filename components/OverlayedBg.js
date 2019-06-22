import Bg from './SweetAndSaltyBg'

export default ({height = 250, primary = '', secondary = ''}) => (
  <div style={{position: 'relative', height}}>
    <Bg primary={primary} secondary={secondary} height={height} />
    <div style={{fontFamily: 'LeagueGothic', fontSize: 64, position: 'absolute', top: 40, left: 50, opacity: 0}}>{primary}</div>
    <div style={{fontFamily: 'LeagueGothic', fontSize: 48, position: 'absolute', top: 130, left: 50, opacity: 0}}>{secondary}</div>
  </div>
)
