import Head from 'next/head'
import format from 'date-fns/format'
import EmojiBg from '../../components/EmojiBg'
import Box from '../../components/Box'

const {travelPlaces: emojis} = require('../../lib/emojiLists');

const createStyles = (hex) => ({
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    background: hex,
    width: '50vw',
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 20,
    padding: 20
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
        <Head><title>Matthew Elphick | Location Log</title></Head>
        <EmojiBg emojis={emojis} />
        <div>
          <Box style={{background: hex, marginBottom: 50, fontSize: '1.5em'}}>
            Location Log
          </Box>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {items.map(({_id, location, createdAt}) => location ? (
              <Box key={_id} style={styles.itemBox}>
                <span style={{flex: 1, textAlign: 'center', height: 200, backgroundPosition: 'center center', backgroundImage: `url(${`https://maps.locationiq.com/v2/staticmap?key=${'pk.b4678a87aea2e31c77c9534e68f83710'}&center=${location.latitude},${location.longitude}&zoom=18&size=600x200`})`}}></span>
                <div style={{flex: 1, display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
                  <div style={{flex: 1}}>🌍 {location ? [location.suburb, location.city, location.country].filter(Boolean).join(', ').trim() : 'Locating...'}</div>
                  <small>{format(createdAt, 'MM/DD/YYYY @ HH:mm')}</small>
                </div>
              </Box>
            ) : null)}
          </div>
        </div>
      </>
    )
  }
}
