import '@oscar-21/react-placeholder/lib/reactPlaceholder.css';
import 'normalize.css/normalize.css'; 
import './src/styles/reset.css';
import './src/styles/tailwind-output.css';

import wrapWithProvider from './src/rootElement';

export const wrapRootElement = wrapWithProvider;
/* 
export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout> */

const addScript = url => {
	const script = document.createElement('script');
	script.src = url;
	script.async = true;
	document.body.appendChild(script);
};

const addScriptToHead = url => {
	var a = document.createElement('script');
	var m = document.getElementsByTagName('script')[0];
	a.async = 1;
	a.src = url;
	m.parentNode.insertBefore(a, m);
};