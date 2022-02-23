<template>
  <Form :label-width="{ style: { width: '100px' } }" :wrapper-col="{ flex: 1 }">
    <FormItem label="错误信息">
      <Input v-model:value="rule.message" allowClear placeholder="请输入错误信息"></Input>
    </FormItem>

    <FormItem label="验证时机">
      <Select v-model:value="rule.trigger" allowClear style="width: 170px">
        <SelectOption value="change">改变值</SelectOption>
        <SelectOption value="blur">失去焦点</SelectOption>
      </Select>
    </FormItem>

    <FormItem>
      <template #label>
        <Checkbox v-model:checked="rule.state.required">必填</Checkbox>
      </template>
      <Switch v-model:checked="rule.required" checked-children="是" un-checked-children="否"/>
    </FormItem>

    <FormItem>
      <template #label>
        <Checkbox v-model:checked="rule.state.type">类型</Checkbox>
      </template>
      <Select v-model:value="rule.type" style="width: 170px" clearable>
        <SelectOption :key="k" :value="k" v-for="(t, k) in types">{{ t }}</SelectOption>
      </Select>
    </FormItem>

    <FormItem>
      <template #label>
        <Checkbox v-model:checked="rule.state.range">范围</Checkbox>
      </template>
      <InputNumber v-model:value="rule.min"/>
      -
      <InputNumber v-model:value="rule.max"/>
    </FormItem>

    <FormItem>
      <template #label>
        <Checkbox v-model:checked="rule.state.len">长度</Checkbox>
      </template>
      <InputNumber v-model:value="rule.len"/>
    </FormItem>

    <FormItem>
      <template #label>
        <Checkbox v-model:checked="rule.state.pattern">正则</Checkbox>
      </template>
      <CodeEditor v-model:value="rule.pattern" inline style="width: 100%"></CodeEditor>
    </FormItem>
  </Form>
</template>

<script>
import { Form, FormItem, Checkbox, InputNumber, Select, SelectOption, Input, Switch } from 'ant-design-vue';
import { CodeEditor } from 'vuc3';
import { types } from './utils';

export default {
  name: 'RuleForm',
  components: {
    CodeEditor, Form, FormItem, Checkbox, InputNumber, Select, SelectOption, Input, Switch,
  },
  props: {
    rule: Object,
  },
  data() {
    return {
      types,
    };
  },
  mounted() {
    let t = {
      min: 'range',
      max: 'range',
      len: 'len',
      type: 'type',
      required: 'required',
      pattern: 'pattern',
    };

    for(let key in t) {
      let state = t[key];
      this.$watch(`rule.${ key }`, () => {
        this.rule.state[state] = true;
      });
    }
  },
};
</script>
