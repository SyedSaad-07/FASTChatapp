import React from 'react';
// import ReactDom from 'react-dom';

import App from './App';
// ReactDom.render(<App/>,
// document.getElementById('root') );

import { createRoot } from 'react-dom/client';
// import {render} from 'react-dom';
const container = document.getElementById('root');
// render(<App/>, container);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);