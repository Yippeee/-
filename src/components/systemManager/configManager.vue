<template>
  <div class="configManager">
    <h1>生命周期设置</h1>
    <el-button v-show="visible1" @click="saveChange" type="primary" size="mini" round>保存修改</el-button>
    <div class="card-border">
      <p>
        <span class="p-name">保存策略</span>
        <el-radio v-model="strategy" label='0'>到期自己删除</el-radio>
        <el-radio v-model="strategy" label='-1'>到期转入回收站</el-radio>
        <span style="color:red; font-size:14px" v-if="this.strategy == 0">tips: 到期自己删除 不需要选择时间</span>
      </p>
      <p class="margin-p">
        <span class="p-name">保存时间</span>
        <el-radio v-model="savaTime" label="1" :disabled="this.strategy == 0">一个月</el-radio>
        <el-radio v-model="savaTime" label="3" :disabled="this.strategy == 0">三个月</el-radio>
        <el-radio v-model="savaTime" label="6" :disabled="this.strategy == 0">半年</el-radio>
      </p>
    </div>
    <h1>下发方式设置</h1>
    <el-button v-show="visible2" :disabled="disabled2" @click="saveChange" type="primary" size="mini" round>保存修改</el-button>
    <span style="color:red; font-size:14px" v-if="disabled2">tips: 发布时间不能有重复</span>
    <div class="card-border">
      <p>
        <el-radio v-model="intime" label="0">及时下发</el-radio>
      </p>
      <p class="margin-p">
        <el-radio v-model="intime" label="1">定时下发:</el-radio>
        <span class="p-name span-margin">发布次数</span>
        <el-select v-model="publishTime" placeholder="请选择" :disabled="intime == 0">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <span class="p-name span-margin">发布时间</span>
        <el-time-select
          v-for="(item,index) in publishTime"
          :key="index"
          v-model="issueTimes[index]"
          :disabled="intime == 0"
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
      // 后缀加上Str的字段是用来记录初始数据的，用于判断用户是否更改了数据
      id: 0,
      strategyStr: '',
      strategy: '',
      savaTime: '',
      savaTimeStr: '',
      issueTimes: [],
      issueTimesStr: [],
      intime: '',
      intimeStr: '',
      publishTime: '',
      publishTimeStr: '',
      options: [1, 2, 3],
      visible1: false,
      visible2: false,
      disabled2: false
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    visible1Str () {
      return (this.strategyStr !== this.strategy || this.savaTime !== this.savaTimeStr)
    },
    visible2Str () {
      return (this.intime !== this.intimeStr || this.publishTime !== this.publishTimeStr || this.issueTimes.toString() !==this.issueTimesStr.toString())
    }
  },
  watch: {
    visible1Str (val) {
      if (val) {
        this.visible1 = true
      } else {
        this.visible1 = false
      }
    },
    visible2Str (val) {
      if (val) {
        this.visible2 = true
      } else {
        this.visible2 = false
      }
    },
    issueTimes: {
      handler (val) {
        this.disabled2 = false
        let arr = JSON.parse(JSON.stringify(val))
        arr.sort()
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === arr[i + 1]) {
            this.disabled2 = true
          }
        }
      },
      deep: true
    }
  },
  methods: {
    getData () {
      this.$http({
        url: 'getConfiguration'
      }).then(res => {
        this.id = res.data.id
        // 生命周期设置
        this.strategyStr = res.data.lifeCycle + ''
        this.strategy = this.strategyStr
        if (this.strategyStr !== '0') {
          this.savaTime = this.strategy
          this.savaTimeStr = this.savaTime
          this.strategy = '-1'
          this.strategyStr = '-1'
        }
        // 下发方式设置
        this.intime = res.data.releaseTime === 0 ? '0' : '1'
        this.intimeStr = this.intime
        if (this.intime !== '0') {
          this.publishTime = res.data.releaseTime
          this.publishTimeStr = this.publishTime
          this.issueTimes = res.data.releaseTimeList.map(i => {
            return i.time
          })
          this.issueTimesStr = JSON.parse(JSON.stringify(this.issueTimes))
        }
      })
    },
    saveChange () {
      let param = {id: this.id}
      if (this.visible1) {
        let lifeCycle = this.strategy === '0' ? this.strategy : this.savaTime
        Object.assign(param, {lifeCycle: lifeCycle})
      }
      if (this.visible2) {
        let releaseTime = this.intime === '0' ? '0' : this.publishTime
        let releaseTimeList = []
        releaseTimeList = this.issueTimes.map(i => {
          return {
            time: i
          }
        })
        Object.assign(param, {releaseTime: releaseTime, releaseTimeList: releaseTimeList})
      }
      // sent request
      this.$http({
        url: 'editConfiguration',
        type: 'post',
        data: param
      }).then(res => {
        if (res.code === 0) {
          this.getData()
          this.$message({
            type: 'success',
            message: res.msg || '修改成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg || '修改失败'
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.configManager{
  padding: 20px;
  h1{
    display: inline-block;
    width: 100px;
    font-weight: 700;
    color: #475669;
    height: 30px;
    padding-top: 10px;
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
