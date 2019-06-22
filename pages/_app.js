import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import tinycolor from 'tinycolor2';
import {colours} from '../components/SweetAndSaltyBg';
import {colourObjectToString, randomBetween} from '../lib/util';
import {colours as theme} from '../lib/theme';

class MaelTech extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    const pageColour = colourObjectToString(colours[randomBetween(0, colours.length)]);
    pageProps.hex = tinycolor(pageColour).toHexString();
    pageProps.token = ctx.req.cookies.token;

    if (Component.getInitialProps) {
      pageProps = {...pageProps, ...(await Component.getInitialProps(ctx))}
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
          <Head>
            <meta name="theme-color" content={pageProps.hex} />
            <meta name="viewport" content="width=device-width, initial-scale=0.8"/>
            <title>Matthew Elphick | Software Engineer</title>
            <link id="favicon" rel="icon" href={`/static/favicons/${pageProps.hex.slice(1)}/favicon-16x16.png`} type="image/png" sizes="16x16" />
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
              box-sizing: border-box;
            }
            body {
              background: ${theme.background};
              font-family: Arial, sans-serif;
            }
            a {
              color: #FFFFFF;
              text-decoration: none;
            }
          `}</style>
          <Component {...pageProps} />
        </div>
      </Container>
    )
  }
}

export default MaelTech
