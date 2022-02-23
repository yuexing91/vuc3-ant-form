<template>
  <Item title="模式">
    <Select v-model:value="type" @change="changeType" style="width: 100%">
      <SelectOption value="FormItem">简单模式</SelectOption>
      <SelectOption value="GridFormItem">栅格模式</SelectOption>
    </Select>
  </Item>
  <Item title="栅格占位格数" v-if="type=='GridFormItem'">
    <Select v-model:value="span" :options="spanList" @change="changeSpan" style="width: 100%"/>
  </Item>
  <PropsPanel :vuc-node="formNode"></PropsPanel>
</template>

<script>

import { Select, SelectOption } from 'ant-design-vue';
import { PropsPanel, Item, createVucNode } from 'vuc3';

export default {
  name: 'FormMode',
  components: {
    PropsPanel, Item, Select, SelectOption,
  },
  props: {
    vucAst: Object,
  },
  data() {
    let spanList = [];
    for(let i = 1; i <= 24; i++) {
      spanList.push({
        value: i + '',
      });
    }

    return {
      type: '',
      span: 12,
      spanList,
    };
  },
  computed: {
    formNode() {
      return this.vucAst.querySelector('a-form');
    },
  },
  watch: {
    vucAst: {
      handler(vucAst) {
        let map = {
          FormItem: 0,
          GridFormItem: 0,
        };

        let spanMap = {};
        vucAst.combos.forEach(combo => {
          map[combo.comboType.id]++;
          if (combo.comboType.id === 'GridFormItem') {
            let span = combo.getNode('col')?.getBind('span')?.getAttrValue();
            spanMap[span] = ( spanMap[span] || 0 ) + 1;
          }
        });
        let count = 0;
        for(let span in spanMap) {
          if (spanMap[span] > count) {
            count = spanMap[span];
            this.span = span;
          }
        }

        this.type = map.GridFormItem > map.FormItem ? 'GridFormItem' : 'FormItem';
      },
      immediate: true,
    },
  },
  methods: {
    changeType() {
      if (this.type === 'FormItem') {
        this.changeToFormItem();
      } else {
        this.changeToGridFormItem();
      }
    },
    changeToFormItem() {
      let vs = new WeakMap();

      let rows = [];
      let cols = [];
      this.vucAst.combos.forEach(combo => {
        if (combo.comboType.id === 'GridFormItem') {
          let row = combo.rootNode.parent;
          let formItems = vs.get(row);
          if (formItems == null) {
            rows.push(row);
            formItems = [];
            vs.set(row, formItems);
          }
          formItems.splice(formItems.length, 0, ...combo.rootNode.children);
          cols.push(combo.rootNode);
        }
      });

      rows.forEach(row => {
        row.insertAfter(vs.get(row));
      });
      cols.forEach(col => col.remove());
      rows.forEach(row => {
        if (row.isEmpty()) {
          row.remove();
        }
      });
    },
    changeToGridFormItem() {
      let map = new WeakMap();
      let parents = [];
      this.vucAst.combos.forEach(combo => {
        if (combo.comboType.id === 'FormItem') {
          let parent = combo.rootNode.parent;
          let formItems = map.get(parent);
          if (formItems == null) {
            parents.push(parent);
            formItems = [];
            map.set(parent, formItems);
          }
          formItems.push(combo.rootNode);
        }
      });

      parents.forEach(parent => {
        let row = createVucNode(`<a-row type="flex"></a-row>`);
        let formItems = map.get(parent);
        formItems[0].insertBefore(row);
        let cols = formItems.map(formItem => {
          let col = createVucNode(`<a-col :span="12"></a-col>`);
          col.appendNode(formItem);
          return col;
        });
        row.appendNode(cols);
      });

    },
    changeSpan() {
      this.vucAst.combos.forEach(combo => {
        if (combo.comboType.id === 'GridFormItem') {
          combo.getNode('col').setAttrValue(':span', this.span);
        }
      });
    },
  },

};
</script>

<style scoped>

</style>
