<template>
    <div>
        <div class="breadcrumb gray-2">当前位置/添加作品</div>
        <el-form class="form-wrap" v-show="ready" ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="起始年份">
                <el-input v-model="form.startYear"></el-input>
            </el-form-item>
            <el-form-item label="终止年份">
                <el-input v-model="form.endYear"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox :label="config.imgsType.battle" name="type">热血</el-checkbox>
                    <el-checkbox :label="config.imgsType.funny" name="type">搞笑</el-checkbox>
                    <el-checkbox :label="config.imgsType.food" name="type">美食</el-checkbox>
                    <el-checkbox :label="config.imgsType.suspense" name="type">悬疑</el-checkbox>
                    <el-checkbox :label="config.imgsType.animation" name="type">动画</el-checkbox>
                    <el-checkbox :label="config.imgsType.movie" name="type">电影</el-checkbox>
                    <el-checkbox :label="config.imgsType.tv" name="type">电视剧</el-checkbox>
                    <el-checkbox :label="config.imgsType.show" name="type">综艺节目</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="总结">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容简介"
                    v-model="form.oneWord">
                </el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容简介"
                    v-model="form.desc">
                </el-input>
            </el-form-item>
            <el-form-item>
                <Upload @uploadrm="uploadRm" @upload="uploadChange" :url="config.backSet.upload" :imgSet="form.imgs"/>
            </el-form-item>
            <el-form-item>
                <el-button v-show="id=='add'" type="primary" @click="addImgs()">创建</el-button>
                <el-button v-show="id!='add'" type="primary" @click="editImgs()">编辑</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
 
<script>

import Upload from '@/components/Common/Upload/Upload';
import util from '@/util.js';
import config from '@/config.js';

export default {
  name: 'AddImg',
  components: { Upload },
  data () {
    return {
        ready: false,
        config,
        id:"",
        form: {
          name: '',         //名称
          author: '',       //作者
          startYear: 1970,  //起始年份
          endYear: 1970,    //终止年份
          type: [],         //类型
          oneWord: '',      //总结
          imgs: [],         //图片数组
        }
    }
  },
  mounted () {
    this.ready = false;
    this.id = this.$router.history.current.params.id;

    if(this.id=="add"){//创建
        $.post(this.config.backSet.uploadClear, data=>{
            this.ready = true;
        });
    }else{//初始化
        util.ajax(this.config.backSet.source, {id:this.id}, data=>{
            if(data.result==0){
                let source = data.data.data;
                this.form.name = source._name;
                this.form.author = source._author;
                this.form.startYear = source._startYear;
                this.form.endYear = source._endYear;
                this.form.type = source._type.split('-');
                this.form.oneWord = source._oneWord;
                this.form.desc = source._desc;
                this.form.imgs.push(source._faceImg);
                this.ready = true;
            }
        });
    }
  },
  methods: {
      addImgs(){//创建
        util.ajax(this.config.backSet.addSource, this.form, data=>{
            if(data.result==0){
                this.$router.push("/sources")
            }else{
                util.notifyError(this, "上传失败");
            }
        });
      },
      editImgs(){//编辑
        let editObj = {
            id:this.id,
            ...this.form,
        }
        util.ajax(this.config.backSet.editSource, editObj, data=>{
            if(data.result==0){
                this.$router.push("/sources")
            }else{
                util.notifyError(this, "编辑失败");
            }
        });
      },
      uploadChange (imgs) {
        this.form.imgs = imgs;
      },
      uploadRm(img) {
        util.ajax(this.config.backSet.uploadRm, {name:img}, data=>{
            if(data.result==0){
            }else{
                util.notifyError(this, "删除失败");
            }
        });  
      }
  }
}
</script>
