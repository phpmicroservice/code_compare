<template>
<!-- 文件夹比较 -->
  <div class="check-dir">
      <check-dir-col v-for="item in dir"  :dirpath="item"
       :excludedir="exclude_dir" @dirDrop="dirDrop">
      
      </check-dir-col>
  </div>
</template>

<script>
import fs from "fs";
import path from "path";
import checkDirCol from "@/components/check_dir_col";
export default {
  data() {
    return {
      dir:[
        "E:\\www\\admin_sk",
         "E:\\www\\api_demo"
      ],
      exclude_dir:[
        'node_modules'
      ]
    };
  },
  methods: { 
    dirDrop(files, index) {
      for (let f of files) {
          if(this.dir[index]){
              this.dir[index]=f.path;
          }else{
              this.dir.push(f.path);
          }              
      }
    }
  },
  components: {
    checkDirCol
  }
};
</script>

<style scoped lang="less">
.check-dir {
  display:flex;
  justify-content:space-between;
}
</style>
