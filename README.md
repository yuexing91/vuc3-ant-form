# vuc3-ant-form

一个基于 [`vuc3`](https://github.com/yuexing91/vuc3) `ant-design-vue` 的可视化表单设计器，3分钟即可将自己的组件加入到 `vuc3-ant-form` 之中。

[Demo](https://yuexing91.gitee.io/yuexing91.github.io/vuc3-ant-form/)

## 预览

![./docs/images/empty.png](https://img.wenhairu.com/images/2021/12/06/pqjSd.png)

## 使用

### 安装

```
npm install vuc3-ant-form --save
```

### 示例

#### 空白的设计器

```vue

<template>
  <FormDesigner></FormDesigner>
</template>
<script>
// 依赖 ant-design-vue
import 'ant-design-vue/dist/antd.css';
// 依赖 vuc3
import 'vuc3/dist/vuc.css';
// 导入 vuc3-ant-form
import 'vuc3-ant-form/dist/vuc-ant-form.css';
import { FormDesigner } from 'vuc3-ant-form';

export default {
  components: {
    FormDesigner
  }
}
</script>
```

#### 加载 Vue SFC

```vue

<template>
  <FormDesigner :vueContent="vueContent"></FormDesigner>
</template>
```

`vueContent` 的内容

```javascript
export const vueContent = `
<template>
  <a-form :labelCol="{ style: {width:'100px'} }" :model="formData">
    <a-card title="基础信息">
      <a-row type="flex">
        <a-col :span="12">
          <a-form-item name="name" label="输入框">
            <a-input v-model:value="formData.name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="下拉框">
            <a-select :options="[{'value':'1','label':'选项1'},{'value':'2','label':'选项2'},{'value':'3','label':'选项3'}]"></a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
  </a-form>
</template>
<script>
export default {
    data() {
      return { 
        formData: {
          name:'formData'
        },
      };
    },
    methods: {
      //保存表单
      saveForm() {
        alert(JSON.stringify(this.formData))
      }
    }
};
</script>`;

```

效果
![./images/loadVueContent.png](https://img.wenhairu.com/images/2021/12/06/pqL2H.png)

### 将自己的组件加入到 vuc3-and-desing中

假设我们现在有一个简单的按钮组件 `DemoButton.vue`，只需简单3步即可将其加入到设计器中

```vue

<template>
  <button>{{text}}</button>
</template>
<script>
export default {
  props: ['text'],
}
</script>
```

1. 给组件注册配置

```js
Configurator.setVucConfig({
  id: 'demo-button',
  props: {
    text: {
      label: '按钮标签',
      editors: 'string',
    },
  },
});
```

2. 加入到组件资源管理器中

```js 
const formExplorerComponents = [
  {
    title: '自定义组件',
    children: [
      {
        title: '测试按钮',
        node: '<demo-button text="按钮"></demo-button>'
      }
    ]
  }
]
```

3. 将 `DemoButton` 组件注册到 `Vue app` 之中

```js
import DemoButton from './DemoButton.vue';

Configurator.setVucProxyHooks('onCreatedApp', (app) => {
  return app.component('DemoButton', DemoButton);
});

```

将组件注入到组件资源管理器中

```vue

<FormDesigner :formExplorerComponents="formExplorerComponents"></FormDesigner>
```

大功告成，你现在可以在 vuc3-ant-from 中使用 DemoButton 组件了。效果：
![./docs/images/deme.gif](https://img.wenhairu.com/images/2021/12/06/pFJQC.gif)

## 文档

### FormDesigner

表单设计器。

#### props

* `vueContent` `string` 编辑器内容
* `formExplorerComponents` `Array<title:string,children:Array<title:string,tag:string,node:string>>` 表单组件资源管理器
* `editorOptions` `object` 编辑器选项

### Configurator

同 `vuc3.Configurator`

## 更多功能

请查看 `vuc3` [文档](http://yuexing91.gitee.io/yuexing91.github.io/vuc3-docs/)。
