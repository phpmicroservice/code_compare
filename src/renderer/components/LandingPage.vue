<template>
  <div>
    <h1>欢迎使用</h1>
    <div id="d1"></div>
  </div>
</template>

<script>
import fs from "fs";
import path from "path";
export default {
  name: "landing-page",
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    start_file(file){
        fs.readFile(file, (err, fd) =>{
          console.log('17',fd.toString().split(/\r?\n/ig));
        });

        //String.split(/\r?\n/ig)
    
    
    
    },
    start_dir(dir){
      fs.readdir(dir,(err,files)=>{
        for(let i of files){
          let file_dir = path.join(dir,i);
          fs.stat(file_dir,(err,stat_ob)=>{
            if( stat_ob.isFile()){
                console.log(i,' 是文件');
            }
            else if(stat_ob.isDirectory()){
                console.log(i,' 是文件夹');
                this.start_dir(file_dir);
            }
          })
        }
      })
    },
    /**
     * @param file_dir 开始的目录或文件
     */
    start(file_dir){
      // 判断文件
      fs.stat(file_dir,(err ,stat_ob)=>{
         
          if( stat_ob.isFile()){
            //以文件开始
            return this.start_file(file_dir);
          }
          if(stat_ob.isDirectory()){
              return this.start_dir(file_dir);
          }
          alert("不能对这个东西进行比对")
      });
    }
  },
  created() {
    window.addEventListener("drop", (e)=> {
      e.preventDefault();
      e.stopPropagation();
      for (let f of e.dataTransfer.files) {
        this.start(f.path);
        console.log("File(s) you dragged here: ", f.path);
      }
    });
    window.addEventListener("dragover", function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
};
</script>

<style>
#d1 {
  width: 500px;
  height: 500px;
  background: red;
}
</style>
