<template>
	<div style="height: 100%; padding: 0 20px;">
		<!--头部导航栏-->
<!-- 		<div class="nav-wrapper" ref="head">
			<nav-bar :label="breadcrumbs" />
		</div> -->
		<!--上部趋势图-->
		<div class="trend-wrapper">
			<div class="top-desc">
				<div class="title-left">
					<p>视频订购量趋势</p>
				</div>
				<div class="date-right">
					<el-date-picker
			      v-model="dateRange[0]"
			      type="month"
			      size="small"
			      @change="filterDate"
			      placeholder="选择开始时间">
			    </el-date-picker>
			    <el-date-picker
			      v-model="dateRange[1]"
			      type="month"
			      size="small"
			      @change="filterDate"
			      placeholder="选择结束时间">
			    </el-date-picker>
				</div>
			</div>
			<div class="bottom-statistics"> 
				<div class="left-chart"> 
					<div class="chart" ref="chart"></div>
				</div>
				<div class="right-table">
					<div class="list-title">
	  				<span>上线地订购量排名</span>
	  			</div>
					<div class="table-wrapper">
						<el-table :data="tData1.dataList" :height="tData1.tHeight" ref="table" @row-click="handleRowClick" size="mini" :highlight-current-row="true" :cell-style="cellStyle" :header-cell-style="{'background-color': '#ffffff', 'border-bottom': 'none'}" v-loading="loading1">
							<el-table-column prop="rank" label="排名" width="70" align="center"></el-table-column>
							<el-table-column prop="district" label="上线地" min-width="120"></el-table-column>
							<el-table-column prop="total" label="总计" min-width="80"></el-table-column>
						</el-table>
					</div>	
				</div>
			</div>
		</div>
		<!--下部表格区-->
		<div class="order-detail">
			<div class="title">
				<div class="title-left">
					<p>订购详情</p>
				</div>
				<div class="button-right">
					<a class="icon-my-downloadExcel" @click="handleExport">下载表格</a>
				</div>
			</div>
			<div class="statistics">
				<p class="desc"><i class="el-icon-warning"></i>节目数量:&nbsp;&nbsp;<span>{{statistics.program}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订购数量:&nbsp;&nbsp;<span>{{statistics.order}}</span></p>
			</div>
			<div>
        <el-select v-model="district" placeholder="请选择内容商" clearable multiple @change="handleDistrict">
          <el-option v-for="item in allDistricts" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
			</div>
			<div class="table-wrapper">
				<el-table :data="tData2.dataList" :height="tData2.tHeight" size="small" v-loading="loading2">
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop="index" label="序号" width="100"></el-table-column>
					<el-table-column prop="name" label="节目"></el-table-column>
					<el-table-column prop="price" label="市场价格"></el-table-column>
					<el-table-column prop="order" label="订购数量"></el-table-column>
					<el-table-column prop="district" label="内容商"></el-table-column>
				</el-table>
			</div>		
		</div>
		<!--分页区-->
		<div class="pager-wrapper">
			<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pData.currentPage"
	      :page-sizes="pData.pageSizes"
	      :page-size="pData.pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pData.total">
	    </el-pagination>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import Axios from "axios"
// import NavBar from "../components/NavBar"
import { format as dateFormatter } from "date-fns"
import startOfMonth from 'date-fns/start_of_month'
import subMonths from 'date-fns/sub_months'
export default {
	// components: {
	// 	NavBar
	// },
	data() {
		return {
			breadcrumbs: ['报表统计', '订购统计'],
			district: [],
			allDistricts: [],
			loading1: true,
			loading2: true,
			dateRange: [],  // 时间筛选
			chart: null,   // 折线图对象
			defaultOption: {   // 图表配置项
				color: ['#409eff', '#67C23A'],   // 折线颜色
				tooltip: {    // 提示框
					trigger: 'axis',   // 提示框显示内容
					backgroundColor: '#fff',   // 背景颜色
					textStyle: {   // 文字颜色
						color: '#000'
					},
					formatter: (params) => {
						var res = '<div><p style="font-weight: bold;">' + dateFormatter(params[0].name, "YYYY年M月") + '</p></div>';
						for(let i = 0; i < params.length; i++) {
							res += `<p><span style="color: #606266;">${params[i].seriesName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #409eff;">${params[i].data}</span></p>`;
							if(this.ratioData[params[i].dataIndex] > 0) {
								res += `<p><span style="color: #606266;">月环比</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;">+${this.ratioData[params[i].dataIndex]}%</span></p>`;
							} else if(this.ratioData[params[i].dataIndex] < 0) {
								res += `<p><span style="color: #606266;">月环比</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #67C23A;">${this.ratioData[params[i].dataIndex]}%</span></p>`;
							} else {
								res += `<p><span style="color: #606266;">月环比</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>`;
							}							
						}
						return res;
					}
				},
				grid: {
	        left: '2%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
		    },
		    xAxis: {   // x轴
	        type: 'category',
	        // data: ['2018/03', '2018/04', '2018/05', '2018/06', '2018/07', '2018/08']
	        data: []
		    },
		    yAxis: {   // y轴
		    	name: "订购量（次）",
		    	nameGap: 30,
		    	nameTextStyle: {
            fontSize: 14,
            color: '#606266',
            fontWeight: 'normal',
            padding: [0, 0, 0, 20]
        	},
	        type: 'value'
		    },
		    series: [{   
		    	name: "订购量",
		    	symbolSize: 9,   // 拐点圆圈大小
	        // data: [100, 150, 300, 380, 520, 680],
	        data: [],
	        type: 'line'   // 代表折线图
		    }]
			},
			ratioData: [],   // 环比数据暂存数组
			tData1: {
				dataList: [],    // 订购排名数据表
				tHeight: 0
			},
			activeRow: 0,   // 当前被点击的行
			tData2: {    // 订购详情数据表
				dataList: [],
				tHeight: 0
			},
			sData: {},   // 日期筛选
			platform: null,   // 右侧表格点击平台筛选
			// 分页数据
      pData: {
        total: 0,
        currentPage: 1,
        pageSize: 20,
        pageSizes: [20, 30, 50, 100]
      },
      statistics: {
      	program: 0,
      	order: 0
      }
		}
	},
	// computed: {
	// 	orderExportAPI() {
	// 		return this.$iHomed('api', 'order_excel_download');
	// 	},
	// 	userId() {
	// 		return this.$iHomed.cookie('userId');
	// 	}
	// },
	created() {
		this.getAllDistricts();
		this.initDate();
		this.getTableData();	
		this.getPageData();
		this.getStatistics();
		this.getChartData();
	},
	mounted() {
		// 自动调整表格区高度
    let _this = this;	
    // 加定时器，不然高度渲染0
    setTimeout(() => {
      autoResize();
    }, 0);

    window.onresize = autoResize;

    function autoResize() {
      let wh = +window.innerHeight,
					tHeight1 = wh*0.61 - 290,
					tHeight2 = wh*0.39 - 86;
			_this.tData2.tHeight = tHeight1;
			_this.tData1.tHeight = tHeight2;
    };
	},
	methods: {
		// 当前页码变化
  	handleCurrentChange(currentPage) {
  		this.pData.currentPage = currentPage;
      this.getPageData();
  	},
  	// 当前页大小变化
  	handleSizeChange(size) {
  		this.pData.pageSize = size;
      this.getPageData();
  	},
  	handleDistrict() {
  		console.log(this.district);
  		this.getPageData();
  	},
  	// 按日期进行筛选
    filterDate() {
      const fns = this.dateRange;
      if(fns[0] && fns[1]) {
      	this.sData.startDate = dateFormatter(fns[0], "YYYY-MM");
      	this.sData.endDate = dateFormatter(fns[1], "YYYY-MM");
      	this.platform = null;
      	this.getTableData();   
      	this.getPageData();
      	this.getStatistics();
      	this.getChartData(); 	
      } else {
      	return false;
      }
    },
    // 初始化日期筛选
    initDate() {
    	let nowDate = new Date();
    	let nowMonth = startOfMonth(nowDate);
    	let lastYearMonth = subMonths(nowMonth, 5);
    	this.dateRange[0] = lastYearMonth;
    	this.dateRange[1] = nowMonth;
    	this.sData.startDate = dateFormatter(this.dateRange[0], "YYYY-MM");
    	this.sData.endDate = dateFormatter(this.dateRange[1], "YYYY-MM");
    },
    handleRowClick(row, event, column) {
    	this.platform = row.id;
    	this.activeRow = row.rank - 1;
    	this.getChartData();
    },
    // 获取所有地区筛选项
    getAllDistricts() {
    	this.allDistricts = [];
    	// let url = this.$iHomed('api', 'get_all_platforms');

    	// let params = {
    	// 	status: 1
    	// };

    	this.$http({
    		url: 'get_all_platforms',
    		type: 'get',
    		data: {}
    	}).then( res => {
    		// console.log(res);
    		if(res.code === 0) {
    			res.data.forEach( val => {
    				this.allDistricts.push({
    					id: val.id,
    					name: val.providerName
    				})
    			})
    		} else {
    			this.$alert(res.msg);
    		}
    	}).catch( error => {
    		console.log(error);
    		this.$message.error('获取上线地失败！');
    	})
    },
    // 上右部数据表格
    getTableData() {
    	// let url = this.$iHomed('api', 'order_rank_list');

    	let param = {
    		startDate: this.sData.startDate,
    		endDate: this.sData.endDate
    	};

    	this.$http({
    		url: 'order_rank_list',
    		type: 'GET',
    		data: param
    	}).then( res => {
    		// console.log(res);
    		if(res.code === 0) {
    			let list = [];
    			res.data.forEach( (val, index) => {
    				list.push({
    					rank: index + 1,
    					id: val.id,
    					district: val.name,
    					total: val.orderTotal
    				})
    			})
    			this.tData1.dataList = list;
    			this.activeRow = 0;
    			this.$nextTick( () => {
    				this.checked();
    			})
    			this.loading1 = false;    			
    		} else {
    			this.$alert(res.msg);
    			this.loading1 = false;
    		}
    	}).catch( error => {
    		this.$alert('获取上线地订购量排名失败！');
  			this.loading1 = false;
    	})
    },
    // 下部表格数据
    getPageData() {
    	// let url = this.$iHomed('api', 'get_order_detail');

    	let param = {
    		pageSize: this.pData.pageSize,
    		pageNum: this.pData.currentPage,
    		startDate: this.sData.startDate,
    		endDate: this.sData.endDate,
    		list: this.district
    	};

    	this.$http({
    		url: 'get_order_detail',
    		type: 'GET',
    		data: param
    	}).then( res => {
    		// console.log(res);
    		if(res.code === 0) {
    			let list = [];
    			res.data.rows.forEach( (val, index) => {
    				list.push({
    					index: index + 1,
    					name: val.seriesName,
    					price: val.price,
    					order: val.quantityOrder,
    					district: val.name
    				})
    			})

    			this.tData2.dataList = list;
    			this.pData.total = res.data.total;
    			this.loading2 = false;  			
    		} else {
    			this.$alert(res.msg);
    			this.loading2 = false;
    		}
    	}).catch( error => {
    		console.log(error);
    		this.$alert('获取订购详情表格数据失败！');
    		this.loading2 = false;
    	})
    },
    // 获取表格统计数据
    getStatistics() {
    	// let url = this.$iHomed('api', 'get_order_statistics');

    	let param = {
    		startDate: this.sData.startDate,
    		endDate: this.sData.endDate
    	};

    	this.$http({
    		url: 'get_order_statistics',
    		type: 'GET',
    		data: param
    	}).then( res => {
    		if(res.code === 0) {
    			this.statistics.program = res.data.seriesTotal;
    			this.statistics.order = res.data.orderTotal;
    		} else {
    			this.$alert(res.msg);
    		}
    	}).catch( error => {
    		this.$alert('获取表格统计数据失败！');
    	})
    },
    // 图表数据
    getChartData() {
    	let _this = this;

    	// let url = this.$iHomed('api', 'get_order_trend');

    	let param = {
    		startDate: this.sData.startDate,
    		endDate: this.sData.endDate,
    		id: this.platform
    	};

    	this.$http({
    		url: 'get_order_trend',
    		type: 'GET',
    		data: param
    	}).then( res => {
    		if(res.code === 0) {
    			let xList =[], yList = [], tempList = [];
    			res.data.forEach( val => {
    				xList.push(val.dateString);
    				yList.push(val.orderTotal);
    				tempList.push((val.ratio*100).toFixed(1));
    			})
    			this.ratioData = tempList;
    			this.defaultOption.xAxis.data = xList;
    			this.defaultOption.series[0].data = yList;
    			this.chart = echarts.init(this.$refs.chart);
		    	let option = Object.assign({}, this.defaultOption);
		    	this.chart.setOption(option);
    		} else {
    			this.$alert(res.msg);
    		}
    	}).catch( error => {
    		this.$alert('获取趋势图数据失败！');
    	})

    	
    	window.addEventListener('resize', function() {
    		_this.chart.resize();
    	});
    },
    // 下载表格
    handleExport() {

    	let params = {
    		startDate: this.sData.startDate,
    		endDate: this.sData.endDate,
    		listString: this.district.join('-')
    	};

    	this.$http({
    		url: 'order_excel_download',
    		method: 'get',
    		data: params,
    		responseType: 'blob',
  			// headers: {
     //      "Content-Type": "application/json;charset=UTF-8",
     //      "Authorization" : this.$iHomed.cookie('accesstoken')
     //    }
    	}).then( res => {
    		console.log(res);
    		const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
	     	const downloadElement = document.createElement('a');
	     	const href = window.URL.createObjectURL(blob);
	    	downloadElement.href = href;
	      downloadElement.download = '订购详情表.xlsx'
	      document.body.appendChild(downloadElement);
	      downloadElement.click();
	      document.body.removeChild(downloadElement) // 下载完成移除元素
	      window.URL.revokeObjectURL(href) // 释放掉blob对象
    	}).catch( error => {
    		console.log(error);
    	}) 
    },
    // 默认选中上右侧表格的第一行
    checked() {
			if(this.tData1.dataList[0]) {
				// console.log('进来了');
				this.$refs.table.setCurrentRow(this.tData1.dataList[0]);
			}	
		},
		cellStyle(row, column, rowIndex, columnIndex) {
			if(row.rowIndex === this.activeRow && row.columnIndex == 2) {
				return { "color": "#20a0ff", "font-weight": "bold", "border-bottom": "none"};
			}
			return {"border-bottom": "none"};	
		}
	}
}
</script>

<style lang="less" scoped>
.trend-wrapper {
	width: 100%;
	height: 43%;
	border: none;
	.top-desc {
		width: 100%;
		line-height: 50px;
		height: 50px;
		display: inline-block;
		border-bottom: 1px solid #e4e7ed;
		.title-left {
			line-height: 40px;
			height: 40px;
			width: 30%;
			display: inline-block;
			p {
				font-size: 16px;
				font-weight: bold;
			}
		}
		.date-right {
			display: inline-block;
			float: right;
		}
	}
	.bottom-statistics {
		margin-top: 5px;
		width: 100%;
		height: calc(~"100% - 50px");
		display: inline-block;
		.left-chart {
			width: 69%;
			max-width: calc(~"100% - 385px");
			height: 100%;
			display: inline-block;
			.chart {
				width: 100%;
				height: 100%;
			}
		}
		.right-table {
			width: 30%;
			min-width: 385px;
			float: right;
			display: inline-block;
			.list-title {
				height: 36px; 
				border: 1px solid #ebeef5;
				border-bottom: none; 
				background-color: #f5f7fa; 
				border-collapse: collapse;
				span {
					line-height: 36px;
					font-size: 14px; 
					font-weight: bold; 
					color: black; 
					margin-left: 10px;
				}
			}
		}
	}
}
.order-detail {
	width: 100%;
	.title {
		width: 100%;
		line-height: 40px;
		height: 40px;
		display: inline-block;
		border-bottom: 1px solid #e4e7ed;
		.title-left {
			line-height: 40px;
			height: 40px;
			width: 100px;
			display: inline-block;
			p {
				font-size: 16px;
				font-weight: bold;
			}
		}
		.button-right {
			display: inline-block;
			float: right;
			a {
				font-size: 14px;
				color: #909399;
				cursor: pointer;
			}
		}
	}
	.statistics {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin: 10px 0;
		background-color: #e5f6fe;
		.desc {
			margin-left: 20px;
			font-size: 14px;
			span {
				color: red;
			}
			.el-icon-warning:before {
				margin-right: 10px;
				color: #07b869;
			}
		}
	}
}
.el-select {
	margin-bottom: 10px;
}
.table-wrapper {
	border: 1px solid #dfe6ec;
	border-bottom: none;
}
.el-table /deep/ th {
	background-color: #f5f7fa;
	color: black;
	font-weight: bold;
}
.pager-wrapper {
	margin-top: 10px;
	text-align: right;
}
</style>