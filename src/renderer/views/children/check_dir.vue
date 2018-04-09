<template>
<!-- 文件夹比较 -->
  <div class="check-dir" @drop="drop" @dragover="dragover">
      <div class="dir-null" v-if="dir.length==0">
        <h1>请拖入文件夹或文件</h1>
      </div>
      <check-dir-col 
      v-for="(item,index) in dir"  
      :dirpath="item"
      :index="index" 
      :excludedir="exclude_dir"
       :path="item" @toggleExpand="toggleExpand" @update="colupdate">
      
      </check-dir-col>
  </div>
</template>

<script>
import fs from "fs";
import lodash from "lodash";
import diff from "@/libs/diff.js";
import path from "path";
import checkDirCol from "@/components/check_dir_col";
import Hashes from "jshashes";
var MD5 = new Hashes.MD5

import { setInterval } from 'timers';
export default {
  data() {
    return {
      dir:[
        "E:\\www\\admin_sk",
        "E:\\www\\api_demo"
      ],
      exclude_dir:[
        'node_modules'
      ],
      //盛接组件返回的数据
      colList:[],
      last_md5:''
    };
  },
  methods: { 
    drop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.dir.push(e.dataTransfer.files[0].path);
      this.colList.push([]);
    },
    dragover(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    // 节点展开事件
    toggleExpand(data){
      console.log(data);
    },
    //组件数据返回
    colupdate(data,index){
      this.colList[index]=data;
    },
    //对比
    checkdir1(){
      let last_md5_new =MD5.hex(JSON.stringify(this.colList));
      if(last_md5_new == this.last_md5){
          return 1;
      }
      this.last_md5=last_md5_new;
      console.log(this.colList,'50');
      this.checkdir2(this.colList);
      
    },
    checkdir2(colList){
        for(let index in colList){
          let value = colList[index];
          if(index ==0 ){
          }else{
              this.checkdir3(value,colList[0]);
          }

      }
    },
    checkdir_in(value,arr){

      for(let index82 in value){
        let value83 =value[index82];
        let value84 =value1[index82];
        console.log(85,value83,value84);
        
        
      }
    }
  },
  components: {
    checkDirCol
  },
  created(){
    setInterval(()=>{
      console.log("定时器");
      this.checkdir1();
    },5000);
  }
};
</script>

<style scoped lang="less">
.check-dir {
  .dir-null{
    width:100%;
    height:100vh;
    display:flex;
    justify-content:space-around;
    align-items:center;
  }
  display:flex;
  justify-content:space-between;
}
</style>
