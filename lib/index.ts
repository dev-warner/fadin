import Fadin, { FadinConfig } from "./fadin";

const fadin = (selector?: string, options: FadinConfig = {}) =>
    new Fadin({selector, noInitalScrollEvent: false, ...options})

export default fadin;

export { FadinConfig, Fadin };

