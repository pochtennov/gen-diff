import complexRender from './complex-render';
import plainRender from './plain-render';
import jsonRender from './json-render';

const renders = {
  plain: plainRender,
  complex: complexRender,
  json: jsonRender,
};
export default (fileContent, prefferedFormat) => renders[prefferedFormat](fileContent);
