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



import wrapWithProvider from "./src/rootElement"

export const wrapRootElement = wrapWithProvider

/* export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>
 */
const addScript = (url) => {
  const script = document.createElement("script")
  script.src = url
  script.async = true
  document.body.appendChild(script)
}


const addScriptToHead=(url)=>{

    var a = document.createElement('script');
    var m = document.getElementsByTagName('script')[0];
    a.async = 1;
    a.src = url
    m.parentNode.insertBefore(a, m);
}

const addTrackingCode = ()=>{
      (function(){
        window['GoogleAnalyticsObject'] = 'ga';
        if(!window['ga'] ){
          window['ga'] = function(){
            window['ga'].q = window['ga'].q || [];
            window['ga'].q.push(arguments);
          }
              window['ga'].l = 1 * new Date();
        }

  /*       var a = document.createElement('script');
        var m = document.getElementsByTagName('script')[0];
        a.async = 1;
        a.src = '/scripts/analytics.js'
        m.parentNode.insertBefore(a, m); */
        addScript('/scripts/analytics.js');
      })();

      window.ga('create', `${process.env.GA_ID}`, 'auto');

        (function (f, b, e, v, n, t, s) {
          if (f.fbq) return;
          n = f.fbq = function () {
              n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = "2.0";
          n.queue = [];
          addScript(v);
/*           t = b.createElement(e);
          t.async = 1;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s); */
      })(window, document, "script", "/scripts/fbevents.js")
      setTimeout(()=>{
        if(window.fbq){
          console.log('running pixel')
          window.fbq('init', '386848018393019');
        }
  
      
        window.clicky_site_ids = window.clicky_site_ids || [];
        const clicky_id = parseInt(process.env.CLICKY_ID)
  
        window.clicky_site_ids.push(clicky_id);
  
        addScript('/scripts/clicky.js');
        addScript('/scripts/adword-adgrant-conversion.js')
        addScript('/scripts/adword-remarketing.js')
  
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag=gtag
        gtag('js', new Date());
        gtag('config', 'AW-853531513');
        gtag('config', 'AW-929434073');
      },3000)
/* 
       */
}
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

    if(process.env.DONT_ADD_TRACKING_CODE!=="true"){
        addTrackingCode()
    }
    

  }



export const onRouteUpdate = ({ location, prevLocation }) => {
  if (typeof window !== 'undefined' ) {

/*     if(window.gtag){
      window.gtag('event', 'conversion', {'send_to': 'AW-929434073/6OI-CMPitfEBENmTmLsD'});
    } */
    const pathname=typeof location.pathname ==='string' && location.pathname==='/'?location.pathname:location.pathname.replace(/\/$/, "")
      setTimeout(()=>{
        if(window.ga){
         window.ga('send', {
          hitType: 'pageview',
          page: pathname + location.search + location.hash,
          title:document.title
        });
        }
        if(window.fbq){
          window.fbq('track', 'PageView');
        }
      },500)
    
  }
}

