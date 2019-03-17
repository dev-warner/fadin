import Fadin, { FadinConfig } from "./fadin";

type FadinInit = (selector: string, options: FadinConfig) => Fadin;

const fadin = (selector?: string, options: FadinConfig = {}) =>
    new Fadin({selector, noInitalScrollEvent: false, ...options})

export default fadin;

export { FadinConfig, Fadin, FadinInit};

