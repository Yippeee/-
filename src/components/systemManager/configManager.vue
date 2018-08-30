<template>
  <div class="configManager">
    <h1>生命周期设置</h1>
    <div class="card-border">
      <p>
        <span class="p-name">保存策略</span>
        <el-radio v-model="radio" label="1">到期自己删除</el-radio>
        <el-radio v-model="radio" label="2">到期转入回收站</el-radio>
      </p>
      <p class="margin-p">
        <span class="p-name">保存时间</span>
        <el-radio v-model="time" label="1">一个月</el-radio>
        <el-radio v-model="time" label="2">三个月</el-radio>
        <el-radio v-model="time" label="3">半年</el-radio>
      </p>
    </div>
    <h1>下发方式设置</h1>
    <div class="card-border">
      <p>
        <el-radio v-model="intime" label="1">及时下发</el-radio>
      </p>
      <p class="margin-p">
        <el-radio v-model="intime" label="2">定时下发:</el-radio>
        <span class="p-name span-margin">发布次数</span>
        <el-select v-model="publishTime" placeholder="请选择" :disabled="intime == 1">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <span class="p-name span-margin">发布时间</span>
        <el-time-select
          v-model="value1"
          :disabled="intime == 1"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="选择时间">
        </el-time-select>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: '',
      time: '',
      intime: '2',
      publishTime: '',
      options: [1, 2, 3]
    }
  }
}
</script>
<style lang="less" scoped>
.configManager{
  padding: 20px;
  h1{
    font-weight: 700;
    color: #475669;
    padding-bottom: 20px;
  }
  .card-border{
    padding: 30px;
    border: 1px solid #ebeef5;
    margin-bottom: 30px;
    .margin-p{
      margin-top: 20px;
    }
    .p-name{
      color: #606266;
      font-size: 14px;
    }
    .span-margin{
      margin-left: 30px;
    }
  }
}
</style>
