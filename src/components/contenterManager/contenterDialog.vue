<template>
  <div>
    <el-dialog class="addDialog"
      :title="dialogTitle"
      :visible.sync="dialogFormVisible1"
      @close = 'close'
      top="7vh"
      width="840px">
      <el-tabs v-model="addDialogTabs" type="border-card">
        <el-tab-pane label="合作信息" name="first">
          <el-form :model="cooperateForm" label-width="100px" :inline="true" :rules="ruleCooperate" >
            <el-form-item label="内容商名称:" prop="providerName">
                <el-input v-model="cooperateForm.providerName"></el-input>
            </el-form-item>
            <el-form-item label="内容商编码:" prop="cpId">
                <el-input v-model="cooperateForm.cpId"></el-input>
            </el-form-item>
            <el-form-item label="英文名:" prop="englishName">
                <el-input v-model="cooperateForm.englishName"></el-input>
            </el-form-item>
            <el-form-item label="版权平台:" prop="platform">
                <el-select v-model="cooperateForm.platform" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系人:" prop="contact">
                <el-input v-model="cooperateForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="职位:" prop="position">
                <el-input v-model="cooperateForm.position"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="contactPhone">
                <el-input v-model="cooperateForm.contactPhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="contactEmail">
                <el-input v-model="cooperateForm.contactEmail"></el-input>
            </el-form-item>
            <el-form-item label="媒资容量:" prop="contentCapacity">
                <el-input v-model="cooperateForm.contentCapacity"></el-input>
            </el-form-item>
            <el-form-item label="合作时间:" prop="coop_time">
                  <el-col :span="11">
                    <el-form-item >
                      <el-date-picker type="date"
                        placeholder="选择日期"
                        style="width: 100%;"
                        v-model="cooperateForm.effectiveTime"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item >
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%;"
                        v-model="cooperateForm.expiredTime"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                  </el-col>
            </el-form-item>
            <el-form-item label="合作商类型:" prop="type">
              <el-radio v-model="cooperateForm.type" label="内容提供商">内容提供商</el-radio>
              <el-radio v-model="cooperateForm.type" label="服务提供商">服务提供商</el-radio>
              <el-radio v-model="cooperateForm.type" label="直播提供商">直播提供商</el-radio>
              <el-radio v-model="cooperateForm.type" label="版权提供商">版权提供商</el-radio>
            </el-form-item>
            <el-form-item label="权限平台:" prop="au_platform" class="authority clearfix">
              <el-checkbox-group v-model="checkRightList">
                <el-scrollbar style="height:100%">
                  <el-checkbox  v-for="(item, index) in playForm" :key="index" :label="item.operatorName" name="type" :class="{five: index % 4 === 0 && index != 0}"></el-checkbox>
                </el-scrollbar>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="内容商信息" name="second">
          <el-form label-width="120px" :inline="true" :rules="rulecooperation">
            <el-form-item label="公司全名:" prop="companyName">
                <el-input v-model="cooperateForm.companyName"></el-input>
            </el-form-item>
            <el-form-item label="公司法人:" prop="legalEntity">
                <el-input v-model="cooperateForm.legalPerson"></el-input>
            </el-form-item>
            <el-form-item label="公司电话:" prop="companyPhone">
                <el-input v-model="cooperateForm.companyPhone"></el-input>
            </el-form-item>
            <el-form-item label="工商注册号:" prop="registrationNum">
                <el-input v-model="cooperateForm.registrationNum"></el-input>
            </el-form-item>
            <el-form-item label="组织机构代码:" prop="organizationCode">
                <el-input v-model="cooperateForm.organizationCode"></el-input>
            </el-form-item>
            <el-form-item label="统一信用代码:" prop="creditCode">
                <el-input v-model="cooperateForm.creditCode"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号:" prop="taxpayerNum">
                <el-input v-model="cooperateForm.taxpayerNum"></el-input>
            </el-form-item>
            <el-form-item label="官网地址:" prop="companyWebsite" class="block-el-form">
                <el-input v-model="cooperateForm.companyWebsite"></el-input>
            </el-form-item>
            <el-form-item label="公司地址:" prop="companyAddress" class="block-el-form">
                <el-input v-model="cooperateForm.companyAddress"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="合同信息" name="third">
          <el-form label-width="100px" :inline="true">
            <el-form-item label="合同编号:" prop="contractNum">
                <el-input v-model="cooperateForm.contractNum"></el-input>
            </el-form-item>
            <el-form-item label="签订日期:" prop="contractDate">
                <el-date-picker
                  v-model="cooperateForm.contractDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 100%;">
                  </el-date-picker>
            </el-form-item>
            <el-form-item label="合同负责人:" prop="contractPrincipal">
                <el-input v-model="cooperateForm.contractPrincipal"></el-input>
            </el-form-item>
            <el-form-item label="合同负责人:" prop="contractImage" class="block-el-form">
              <el-upload
                ref="upload"
                multiple
                action= ''
                accept='image/*'
                class="el-upload2"
                :on-remove="onRomove"
                :on-change="uploadChange"
                list-type="picture-card"
                :file-list="fileList"
                :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="comfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['dialogFormVisible', 'cooperateForm', 'dialogStatus', 'providerId'],
  data () {
    return {
      addDialogTabs: 'first',
      value: '',
      contenter: '',
      contractImage: '',
      playForm: [], // 权限平台所有数据
      checkRightList: [], // 当前选中的权限平台数据
      options: [{
        value: '手机',
        label: '手机'
      }, {
        value: '电视',
        label: '电视'
      }, {
        value: 'PC',
        label: 'PC'
      }],
      ruleCooperate: {
        providerName: [
          { required: true, message: '请输入内容商名称', trigger: 'blur' }
        ],
        cpId: [
          { required: true, message: '请输入内容商编码', trigger: 'blur' }
        ],
        platform: [
          { required: true, message: '请输入版权平台', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        contentCapacity: [
          { required: true, message: '请输入媒资容量', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入合作商类型', trigger: 'blur' }
        ],
        coop_time: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        au_platform: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ]
      },
      rulecooperation: {
        companyName: [
          { required: true, message: '请输入公司全名', trigger: 'blur' }
        ],
        legalEntity: [
          { required: true, message: '请输入公司法人', trigger: 'blur' }
        ],
        companyPhone: [
          { required: true, message: '请输入公司电话', trigger: 'blur' }
        ],
        registrationNum: [
          { required: true, message: '请输入公司工商注册号', trigger: 'blur' }
        ],
        organizationCode: [
          { required: true, message: '请输入组织机构代码', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请输入统一信用代码', trigger: 'blur' }
        ],
        taxpayerNum: [
          { required: true, message: '请输入纳税人识别号', trigger: 'blur' }
        ]
      },
      hasChangeImg: false // 判断有没有更换图片
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    comfirm () {
      let formData = new FormData()
      let inputDom = document.getElementsByClassName("el-upload__input")[0]

      for (let item in this.cooperateForm) {
        let itemData = this.cooperateForm[item]
        let itemName = item

        if (item === 'contractImage') {
          continue
        }

        if (item === 'idList') {
          let arr = []
          this.checkRightList.map(i => {
            this.playForm.forEach((i2, index) => {
              if (i2.operatorName === i) {
                arr.push(i2.id)
              }
            })
          })
          itemName = 'operatorIds'
          itemData = arr.join('-')
        }

        if (item === 'effectiveTime' || item === 'expiredTime') {
          itemName = item + 'String'
          itemData = itemData.toString().slice(0, 10)
        }

        formData.append(itemName, itemData)
      }
      // 如果上传了图片或者修改了图，才上传
      if (this.hasChangeImg) {
        formData.append('file', inputDom.files[0])
      }

      for (let i of formData.entries()) {
        console.log(i[0] + ', ' + i[1])
      }

      // 新增的情况下，保存数据
      if (this.dialogStatus === 1) {
        this.$http({
          url: 'addContenter',
          type: 'post',
          data: formData
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '保存失败'
            })
          }
          this.close()
        })
      } else { // 编辑的情况下保存数据
        formData.append('providerId', this.providerId)
        this.$http({
          url: 'editContenter',
          type: 'post',
          data: formData
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '保存失败'
            })
          }
          this.close()
        })
      }
    },
    handleAvatarSuccess () {

    },
    beforeAvatarUpload () {},
    // 合同图片默认的只有一张
    uploadChange (file, fileList) {
      let dom = document.getElementsByClassName('el-upload-list')[0]
      dom.innerHTML = ''
      this.hasChangeImg = true
    },
    onRomove () {}
  },
  computed: {
    dialogFormVisible1: {
      get () {
        // eslint-disable-next-line
        this.checkRightList = this.cooperateForm.idList.map((item, index) => {
          let name
          this.playForm.forEach(item2 => {
            if (item2.id === item) {
              name = item2.operatorName
            }
          })
          return name
        })
        return this.dialogFormVisible
      },
      set () {}
    },
    dialogTitle: {
      get () {
        return (this.dialogStatus ? '新建' : '编辑') + '内容商'
      }
    },
    fileList: {
      get () {
        if (this.cooperateForm.contractImage) {
          return [{name: '', url: "data:image/png;base64," + this.cooperateForm.contractImage}]
        } else {
          return []
        }
      },
      set () {}
    }
  },
  mounted () {
    this.$http({
      url: 'getRightPlayform'
    }).then((res) => {
      this.playForm = res.data
    })
  }
}
</script>
<style lang="less">
.authority{
  position: relative;
  .el-checkbox-group{
    width: 90%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
    left: 0px;
    top: 0px;
    text-align: left;
    border: 1px solid #eef1f6;
    padding: 5px;
    .five{
      margin-left: 0px
    }
  }
}
.block-el-form{
  display: block!important;
  .el-input{
    width: 600px!important;
  }
}
//image
.avatar-uploader{
  display: inline-block;
  // border: 1px solid #eef1f6;
  width: 62px;
  height: 62px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>
