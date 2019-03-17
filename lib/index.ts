import Fadin, { FadinConfig } from "./fadin";

export { FadinConfig, Fadin};

export default (items?: string, options: FadinConfig = {}) =>
    new Fadin({selector: items, noInitalScrollEvent: false, ...options})


