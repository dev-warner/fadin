import Fadin, { FadinConfig } from "./fadin";

type FadinInit = (selector: string, options: FadinConfig) => Fadin;

export default (selector?: string, options: FadinConfig = {}) =>
    new Fadin({selector, noInitalScrollEvent: false, ...options})

export { FadinConfig, Fadin, FadinInit};

