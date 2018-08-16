<template>
  <div class="moreInfo">
    <div class="table-wrap">
      <div class="table-content">
        <ul>
          <li v-for="item in tableData">
            <el-badge is-dot class="item"><i class="icon-message"></i></el-badge>
            <span class="info">{{item.info}}</span>
            <span class="timer">{{item.time}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="page-wrap">
      <el-pagination
          @size-change="changePageSize"
          @current-change="changePageIdx"
          :current-page="curPageIdx"
          :page-sizes="pageSizes"
          :page-size="curPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="curTotal">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      curPageIdx: 1,
      curPageSize: 50,
      curTotal: 10000,
      pageSizes: [5,20,50,100],
      tableData:[
        {
          info:'idjfsaifhiasd',
          time:'2018-06-18 09:00'
        },
        {
          info:'idjfsaifhiasd',
          time:'2018-06-18 09:00'
        },
        {
          info:'idjfsaifhiasd',
          time:'2018-06-18 09:00'
        },
        {
          info:'idjfsaifhiasd',
          time:'2018-06-18 09:00'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.moreInfo{
  position: absolute;
  top: 1px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .table-wrap{
    height: calc(~"100% - 32px");
    ul{
      margin: 10px;
      box-sizing: border-box;
      border: 1px solid #c1c1c1;
      li{
        padding:10px;
        border-bottom: 1px solid #c1c1c1;
        position: relative;
        i{
          display: inline-block;
          width: 20px;
          height: 20px;
          background-size: 20px;
          background-repeat: no-repeat;
          position: relative;
        }
        .timer{
          position: absolute;
          right: 80px;
        }
      }
    }
  }
}
</style>
