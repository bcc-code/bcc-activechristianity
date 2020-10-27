import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"></link>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script dangerouslySetInnerHTML={{ __html: `
            window.refTagger = {
              settings: {
                bibleVersion: "${process.env.BIBLE_VERSION}",
                addLogosLink: false,
                appendIconToLibLinks: false,
                caseInsensitive: true,
                convertHyperlinks: false,
                libronixBibleVersion: "${process.env.BIBLE_VERSION}",
                libronixLinkIcon: "light",
                linksOpenNewWindow: false,
                tagChapters: true,
                useTooltip: true
              }
            }
          ` }}></script>
          <script src="https://api.reftagger.com/v2/RefTagger.js"></script>
{/* 
          <link type="text/css" rel="stylesheet" href="/src/styles/tailwind-output.css"></link> */}
          
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
