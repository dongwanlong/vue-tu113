<template>
    <div class="upload">
        <div class="upload-item upload-img" v-for="(img, index) in imgs" :key="index">
          <img :src='config.backSet.staticUpload + img'/>
          <div class="upload-rm">
            <i @click="onRemove(img)" class="fa fa-remove fa-3x gray-4"></i>
          </div>
        </div>
        <label for="file" class="upload-item">
            <i v-show="state===0" class="fa fa-plus fa-2x gray-4"></i>
            <i v-show="state===1" class="el-icon-loading loading"></i>
        </label>
        <input accept="image/jpeg,image/jpg" @change="onChange($event)" v-show="false" type="file" name="file" id="file"/>
    </div>
</template>

<script>

import config from '@/config.js';
import util from '@/util.js';


export default {
  name: 'Upload',
  data () {
    return {
      xhr: new XMLHttpRequest(),
      config,
      state:0,     //0待上传   1上传中
      imgs:[],     //上传图片列表
    }
  },
  props: [
    'url',      //上传URL,
    'imgSet',     //初始化图片地址列表
  ],
  methods:{
      clearInputFile(f){  
        if(f && f.value){  
            try{  
                f.value = ''; //for IE11, latest Chrome/Firefox/Opera...  
            }catch(err){
            }  
            if(f.value){ //for IE5 ~ IE10  
                var form = document.createElement('form'), ref = f.nextSibling, p = f.parentNode;  
                form.appendChild(f);  
                form.reset();  
                p.insertBefore(f,ref);  
            }  
        }  
      },
      onRemove:function(img){
        this.imgs = this.imgs.filter(item=>item!=img);
        this.$emit('uploadrm', img)
      },
      onChange:function(e){
        let file = e.target.files[0];
        let fd = new FormData();
        let action = this.url;
        fd.append("file", file);
        this.xhr.open("POST", action);
        this.xhr.send(fd);
        this.state = 1;
        //清除input缓存
        this.clearInputFile(document.getElementById('file'));
        this.$emit('upload', this.imgs)
      },
      onPreSuccess:function(e){
        let res = JSON.parse(e.currentTarget.responseText);
        this.imgs.push(res.name);
        this.state = 0;
      },
      onPreError:function(e){
        this.state = 0;
      },
      onPreAbort:function(e){
        this.state = 0;
      },
  },
  mounted:function(){
    this.xhr.addEventListener("load", this.onPreSuccess, false);
    this.xhr.addEventListener("error", this.onPreError, false);
    this.xhr.addEventListener("abort", this.onPreAbort, false);
    this.imgs = this.imgSet;
  },
}
</script>

<style lang="scss" scoped>
    .upload{
        display: flex;
        flex-direction: column;
    }

    .upload-rm{
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      z-index: 2;
      background-color: transparent;
      &:hover{
        .fa-remove{
          display: flex;
        }
        background-color: rgba(100,100,100,0.9);
      }
    }
    .fa-remove{
      display: none;
    }
    .upload-item{
        width: 300px;
        height: 300px;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        border: 1px solid #C0C4CC;
        cursor: pointer;
        img{
          position: absolute;
          width: 280px;
          height: 280px;
        }
        .loading{
            font-size: 26px;
            color: #C0C4CC;
        }
    }
</style>
