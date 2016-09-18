import _ from 'lodash';
import Polyglot from 'node-polyglot';

import frFR from '../../assets/locales/fr-FR.json';

const locales = {
  'fr-FR': frFR,
};

const polyglot = new Polyglot({
  locale: 'fr-FR',
});

function registerLang(lang, locale) {
  _.forEach(
    locale,
    (collection, ns) => polyglot.extend({
      [lang]: { [ns]: collection },
    })
  );
}

_.forEach(
  locales,
  (translations, language) => registerLang(language, translations)
);

function setLang(lang, state) {
  if (locales[lang]) {
    polyglot.locale(lang);
    state.emit('render');

    // Syncronize app title:
    document.querySelector('head title').innerHTML = t('commons.title'); // eslint-disable-line
  } else {
    state.set('locale', Object.keys(locales)[0]);
  }
}

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

export function bindToState(state) {
  setLang(state.get('locale'), state);
  state
    .select('locale')
    .on(
      'update',
      () => setLang(state.get('locale'), state)
    );
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

export const languages = Object.keys(locales);
