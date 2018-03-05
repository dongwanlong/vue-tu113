<template>
    <div>
        <div class="breadcrumb gray-2">当前位置/添加图组</div>
        <el-form class="form-wrap" v-show="ready" ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="作品ID">
                <el-input v-model="form.sourceId"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox v-for="typeObj in config.typeSet" :label="typeObj.value" :key="typeObj.value" name="type">{{typeObj.label}}</el-checkbox>
                </el-checkbox-group>
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
          sourceId: '',     //来源
          type: [],         //类型
          imgs: [],         //图片数组
        }
    }
  },
  mounted () {
    this.ready = false;
    var param = this.$router.history.current.params.id;

    if(param=="add"){//创建
        this.id = "add";
        $.post(this.config.backSet.uploadClear, data=>{
            this.ready = true;
        });
    }else{//初始化
        var params = param.split('+');
        this.map = params[0];
        this.id = params[1];

        util.ajax(this.config.backSet.img, {id:this.id, map:this.map}, data=>{
            if(data.result==0){
                let source = data.data.data;
                this.form.name = source._name;
                this.form.sourceId = source._sourceId;
                this.form.type = source._type.split('-');
                this.form.oneWord = source._oneWord;
                for(let img of source._imgs){
                    this.form.imgs.push(img);
                }
                this.ready = true;
            }
        });
    }
  },
  methods: {
        addImgs(){//创建
            util.ajax(this.config.backSet.addImg, this.form, data=>{
                if(data.result==0){
                    this.$router.push("/imgs")
                }else{
                    util.notifyError(this, "上传失败");
                }
            });
        },
        editImgs(){//编辑
            let editObj = {
                id:this.id,
                map:this.map,
                ...this.form,
            }
            util.ajax(this.config.backSet.editImg, editObj, data=>{
                if(data.result==0){
                    this.$router.push("/imgs")
                }else{
                    util.notifyError(this, "编辑失败");
                }
            });
        },
      resetForm(formName) {
      },
      uploadChange (imgs) {
        this.form.imgs = imgs;
      },
      uploadRm(img) {
        util.ajax(this.config.backSet.uploadRm, {name:img}, data=>{
            if(data.result==0){
            }else{
                util.notifyError(this, "删除失败");
            }d
        });  
      }
  }
}
</script>
r3