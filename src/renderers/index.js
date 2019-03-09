import defaultRender from './default-render';
import plainRender from './plain-render';

const renders = {
  plain: plainRender,
  object: defaultRender,
};
export default (fileContent, prefferedFormat) => renders[prefferedFormat](fileContent);
