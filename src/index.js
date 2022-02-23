import './style/ant-designer.less';

import { Configurator } from 'vuc3';
import { createApp } from 'vue';

import { componentConfigs, comboConfigs } from './configs';
import FormDesigner, { getFormExplorerComponents } from './components/FormDesigner';
import ColEditor from './components/attrEditor/ColEditor';
import ValidatorEditor from './components/attrEditor/ValidatorEditor';

import Antd from 'ant-design-vue';


Configurator.registerValueEditor(ColEditor.editorConfig.id, {
  ...ColEditor.editorConfig,
  Editor: ColEditor,
});
Configurator.registerValueEditor(ValidatorEditor.editorConfig.id, {
  ...ValidatorEditor.editorConfig,
  Editor: ValidatorEditor,
});
Configurator.setVucProxyHooks('onCreatedApp', (app) => {
  return app.use(Antd);
});

componentConfigs.forEach(Configurator.setVucConfig);
comboConfigs.forEach(Configurator.registerComboType);

export {
  Configurator,
  FormDesigner,
  getFormExplorerComponents,
};
