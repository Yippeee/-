<template>
  <el-dialog
    title="事件提醒"
    :visible.sync="dialogVisible1"
    width="660px"
    @close="handleClose">
    <span>{{message}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">下一条</el-button>
      <el-button @click="handleClose">我知道了</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['dialogVisible', 'message'],
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  },
  computed: {
    dialogVisible1: {
      get () {
        return this.dialogVisible
      },
      set () {

      }
    }
  }
}
</script>
