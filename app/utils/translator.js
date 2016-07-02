import _ from 'lodash';
import Polyglot from 'node-polyglot';

import state from '../state.js';

import frFR from '../assets/locales/fr-FR.json';

const polyglot = new Polyglot({
  locale: state.get('locale'),
});

state
  .select('locale')
  .on('update', () => polyglot.locale(state.get('locale')));

/**
 * Will store some translations until they are dynamically used from the #t
 * static method.
 *
 * The object given be a collection of nested translations objects, indexed by
 * languages.
 *
 * @param  {string} ns  The translations namespace.
 * @param  {object} obj The translations.
 */
export function extend(ns, obj) {
  _.forEach(obj, (collection, lang) => {
    polyglot.extend({
      [lang]: { [ns]: collection },
    });
  });
}

export function t(path, ...args) {
  return polyglot.t(
    [polyglot.locale()]
      .concat(
        Array.isArray(path) ?
          path :
          path.split('.')
      )
      .join('.'),
    ...args
  );
}

// Load locale:
export function setLang(lang, locale) {
  _.forEach(
    locale,
    (collection, ns) => polyglot.extend({
      [lang]: { [ns]: collection },
    })
  );
}

setLang('fr-FR', frFR);
