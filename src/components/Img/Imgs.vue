<template>
    <div class="view">
        <div class="breadcrumb gray-2">当前位置/图组列表</div>
        <div class="header">
            <div class="search">
              <el-input v-model="srh1" class="srh-1" placeholder="名称,ID,作者"></el-input>
              <el-date-picker
                class="srh-2"
                v-model="srh2"
                type="daterange"
                range-separator="至"
                start-placeholder="创建日期上限"
                end-placeholder="创建日期下限">
              </el-date-picker>
              <el-date-picker
                class="srh-3"
                v-model="srh3"
                type="daterange"
                range-separator="至"
                start-placeholder="修改日期上限"
                end-placeholder="修改日期下限">
              </el-date-picker>
              <el-select v-model="srh4" multiple placeholder="请选择">
                <el-option
                  v-for="item in config.typeSet"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button @click="handleSearch()" class="srh-4" type="primary">搜索</el-button>
            </div>

            <router-link to="imgs-detail/add">
                <el-button type="primary">添加</el-button>
            </router-link>
        </div>
        <div class="context">
           <el-table
            :data="tbData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称"
            >
            </el-table-column>
            <el-table-column
              prop="sourceName"
              label="作品"
            >
            </el-table-column>
            <el-table-column
              prop="size"
              label="数量"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="lastTime"
              label="修改时间">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
    </div>
</template>

<script>

import util from '@/util.js';
import config from '@/config.js';
import moment from 'moment';

export default {
  name: 'ImgsWrap',
  data () {
    return {
      srh1:"",
      srh2:null,
      srh3:null,
      srh4:[],
      curPage:0,
      pageSize:4,
      total:8,
      config,
      tbData: [],
    }
  },
mounted () {
    this.ready = false;
    this.refreshTable();
  },
  methods: {
    refreshTable(cb){
      const{
        srh1,
        srh2,
        srh3,
        srh4,
        curPage,
        pageSize,
      } = this;

      util.ajax(this.config.backSet.imgs, {
        srh:srh1,
        createTime:srh2,
        createTime:srh3,
        type:srh4,
        curPage,
        pageSize,
      }, data=>{
          if(data.result==0){
              this.tbData = data.data.data.map(item=>{
                let id = item._id;
                let name = item._name;
                let map = item._map;
                let sourceName = item._sourceName;
                let size = item._size;
                let createTime = item._createTime;
                let lastTime = item.lastTime;

                return {
                  id,
                  name,
                  map,
                  sourceName,
                  size,
                  createTime:moment(createTime).format("YYYY-MM-DD"),
                  lastTime:moment(createTime).format("YYYY-MM-DD"),
                }
              });
              this.total = data.data.total;
              if(typeof cb=="function")cb();
          }
      });
    },
    handleSearch(){
      this.refreshTable();
    },
    handleEdit(index, row){
      let path = `/imgs-detail/${this.tbData[index].map}+${this.tbData[index].id}`;
      this.$router.push(path)
    },
    handleDelete(index, row){
      util.ajax(this.config.backSet.rmImg, {
          id:this.tbData[index].id, 
          map:this.tbData[index].map, 
    }, data=>{
        if(data.result==0){
            this.refreshTable(()=>{
              util.successError(this, "删除成功");
            });
        }else{
            util.notifyError(this, "删除失败");
        }
      });
    },
    handleCurrentChange(page) {
      this.curPage = page-1;
      this.refreshTable();
    },
  }
}
</script>

<style lang="scss" scoped>
    .header{
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid #C0C4CC;
        .search{
          display: flex;
          min-height: 240px;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 20px;
          .srh-4{
            width: 100px;
          }
        }
    }
</style>
