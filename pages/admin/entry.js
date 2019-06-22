import {useState, useEffect} from 'react';
import Head from 'next/head'
import OverlayedBg from '../../components/OverlayedBg';
import Box from '../../components/Box';
import Input from '../../components/Input';
import Select from '../../components/Select';
import EmojiPicker from '../../components/EmojiPicker';

export default ({token, hex}) => {
  return token ? entry({hex}) : auth({hex})
}

const auth = ({hex}) => {
  const [passphrase, updatePassphrase] = useState('');
  const [error, updateError] = useState();
  const authenticate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/authenticate/passphrase', {
        method: 'POST',
        body: JSON.stringify({
          passphrase
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      if (res.ok && data.ok) {
        window.location.reload();
      } else {
        updateError(data);
      }
    } catch (e) {
      updateError({err: e.message});
    }
  }
  return (
    <div>
      <Head>
        <title>Authenticate</title>
      </Head>
      <OverlayedBg primary='Authenticate' height={150} />
      <Box style={{background: hex, color: '#000000'}}>
        <form onSubmit={authenticate}>
          <Input placeholder='Passphrase' style={error ? {border: '1px solid red'} : {}} type='text' value={passphrase} onChange={({target}) => updatePassphrase(target.value)} />
          <Input type='submit' value='Authenticate' />
        </form>
      </Box>
    </div>
  )
}

const entry = ({hex}) => {
  const [entryType, updateEntryType] = useState('food');
  const [entry, updateEntry] = useState('');
  const [entryEmoji, updateEntryEmoji] = useState();
  const [_, updateError] = useState();
  const [location, updateLocation] = useState();

  useEffect(() => {
    if (!location && typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({coords}) => {
        const {latitude, longitude} = coords;
        updateLocation(coords);
        const res = await fetch(`https://eu1.locationiq.com/v1/reverse.php?key=${'pk.b4678a87aea2e31c77c9534e68f83710'}&lat=${latitude}&lon=${longitude}&format=json`);
        const json = await res.json();
        const {suburb, city, country} = json.address;
        updateLocation({suburb, city, country, latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy});
      });
    }
  })

  const createEntry = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/entry', {
        method: 'POST',
        body: JSON.stringify({
          entryType,
          entry,
          entryEmoji,
          location
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      if (res.ok) {
        updateEntryType('food')
        updateEntry('')
        updateEntryEmoji()
        updateError()
      } else {
        updateError(data);
      }
    } catch (e) {
      updateError({err: e.message});
    }
  }
  return (
    <div>
      <Head>
        <title>New Entry</title>
      </Head>
      <OverlayedBg primary='New Entry' height={150} />
      <Box style={{background: hex, color: '#000000'}}>
        <form onSubmit={createEntry}>
          <div style={{textAlign: 'center', marginBottom: 10}}>
            🌍 {location ? [location.suburb, location.city, location.country].filter(Boolean).join(', ').trim() : 'Locating...'} 🌍
          </div>
          <Select value={entryType} onChange={({target}) => updateEntryType(target.value)}>
            <option value='food'>Food</option>
            <option value='activity'>Activity</option>
            <option value='location'>Location</option>
          </Select>
          { entryType === 'location' ? null : (
            <>
              <Input style={{width: '100%'}} placeholder='Entry...' value={entry} onChange={({target}) => updateEntry(target.value)} />
              <EmojiPicker onSelect={updateEntryEmoji} />
            </>
          )}
          <Input type='submit' value='Save entry' />
        </form>
      </Box>
    </div>
  )
}
