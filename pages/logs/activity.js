import Head from 'next/head'
import format from 'date-fns/format'
import EmojiBg from '../../components/EmojiBg'
import Box from '../../components/Box'

const {activity: emojis} = require('../../lib/emojiLists');

const createStyles = (hex) => ({
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    background: hex,
    width: '40vw',
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 20,
    padding: 20,
  }
})

export default class ActivityLog extends React.Component {
  static async getInitialProps () {
    return {items: []};
  }

  state = {
    items: this.props.items
  }

  async componentDidMount () {
    const res = await fetch('/api/entry/activity');
    const items = await res.json();
    this.setState({items});
  }

  render() {
    const {hex} = this.props;
    const {items} = this.state;
    const styles = createStyles(hex);
    return (
      <>
        <Head><title>Matthew Elphick | Activity Log</title></Head>
        <EmojiBg emojis={emojis} />
        <div>
          <Box style={{background: hex, marginBottom: 50, fontSize: '1.5em'}}>
            Activity Log
          </Box>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {items.map(({_id, entry, createdAt}) => (
                <Box key={_id} style={styles.itemBox}>
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
