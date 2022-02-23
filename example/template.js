export let vueContent = `
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
          testData: {
            name:'testData'
          }  
        };
    },
    watch: {},
    computed: {},
    created() {
    },
    methods: {
      //保存表单
      saveForm() {
        alert(JSON.stringify(this.formData))
      }
    }
};
</script>`;
