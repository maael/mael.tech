import Head from 'next/head'
import format from 'date-fns/format'
import OverlayedBg from '../../components/OverlayedBg'
import Box from '../../components/Box'

const createStyles = (hex) => ({
  foodBox: {
    display: 'flex',
    flexDirection: 'row',
    background: hex,
    width: '50vw',
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 20
  }
})

export default class LifeLog extends React.Component {
  static async getInitialProps () {
    return {items: []};
  }

  state = {
    items: this.props.items
  }

  async componentDidMount () {
    const res = await fetch('/api/entry');
    const items = await res.json();
    this.setState({items});
  }

  render() {
    const {hex} = this.props;
    const {items} = this.state;
    const styles = createStyles(hex);
    return (
      <>
        <Head><title>Matthew Elphick | Life Log</title></Head>
        <OverlayedBg primary='Life Log' height={150} />
        <div>
          <Box style={{background: hex, marginBottom: 50, padding: 5}}></Box>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {items.map(({_id, entry, createdAt}) => (
              <Box key={_id} style={styles.foodBox}>
                <span style={{flex: 1}}>{entry}</span>
                <small>{format(createdAt, 'MM/DD/YYYY @ HH:mm')}</small>
              </Box>
            ))}
          </div>
        </div>
      </>
    )
  }
}
