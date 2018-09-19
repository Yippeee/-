<template>
  <el-dialog
    title="新增发布平台"
    :visible.sync="addDialogShow1"
    width="770px"
    @close="handleClose">
    <el-form label-width="100px" :inline="true" :model="formData">
      <el-form-item label="运营商名称:" prop="id">
          <el-input ></el-input>
      </el-form-item>
      <el-form-item label="编号:" prop="id" class="marginMore">
          <el-input ></el-input>
      </el-form-item>
      <el-form-item label="合作状态:" prop="id">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="级别:" prop="id">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="所属地区:" prop="id" class="marginMore">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="端口:" prop="id" class="marginMore">
          <el-input ></el-input>
      </el-form-item>
      <el-form-item label="服务器地址:" prop="id1" class="block-el-form">
          <el-input v-model="cooperateForm.id"></el-input>
      </el-form-item>
      <el-form-item label="ftp地址:" prop="id2" class="block-el-form">
          <el-input v-model="cooperateForm.id"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['addDialogShow', 'formData'],
  data () {
    return {
      cooperateForm: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
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
