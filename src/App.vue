<template>
  <div id="app">
    <el-container style="height:100%">
        <el-header class="gray-1-bg head">
          TU113后台资源管理系统
        </el-header>
        <el-container>
          <el-aside class="gray-2-bg" width="60px"><ElSidebar/></el-aside>
          <el-main><router-view/></el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>

import Header from '@/components/Header'
import ElSidebar from '@/components/Sidebar'

export default {
  name: 'app',
  components: { Header, ElSidebar }
}
</script>



<style>
  @import './sass/style.scss';
  
  #app{
    height: 100%;
  }
  .head{
    height: 60px;
    color: #FFF;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
  }
  
</style>

