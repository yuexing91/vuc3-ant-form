let template = `
<a-col key="col">
  <a-form-item key="formItem">
    <type.input key="input" allowChildren="true"/>
  </a-form-item>
</a-col>`;

import FormItem from './FormItem';

export default {
  id: 'GridFormItem',
  name: '栅格表单项',
  template,
  configs(combo) {
    let configs = FormItem.configs(combo);

    configs[0].items.splice(2, 0, {
      nodeKey: 'col',
      name: 'span',
      label: '栅格数',
    });

    return configs;
  },
};
