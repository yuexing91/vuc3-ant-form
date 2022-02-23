<template lang="html">
  <SampleDesigner style="height: 100%;"
                  :editorOptions="editorOptions"
                  :explorerComponents="explorerComponents"
                  :vue-content="vueContent">
    <template #right="{ vucAst, selectNode }">
      <SampleNodePanel title="组件选项" :vucAst="vucAst" :selectNode="selectNode"/>
      <PanelView title="表单选项">
        <SampleCard title="常规选项">
          <FormMode :vuc-ast="vucAst"/>
        </SampleCard>
      </PanelView>
      <SampleOptionPanel title="页面选项"/>
    </template>
  </SampleDesigner>
</template>

<script type="text/ecmascript-6">

import { SampleNodePanel, SampleOptionPanel, SampleDesigner, SampleCard, PanelView } from 'vuc3';

import FormMode from '../FormMode';

import { getFormExplorerComponents } from './formExplorerComponents';

export default {
  components: {
    FormMode,
    SampleCard,
    SampleNodePanel,
    SampleOptionPanel,
    SampleDesigner,
    PanelView,
  },
  props: {
    vueContent: {
      type: String,
      default() {
        return `<template> <a-form :model="formData" :labelCol="{ span: 4 }"></a-form> </template><script> export default {data(){return {formData:{}}}} <\/script>`;
      },
    },
    formExplorerComponents: {
      type: Array,
      default() {
        return getFormExplorerComponents();
      },
    },
    editorOptions: {
      type: Object,
    },
  },
  data() {
    return {
      explorerComponents: [],
    };
  },
  watch: {
    formExplorerComponents: {
      immediate: true,
      handler() {
        this.explorerComponents = this.formExplorerComponents;
      },
    },
  },
};
</script>

<style lang="less">

.vuc-designer-views {
  .ant-tabs-tab {
    padding: 8px 12px;
    margin-right: 16px;
  }
}

.vuc-panel-view {
  .vuc-code-table {
    margin: -12px;
  }

  .ant-card-head {
    background: #edf6ff;
  }

  .ant-card-bordered {
    border-width: 0 0 1px 0;
  }
}
</style>
