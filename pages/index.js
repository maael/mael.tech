import Head from 'next/head';
import {TiSocialGithubCircular, TiSocialLinkedinCircular} from 'react-icons/ti';
import OverlayedBg from '../components/OverlayedBg';
import Box, {InnerBox} from '../components/Box';

export default class Index extends React.Component {
  render () {
    const {hex} = this.props;
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <Head>
          <meta name="theme-color" content={hex} />
          <meta name="viewport" content="width=device-width, initial-scale=0.8"/>
          <title>Matthew Elphick | Software Engineer</title>
          <link id="favicon" rel="icon" href={`/static/favicons/${hex.slice(1)}/favicon-16x16.png`} type="image/png" sizes="16x16" />
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
        <OverlayedBg primary='Matthew Elphick' secondary='Software Engineer' />
        <Box style={{background: hex, color: '#000000'}}>
          <InnerBox>Hi, I'm Matt. I'm a Software Engineer, and I work at <a href='https://threadsstyling.com'>Threads Styling</a>.</InnerBox>
          <InnerBox>You can find work I've been doing on my <a href='https://github.com/maael'>GitHub</a> profile.</InnerBox>
          <InnerBox>I mostly work with JavaScript, but I have an interest in all things web.</InnerBox>
        </Box>
        <Box style={{alignItems: 'center'}}>
          <div style={{display: 'flex', width: '30vw', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
            <a href='https://github.com/maael'>
              <TiSocialGithubCircular size={50} />
            </a>
            <a href='https://www.linkedin.com/in/melphick/'>
              <TiSocialLinkedinCircular size={50} />
            </a>
          </div>
        </Box>
      </div>
    )
  }
}
