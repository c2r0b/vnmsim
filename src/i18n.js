// nextjs/i18n.js

import { tx, normalizeLocale } from '@transifex/native'
import getConfig from 'next/config'

const config = getConfig()

/**
 * Used by SSR to pass translation to browser
 *
 * @param {*} { locale, locales }
 * @return {*} { locale, locales, translations }
 */
export async function getServerSideTranslations({ locale, locales }) {
  tx.init({
    token: config?.publicRuntimeConfig?.TxNativePublicToken,
  })
  
  // ensure that nextjs locale is in the Transifex format,
  // for example, de-de -> de_DE
  const txLocale = normalizeLocale(locale)
  
  // load translations over-the-air
  await tx.fetchTranslations(txLocale)
  return {
    locale,
    locales,
    translations: tx.cache.getTranslations(txLocale),
  }
}

/**
 * Initialize client side Transifex Native instance cache
 *
 * @param {*} { locale, translations }
 */
export function setClientSideTranslations({ locale, translations }) {
  if (!locale || !translations) return
  tx.init({
    currentLocale: locale,
  })
  tx.cache.update(locale, translations)
}
