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
        React.createElement(
          'div',
          {
            'className': 'page__content'
          },
          <article
            className="text"
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />,
          img ?
            <figure className="media">
              <img className="media__img" src={ img.base64 } />
            </figure> :
            undefined
        )
      )
    );
  },
});
