import * as React from 'react';
import * as ReactDom from 'react-dom';

const element = React.createElement('h2', null, 'Hello, world!');
ReactDom.render(element, document.getElementById("root"));
