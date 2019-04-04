import Head from 'next/head';
import {TiSocialGithubCircular, TiSocialLinkedinCircular} from 'react-icons/ti';
import Bg, {colours} from '../components/SweetAndSaltyBg';
import {colourObjectToString, randomBetween} from '../lib/util';

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

export default () => (
  <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=0.8"/>
    </Head>
    <style jsx global>{`
      @font-face {
        font-family: 'LeagueGothic';
        src: url('/static/fonts/leaguegothic-regular-webfont.eot');
        src: url('/static/fonts/leaguegothic-regular-webfont.eot?#iefix') format('embedded-opentype'),
             url('/static/fonts/leaguegothic-regular-webfont.woff') format('woff'),
             url('/static/fonts/leaguegothic-regular-webfont.ttf') format('truetype'),
             url('/static/fonts/leaguegothic-regular-webfont.svg#league_gothicregular') format('svg');
        font-weight: normal;
        font-style: normal;
      }
      * {
        padding: 0;
        margin: 0;
      }
      body {
        background: #21272D;
        font-family: Arial, sans-serif;
      }
      a {
        color: #FFFFFF;
        text-decoration: none;
      }
    `}</style>
    <div style={{position: 'relative', height: 250}}>
      <Bg />
      <div style={{fontFamily: 'LeagueGothic', fontSize: 64, position: 'absolute', top: 40, left: 50, opacity: 0}}>Matthew Elphick</div>
      <div style={{fontFamily: 'LeagueGothic', fontSize: 48, position: 'absolute', top: 130, left: 50, opacity: 0}}>Software Engineer</div>
    </div>
    <div style={{...styles.box, background: colourObjectToString(colours[randomBetween(0, colours.length)]), color: '#000000'}}>
      <div style={styles.innerBox}>Hi, I'm Matt. I'm a Software Engineer, and I work at <a href='https://threadsstyling.com'>Threads Styling</a>.</div>
      <div style={styles.innerBox}>You can find work I've been doing on my <a href='https://github.com/maael'>GitHub</a> profile.</div>
      <div style={styles.innerBox}>I mostly work with JavaScript, but I have an interest in all things web.</div>
    </div>
    <div style={{...styles.box, alignItems: 'center'}}>
      <div style={{display: 'flex', width: '30vw', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
        <a href='https://github.com/maael'>
          <TiSocialGithubCircular size={50} />
        </a>
        <a href='https://www.linkedin.com/in/melphick/'>
          <TiSocialLinkedinCircular size={50} />
        </a>
      </div>
    </div>
  </div>
);
