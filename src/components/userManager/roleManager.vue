<template>
  <div class="role-wrap">
    <!--管理员列表-->
    <div class="admin-list">
      <div class="list">
        <div class="admin-info" v-for="(item,index) in adminlist" :key="index">
          <div class="title">
            <span class="admin-name" v-show="item.flag">{{item.roleName}}</span>
            <div class="input" v-show="!item.flag">
              <el-input size="mini" placeholder="请输入角色名称" v-model="item.roleName"></el-input>
              <el-button @click="confirmChange(index)" size="mini" type="primary">确认</el-button>
              <el-button @click="cancleChange(index)" size="mini" type="primary">取消</el-button>
            </div>
            <div class="button-right">
              <span class="edit-button" @click="handleEdit(index)"><i class="el-icon-edit"></i>编辑</span>
              <span class="delete-button" @click="handleDelete(index)"><i class="el-icon-circle-close"></i>删除</span>
            </div>
          </div>
          <div class="authority-list">
            <div class="body">
              <el-row>
                <el-col :span="12">
                  <span>首页:  </span>
                  <el-checkbox-group v-model="item.indexControl">
                    <el-checkbox label="44" :disabled="item.flag">编辑</el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col :span="12">
                  <span>内容商管理：</span>
                  <el-checkbox-group v-model="item.contenter">
                    <el-checkbox label="45" :disabled="item.flag">编辑</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span>报表统计：</span>
                  <el-checkbox-group v-model="item.statistics">
                    <el-checkbox label="46" :disabled="item.flag">查看</el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col :span="12">
                   <span>管理员：</span>
                  <el-checkbox-group v-model="item.manager">
                    <el-checkbox label="47" :disabled="item.flag">查看</el-checkbox>
                    <el-checkbox label="48" :disabled="item.flag">编辑</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <span>角色管理：</span>
                  <el-checkbox-group v-model="item.roleManage">
                    <el-checkbox label="49" :disabled="item.flag">查看</el-checkbox>
                    <el-checkbox label="50" :disabled="item.flag">编辑</el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col :span="12">
                  <span>系统管理：</span>
                  <el-checkbox-group v-model="item.systemManager">
                    <el-checkbox label="51" :disabled="item.flag">编辑</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="add-admin">
        <span class="add-button" @click="handleAddUser"><i class="icon icon-adduser"></i>添加管理员</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      adminlist: [],
      currentLength: 0
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      this.$http({
        url: 'getRoleList'
      })
        .then((res) => {
          this.currentLength = res.data.length
          this.adminlist = res.data
          this.adminlist.forEach(item => {
            let arr = {}
            let managers = []
            let roleManages = []
            item.permissionVOList.forEach(item2 => {
              arr[item2.permissionId] = true
            })
            Vue.set(item, 'contenter', arr[45] ? ['45'] : [])
            Vue.set(item, 'indexControl', arr[44] ? ['44'] : [])
            if (arr[47]) {
              managers.push('47')
            } else if (arr[48]) {
              managers.push('48')
            }
            Vue.set(item, 'manager', managers)
            if (arr[49]) {
              roleManages.push('49')
            } else if (arr[50]) {
              roleManages.push('50')
            }
            Vue.set(item, 'roleManage', roleManages)
            Vue.set(item, 'statistics', arr[46] ? ['46'] : [])
            Vue.set(item, 'systemManager', arr[51] ? ['51'] : [])
            Vue.set(item, 'flag', true)
          })
        })
    },
    handleAddUser () {
      this.adminlist.push({
        indexControl: [],
        statistics: [],
        roleManage: [],
        systemManager: [],
        manager: [],
        contenter: [],
        flag: false,
        roleName: ''
      })
    },
    handleDelete (index) {
      if (index + 1 <= this.currentLength) {
        this.$http({
          type: 'delete',
          url: 'deleteRole',
          data: {
            roleId: this.adminlist[index].roleId
          }
        })
          .then((res) => {
            this.$message(res.msg)
            this.adminlist.splice(index, 1)
          })
          .catch(res => {
            this.$message({
              type: 'error',
              message: '删除失败，联系后台开发人员！'
            })
          })
      } else {
        this.adminlist.splice(index, 1)
      }
    },
    handleEdit (index) {
      this.adminlist[index].flag = false
    },
    confirmChange (index) {
      let permissionIds = []
      let roleName = this.adminlist[index].roleName
      let roleId = this.adminlist[index].roleId
      for (let item in this.adminlist[index]) {
        if (item === 'permissionVOList') continue
        let i = this.adminlist[index][item]
        if (i.length > 0 && Array.isArray(i)) {
          permissionIds = permissionIds.concat(i)
        }
      }
      // new
      if (index + 1 > this.currentLength) {
        this.$http({
          url: 'addRole',
          type: 'post',
          data: {
            roleName: roleName,
            permissionIds: permissionIds
          }
        })
          .then((res) => {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.getDataList()
          })
      } else { // edit
        this.$http({
          type: 'post',
          url: 'editRole',
          data: {
            permissionIds: permissionIds,
            roleId: roleId,
            roleName: roleName
          }
        })
          .then(res => {
            this.$message(res.msg)
          })
      }
      this.adminlist[index].flag = true
    },
    cancleChange (index) {
      if (index + 1 > this.currentLength) {
        this.handleDelete(index)
      } else {
        this.adminlist[index].flag = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.admin-list {
  margin-bottom: 30px;
  width: 100%;
  .list {
    margin-top: 10px;
    width: 100%;
    .admin-info {
      width: 100%;
      margin-top: 10px;
      .title {
        height: 28px;
        line-height: 28px;
        vertical-align: bottom;
        .admin-name {
          padding-top: 7px;
          font-size: 16px;
          font-weight: bold;
          color: #1f2d3d;
        }
        .input {
          display: inline-block;
          .el-input {
            width: 200px;
            margin-right: 10px;
          }
        }
        .button-right {
          padding-top: 7px;
          // display: inline-block;
          float: right;
          .delete-button {
            margin-left: 20px;
            font-size: 14px;
            color: #20a0ff;
            cursor: pointer;
            .el-icon-circle-close:before {
              margin-right: 5px;
            }
          }
          .edit-button {
            font-size: 14px;
            color: #20a0ff;
            cursor: pointer;
            .el-icon-edit:before {
              margin-right: 5px;
            }
          }
        }
      }
      .authority-list {
        border: 1px solid #d2e2f5;
        margin-top: 10px;
        div.body {
          margin: 15px 15px 0 15px;
          .el-col {
            display: inline-block;
            span {
              display: inline-block;
              font-size: 14px;
              color: #475669;
            }
            .el-checkbox-group {
              display: inline-block;
              margin-bottom: 15px;
              .el-checkbox {
                width: 90px;
              }
            }
          }
        }
      }
    }
  }
  .add-button {
    font-size: 14px;
    color: #20a0ff;
    vertical-align: bottom;
    cursor: pointer;
    .icon-adduser {
      margin-right: 5px;
    }
  }
}
.role-wrap{
  padding: 20px;
}
.el-col{
  >span{
    width: 90px!important;
  }
}
</style>
