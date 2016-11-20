import { reduce } from 'lodash';
import React from 'react';

export default React.createClass({
  displayName: 'iconotexte/Cover',

  render() {
    const { back, front, spine, pageWidth, options } = this.props;

    return (
      <div data-component="cover">
        {
          // We cannot use common JSX notation here, due to dynamic
          // attributes:
          React.createElement(
            'div',
            reduce(
              options,
              (iter, val, key) => {
                iter[`data-${ key }`] = val;
                return iter;
              },
              {
                className: back.className,
                'data-component': 'page',
                style: {
                  background: 'red', // TODO: Remove this line
                  display: 'inline-block',
                  width: `${ pageWidth }mm`,
                  height: '100%',
                },
              }
            ),
            <div className="page__content">
              <article
                className="text"
                dangerouslySetInnerHTML={{
                  __html: back.text === '<p><br></p>' ? '' : back.text,
                }}
              />
              {
                back.img ?
                  <img className="media" src={ back.img.base64 } /> :
                  undefined
              }
            </div>
          )
        }

        <div
          className="cover__spine"
          style={{
            background: 'blue', // TODO: Remove this line
            display: 'inline-block',
            width: `${ spine }mm`,
            height: '100%',
          }}
        />

        {
          // We cannot use common JSX notation here, due to dynamic
          // attributes:
          React.createElement(
            'div',
            reduce(
              options,
              (iter, val, key) => {
                iter[`data-${ key }`] = val;
                return iter;
              },
              {
                className: front.className,
                'data-component': 'page',
                style: {
                  background: 'green', // TODO: Remove this line
                  display: 'inline-block',
                  width: `${ pageWidth }mm`,
                  height: '100%',
                },
              }
            ),
            <div className="page__content">
              <article
                className="text"
                dangerouslySetInnerHTML={{
                  __html: front.text === '<p><br></p>' ? '' : front.text,
                }}
              />
              {
                front.img ?
                  <img className="media" src={ front.img.base64 } /> :
                  undefined
              }
            </div>
          )
        }
      </div>
    );
  },
});
