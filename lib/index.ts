import Fadin, { FadinConfig } from "./fadin";

/**
 * You should wrap your fadin call in a on dom loaded event
 * this ensures your selected items are avalidable to be attached
 *
 * ```
 * import fadin from 'fadin'
 *
 * document.addEventListener('DOMContentLoaded', () => {
 *   fadin('.my-class', { delay: 200 })
 * })
 * ```
 */
const fadin = (selector?: string, options?: FadinConfig) =>
    new Fadin({selector, ...options})

export default fadin
