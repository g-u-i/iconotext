import { reduce } from 'lodash';
import React from 'react';

export default React.createClass({
  displayName: 'iconotexte/Page',

  render() {
    const { text, img, options, className, noPrint } = this.props;

    return (
      React.createElement(
        'div',
        reduce(
          options,
          (iter, val, key) => {
            iter[`data-${ key }`] = val;
            return iter;
          },
          {
            className,
            'data-component': 'page',
            'data-no-print': noPrint,
          }
        ),
        <span
          className="content"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />,
        img ?
          <div className="background">
            <img src={ img.base64 } />
          </div> :
          undefined
      )
    );
  },
});
