import defaultRender from './render';
import plainRender from './plain-render';

const renders = {
  plain: plainRender,
  default: defaultRender,
};
export default (fileContent, prefferedFormat) => renders[prefferedFormat](fileContent);
