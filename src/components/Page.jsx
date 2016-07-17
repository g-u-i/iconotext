import { reduce } from 'lodash';
import React from 'react';

export default React.createClass({
  displayName: 'iconotexte/Page',

  render() {
    const { text, img, options, cover } = this.props;

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
            'data-cover': cover || undefined,
            'data-component': 'page',
          }
        ),
        <div
          className="background"
          style={{
            backgroundImage: img ? `url(${ img.base64 })` : undefined,
          }}
        />,
        <span
          className="content"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      )
    );
  },
});
