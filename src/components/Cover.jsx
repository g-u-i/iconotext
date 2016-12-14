import { reduce } from 'lodash';
import React from 'react';

export default React.createClass({
  displayName: 'iconotexte/Cover',

  render() {
    const { back, front, spine, previewRatio, pageWidth, options } = this.props;

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
                className: 'page page--spine',
                style:{
                  // About previewRatio:
                  // cf. `styles/components/page/_layout.less`, line 2
                  width: `${ spine * previewRatio }mm`,
                },
                'data-component': 'page',
              }
            )
          )
        }

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
                  __html: front.text == "<p><br></p>" ? '' : front.text,
                }}
              />,
              front.img ?
                <img className="media" src={ front.img.base64 } />
                : undefined
            )
          )
        }
      </div>
    );
  },
});




/* NOTE
// forcer affichage mode impression couv.
iconotext.state.set(['ui', 'exportingCover'], true);

*/
