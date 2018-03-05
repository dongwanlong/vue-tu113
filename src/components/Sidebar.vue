<template>
  <div class="menu">
    <router-link to="/imgs">
      <div class="menu-item center">
          <i class="fa fa-file-image-o fa-2x gray-4"></i>
      </div>
    </router-link>
    <router-link to="/sources">
      <div class="menu-item center">
          <i class="fa fa-th-large fa-2x gray-4"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'elSidebar',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-item{
    height: 60px;
    &:hover{
      cursor: pointer;
      background: #303133;
      i{color: rgb(255, 255, 255);}
    }
  }
</style>

