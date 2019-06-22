import Head from 'next/head'
import format from 'date-fns/format'
import EmojiBg from '../../components/EmojiBg'
import Box from '../../components/Box'

const {food: emojis} = require('../../lib/emojiLists');

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

export default class FoodLog extends React.Component {
  static async getInitialProps () {
    return {items: []};
  }

  state = {
    items: this.props.items
  }

  async componentDidMount () {
    const res = await fetch('/api/entry/food');
    const items = await res.json();
    this.setState({items});
  }

  render() {
    const {hex} = this.props;
    const {items} = this.state;
    const styles = createStyles(hex);
    return (
      <>
        <Head><title>Matthew Elphick | Food Log</title></Head>
        <EmojiBg emojis={emojis} />
        <div>
          <Box style={{background: hex, marginBottom: 50, fontSize: '1.5em'}}>
            Food Log
          </Box>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {items.map(({_id, entry, entryEmoji, createdAt}) => (
                <Box key={_id} style={styles.foodBox}>
                  <span style={{flex: 1}}>{entryEmoji ? entryEmoji.emoji : '🍽'} {entry}</span>
                  <small>{format(createdAt, 'MM/DD/YYYY @ HH:mm')}</small>
                </Box>
              ))}
          </div>
        </div>
      </>
    )
  }
}
