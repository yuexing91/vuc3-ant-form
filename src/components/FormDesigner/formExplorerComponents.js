export function getFormExplorerComponents() {
  let base = {
    title: '基础',
    children: [
      {
        title: '按钮',
        node: `<a-button>按钮</a-button>`,
      },
      {
        title: 'div',
        node: `<div style="min-height: 20px;"></div>`,
      },
    ],
  };

  let layout = {
    title: '布局',
    children: [
      {
        title: '栅格行',
        node: `<a-row type="flex"></a-row>`,
      },
      {
        title: '栅格列',
        node: `<a-col :span="12"></a-col>`,
      },
      {
        title: '卡片',
        node: '<a-card title="基础信息"></a-card>',
      },
      {
        title: '标签页',
        node: '<a-tabs><a-tab-pane tab="标签页1" key="pane1"></a-tab-pane> <a-tab-pane tab="标签页2" key="pane2"></a-tab-pane> </a-tabs>',
      },
//      {
//        title: '表单',
//        node: '<a-form></a-form>',
//      },
      {
        title: '表单项',
        node: '<a-form-item label="表单项"></a-form-item>',
      },
    ],
  };

  let opts = JSON.stringify([{
    value: '1',
    label: '选项1',
  }, {
    value: '2',
    label: '选项2',
  }]).replace(/"/g, '\'');

  let inputs = [
    {
      title: '输入框',
      tag: 'a-input',
      node: `<a-input></a-input>`,
    },
    {
      title: '文本域',
      tag: 'a-textarea',
      node: `<a-textarea></a-textarea>`,
    },
    {
      title: '下拉框',
      tag: 'a-select',
      node: `<a-select :options="${ opts }"/>`,
    },
    {
      title: '单选框',
      tag: 'a-radio-group',
      node: `<a-radio-group :options="${ opts }"/>`,
    },
    {
      title: '复选框',
      tag: 'a-checkbox-group',
      node: `<a-checkbox-group :options="${ opts }"/>`,
    },
    {
      title: '自动补全框',
      tag: 'a-auto-complete',
      node: `<a-auto-complete/>`,
    },
    {
      title: '级联选择',
      tag: 'a-cascader',
      node: `<a-cascader/>`,
    },
    {
      title: '日期选择框',
      tag: 'a-date-picker',
      node: `<a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>`,
    },
    {
      title: '日期区间框',
      tag: 'a-range-picker',
      node: `<a-range-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>`,
    },
    {
      title: '月份选择框',
      tag: 'a-month-picker',
      node: `<a-month-picker format="YYYY-MM" valueFormat="YYYY-MM"/>`,
    },
    {
      title: '星期选择框',
      tag: 'a-week-picker',
      node: `<a-week-picker format="YYYY-wo" valueFormat="YYYY-wo"/>`,
    },
    {
      title: '数字输入框',
      tag: 'a-input-number',
      node: `<a-input-number/>`,
    },
    {
      title: '密码框',
      tag: 'a-input-password',
      node: `<a-input-password/>`,
    },
    {
      title: '搜索框',
      tag: 'a-input-search',
      node: `<a-input-search/>`,
    },
    {
      title: '评分',
      tag: 'a-rate',
      node: `<a-rate/>`,
    },
    {
      title: '滑块',
      tag: 'a-slider',
      node: `<a-slider/>`,
    },
    {
      title: '开关',
      tag: 'a-switch',
      node: `<a-switch/>`,
    },
  ];

  let baseForm = {
    title: '数据录入',
    children: inputs.map((item) => {
      return {
        title: item.title,
        tag({ parentNode, targetNode }) {
          if (!parentNode) return;
          if (parentNode.tag === 'a-row') {
            return 'a-col';
          }
          if (parentNode.tag === 'a-form' ||
              ( parentNode.tag === 'a-col' && parentNode.isEmpty() ) ||
              ( targetNode?.tag === 'a-form-item' && !targetNode.isEmpty() )) {
            return `a-form-item`;
          }
          if (parentNode.tag !== 'a-form-item') {
            return item.tag;
          }
        },
        node({ parentNode, targetNode, dblClick }) {
          if (!parentNode) return;

          const colNode = `<a-col :span="12"><a-form-item label="${ item.title }">${ item.node }</a-form-item></a-col>`;

          if (parentNode.tag === 'a-row') {
            return colNode;
          }

          const formItemNode = `<a-form-item label="${ item.title }">${ item.node }</a-form-item>`;
          if (parentNode.tag === 'a-form' ||
              ( parentNode.tag === 'a-col' && parentNode.isEmpty() ) ||
              ( targetNode?.tag === 'a-form-item' && !targetNode.isEmpty() )) {
            return formItemNode;
          }

          if (dblClick && parentNode.tag === 'a-form-item') {
            if (parentNode.isEmpty()) {
              return item.node;
            }
            return formItemNode;
          }

        },
      };
    }),
  };

  return [base, layout, baseForm];
};
