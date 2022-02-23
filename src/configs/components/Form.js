export default {
  id: 'a-form',
  name: '表单',
  eventTypes: [],
  type: ['container', 'form'],
  slots: [
    {
      slot: 'default',
      name: '内容',
    },
  ],
  props: {
    model: {
      label: '数据对象',
      change(attr, old, node) {
        let inputs = node.querySelectorAll('.input');
        inputs.forEach(input => {
          let model = input.getDirective('model');
          if (model) {
            let modelValue = model.getAttrValue();
            let v = modelValue.split('.');
            if (v[0] == old.attrValue) {
              let v1 = [attr.attrValue].concat(v.slice(1)).join('.');
              input.setAttrValue(model.getAttrName(), v1);
            }
          }
        });
      },
    },
    rules: {
      label: '验证规则',
    },
    labelAlign: {
      label: '标签对齐方式',
      editors: 'radio-group?@items=left:左|right:右',
    },
    layout: {
      label: '表单布局',
      editors: 'select?@items=horizontal:水平|vertical:垂直|inline:行内',
    },
    labelCol: {
      label: '标签宽度',
      editors: 'col',
    },
    wrapperCol: {
      label: '控件宽度',
      editors: 'col',
    },
    hideRequiredMark: {
      label: '隐藏必填标记',
      editors: 'boolean',
    },
    colon: {
      label: '显示标签冒号',
      editors: 'boolean?defaultValue=true',
    },
  },
};
