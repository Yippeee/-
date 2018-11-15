<template>
  <el-dialog
    title="新增发布平台"
    :visible.sync="addDialogShow1"
    width="770px"
    @close="handleClose">
    <el-form label-width="100px" :inline="true" :model="formData">
      <el-form-item label="运营商名称:" prop="id">
          <el-input v-model="formData.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="编号:" prop="id" class="marginMore">
          <!-- <el-input v-model="formData.id"></el-input> -->
          {{formData.id}}
      </el-form-item>
      <el-form-item label="合作状态:" prop="id">
          <el-select v-model="formData.status" placeholder="请选择">
            <el-option
              v-for="item in statusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="级别:" prop="id">
          <el-select v-model="formData.rank" placeholder="请选择">
            <el-option
              v-for="item in rankArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="所属地区:" prop="id" class="marginMore">
          <el-cascader
            v-model="formData.region"
            placeholder="试试搜索"
            :options="options"
            filterable
            change-on-select
          ></el-cascader>
      </el-form-item>
      <el-form-item label="端口:" prop="id" class="marginMore">
          <el-input v-model="formData.port"></el-input>
      </el-form-item>
      <el-form-item label="服务器地址:" prop="id1" class="block-el-form">
          <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="ftp地址:" prop="id2" class="block-el-form">
          <el-input v-model="formData.ftp"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="comfirmDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import area from "../../assets/area.json"
export default {
  props: ['addDialogShow', 'formData'],
  data () {
    return {
      cooperateForm: '',
      options: [],
      value: '',
      statusArr: [{
        value: '1',
        label: '上线'
      }, {
        value: '0',
        label: '下线'
      }],
      rankArr: [{
        value: '1',
        label: '省网'
      }, {
        value: '2',
        label: '市网'
      }]
    }
  },
  mounted () {
    area.provinces.forEach(element => {
      element.label = element.value
      element.children.forEach(e2 => {
        e2.label = e2.value
      })
    })
    this.options = area.provinces
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    comfirmDialog () {
      let param = this.formData
      param.region = param.region.join('/')
      log(param.region)
      if (this.formData.id) { // 编辑的情况
        log('编辑啊')
      } else { // 新增的情况
        this.$http({
          url: 'addPlayForm',
          type: 'post',
          data: param
        }).then(res => {
          log(res)
        })
        log('sss')
      }
    }
  },
  computed: {
    addDialogShow1: {
      get () {
        return this.addDialogShow
      },
      set () {}
    }
  }
}
</script>
<style lang="less" scoped>
.block-el-form{
  display: block;
  .el-input{
    width: 558px!important;
  }
}
</style>
