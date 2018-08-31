<template>
	<div class="role-wrap">
		<!--管理员列表-->
		<div class="admin-list">
			<div class="list">
				<div class="admin-info" v-for="(item,index) in adminlist">
					<div class="title"> 
						<span class="admin-name" v-show="item.flag">{{item.roleName}}</span>
						<div class="input" v-show="!item.flag">
							<el-input size="mini" placeholder="请输入角色名称" v-model="item.roleName"></el-input><el-button @click="confirmChange(index)" size="mini" type="primary">确认</el-button>
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
									<span>视频上传：</span>
									<el-checkbox-group v-model="item.videoUploadList">
								    <el-checkbox label="sosoAndLook">搜索/查看</el-checkbox>
								    <el-checkbox label="addAndDelete">添加/删除</el-checkbox>
								    <el-checkbox label="filter">筛选</el-checkbox>
								  </el-checkbox-group>
								</el-col>
								<el-col :span="12">
									<span>节&nbsp;目&nbsp;库&nbsp;：</span>
									<el-checkbox-group v-model="item.videoLab">
								    <el-checkbox label="sosoAndLook">搜索/查看</el-checkbox>
								    <el-checkbox label="edit">编辑</el-checkbox>
								  </el-checkbox-group>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<span>视频发布：</span>
									<el-checkbox-group v-model="item.videoPublish">
								    <el-checkbox label="sosoAndLook">搜索/查看</el-checkbox>
								    <el-checkbox label="edit">编辑</el-checkbox>
								    <el-checkbox label="publish">发布</el-checkbox>
								    <el-checkbox label="remove">下架</el-checkbox>
								  </el-checkbox-group>
								</el-col>
								<el-col :span="12">
									<span>视频审核：</span>
									<el-checkbox-group v-model="item.videoCheck">
								    <el-checkbox label="check">审核</el-checkbox>
								    <el-checkbox label="rejected">驳回列表视频管理</el-checkbox>
								  </el-checkbox-group>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
   								<span>报表统计：</span>
									<el-checkbox-group v-model="item.statistics">
								    <el-checkbox label="sosoAndLook">搜索/查看</el-checkbox>
								    <el-checkbox label="download">下载</el-checkbox>
								  </el-checkbox-group>
								</el-col>
								<el-col :span="12">
									<span>后台用户：</span>
									<el-checkbox-group v-model="item.backendUser">
								    <el-checkbox label="Look">查看</el-checkbox>
								    <el-checkbox label="addAndDelete">添加/删除</el-checkbox>
								  </el-checkbox-group>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<span>角色管理：</span>
									<el-checkbox-group v-model="item.roleManage">
								    <el-checkbox label="Look">查看</el-checkbox>
								    <el-checkbox label="addAndDelete">添加/删除</el-checkbox>
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
export default {
  /* eslint-disable*/
	data() {
		return {
      adminlist:[]
		}
	},
	methods: {
		handleAddUser() {
      this.adminlist.push({
        videoUploadList:[],
        videoLab:[],
        videoPublish:[],
        videoCheck:[],
        statistics:[],
        backendUser:[],
        roleManage:[],
        flag:false,
        roleName:'普通管理员'
      })
		},
		handleDelete (index) {
      this.adminlist.splice(index,1)
		},
		handleEdit (index) {
      this.adminlist[index].flag = false
    },
    confirmChange (index) {
      // this.adminlist[index].roleName = 
      this.adminlist[index].flag = true      
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

</style>