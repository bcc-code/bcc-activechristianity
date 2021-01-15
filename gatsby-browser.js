/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"

import "react-placeholder/lib/reactPlaceholder.css"
import "normalize.css/normalize.css"
import "./src/styles/reset.css"
import "./src/styles/tailwind-output.css"
import Layout from "./src/layouts/App/index.tsx"

import wrapWithProvider from "./provider"

export const wrapRootElement = wrapWithProvider

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>



export const onClientEntry = () => {
//https://nooshu.github.io/blog/2020/02/23/improving-perceived-performance-with-the-css-font-display-property/
  (function(){
    // create our custom link tag for the stylesheet
    var url = "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"; // IMPORTANT: this is the CSS file that contains your @font-face rules
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet"
    link.href = url;

    // append the stylesheet to the head
    head.appendChild(link);

    // wait for the CSS file to load before modifying the font setup
    link.onload = function () {
      console.log('loading font')
      // define our font face and modify the properties (will trigger a load)
      var postFont = new FontFace('Merriweather', url);

      // IMPORTANT: add the modified font to the FontFaceSet
      document.fonts.add(postFont);
      // monitor the font load (optional)
      postFont.loaded.then((fontFace) => {
        // log some info in the console
        console.info('Font status:', postFont.status); // optional
        // log some info on the WPT waterfall chart
        performance.mark('Google font Merriweather'); // optional
      }, (fontFace) => {
        // if there's an error, tell us about it
        console.error('Font status:', postFont.status); // optional
      });

      // repeat above for multiple fonts
    }
    })();

  }



export const onRouteUpdate = ({ location, prevLocation }) => {
  if (typeof window !== 'undefined' ) {


    /* window.cue && window.cue.initialize(); */
    // Since the History Change trigger fires as soon as the event is dispatched, the content might not be there yet when the tracking tags fire.
    // By delaying the trigger, the tags won’t fire until the page has had time to load the content
    const dataLayer = window.dataLayer = window.dataLayer || [];
    const pathname=typeof location.pathname ==='string' && location.pathname==='/'?location.pathname:location.pathname.replace(/\/$/, "")
    setTimeout(()=>{
      dataLayer.push({
        event: 'ac.pageview',
        location:pathname + location.search + location.hash
      })
    },500)
  }
}

