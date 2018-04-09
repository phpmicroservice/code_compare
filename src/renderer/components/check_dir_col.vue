<template>
<!-- 文件夹对比列 -->
  <div class="check-dir-col" :style="{width:width}">
      <!-- 路径 -->
      <div class="path" v-if="path">
          <span>{{path}}</span>
          <Icon class="close" type="close" @click.native="close"></Icon>
      </div>
      <div class="name-size">
        <!-- 名称 -->
        <div class="name">
            <p>名称</p>
        </div>
        <!-- 大小 -->
        <div class="size">
            <p>大小</p>
        </div>
      </div>
      <div class="list">
          <Tree :data="listData" empty-text="空" @on-toggle-expand="toggleExpand"></Tree>
      </div>     
  </div>
</template>

<script>
import fs from "fs";
import dateFormat from "dateformat";
import path from "path";
export default {
  data() {
    return {
      listData: [],
    };
  },
  props: {
    path:{},
    dirpath: {},
    width: {
      type: String,
      default: "100%"
    },
    index: {
      type: Number,
      default: 0
    },
    excludedir:{}
  },
  methods: {
    close() {
      this.$emit("close", this.index);
    },
    start_file(file) {
      fs.readFile(file, (err, fd) => {
        console.log("17", fd.toString().split(/\r?\n/gi));
      });
    },
    //文件夹
    start_dir(dir) {
      //异步读取文件夹
      fs.readdir(dir, (err, files) => {
        let stat_ob,files_array = [];
        for (let i in files) {          
          let file_dir = path.join(dir, files[i]);
          // 异步
          stat_ob = fs.statSync(file_dir);
          let date66=dateFormat(stat_ob.mtime,    'yyyy-mm-dd HH:MM:ss'   );     
          

          // 如果是文件
          if (stat_ob.isFile()) {
            let size=stat_ob.size;     
            let mtime=stat_ob.mtime;      
            files_array.push({
              title: files[i],
              path: file_dir,
              type: 0,
              dir: false,
              expand: false,
              render: (h, { root, node, data }) => {
                return h("span",{
                    style: {
                      display: "inline-block",
                      width: "100%"
                    }
                  },
                  [
                    h("span", [
                      h("Icon", {
                        props: {
                          type: "ios-paper-outline"
                        },
                        style: {
                          marginRight: "8px",
                          fontSize:"15px"
                        }
                      }),
                      h("span", data.title)
                    ]),
                    h("span",[
                      h("span",{     
                          domProps: {
                            innerHTML: date66
                          },                
                          style: {
                            display: "inline-block",
                            float: "right",
                            marginRight: "32px"
                          }                       
                        })
                      ]  
                    )                                       
                  ]
                );
              },
            });
          } else if (stat_ob.isDirectory()) {
            // 如果是文件夹
            files_array.push({
              title: files[i],
              expand: false,
              path: file_dir,
              type: 0,
              dir: true,
              children: [],
              render: (h, { root, node, data }) => {
                return h("span",{
                    style: {
                      display: "inline-block",
                      width: "100%"
                    }
                  },
                  [
                    h("span", [
                      h("Icon", {
                        props: {
                          type: "ios-folder-outline"
                        },
                        style: {
                          marginRight: "8px",
                          fontSize:"15px"
                        }
                      }),
                      h("span", data.title)
                    ]),
                    h("span",[
                      h("span",{     
                          domProps: {
                            innerHTML: date66
                          },                
                          style: {
                            display: "inline-block",
                            float: "right",
                            marginRight: "32px"
                          }                       
                        })
                      ]  
                    )     
                  ]
                );
              },
            });
          }
        }
        this.listData = files_array;
        this.$emit("update",this.listData,this.index);        
        for(let item136 of this.listData){
            if(item136.dir){
                this.read_dir(item136);
            }
        }
      });
    },
    /**
     * 递归
     * @augments
     * 
     */
    read_dir(item){
        let dir=item.path;
        for(let val208 of this.excludedir){
            let file_dir = path.join(this.dirpath, val208);
            if(file_dir==dir){
                return 1;
            }
        }
         let stat_ob = fs.statSync(dir);
         let date66=dateFormat(stat_ob.mtime,    'yyyy-mm-dd HH:MM:ss'   ); 
          // 如果是文件
          if (!stat_ob.isDirectory()) {
              return 1;
          }
        
        fs.readdir(dir, (err, files) => {
        let stat_ob,
        files_array = [];
        for (let i in files) {
          let file_dir = path.join(dir, files[i]);
          // 异步
          stat_ob = fs.statSync(file_dir);         
          // 如果是文件
          if (stat_ob.isFile()) {
            let size=stat_ob.size;
            files_array.push({
              title: files[i],
              type: 0,
              dir: false,
               path: file_dir,
              expand: false,
              render: (h, { root, node, data }) => {
                return h("span",{
                    style: {
                      display: "inline-block",
                      width: "100%"
                    }
                  },
                  [
                    h("span", [
                      h("Icon", {
                        props: {
                          type: "ios-paper-outline"
                        },
                        style: {
                          marginRight: "8px",
                          fontSize:"15px"
                        }
                      }),
                      h("span", data.title)
                    ]),
                    h("span",[
                      h("span",{     
                          domProps: {
                            innerHTML: date66
                          },                
                          style: {
                            display: "inline-block",
                            float: "right",
                            marginRight: "32px"
                          }                       
                        })
                      ]  
                    )                                       
                  ]
                );
              },
            });
          } else if (stat_ob.isDirectory()) {
            // 如果是文件夹
            files_array.push({
              title: files[i],
              expand: false,
              type: 0,
               path: file_dir,
              dir: true,
              children: [],
              render: (h, { root, node, data }) => {
                return h("span",{
                    style: {
                      display: "inline-block",
                      width: "100%"
                    }
                  },
                  [
                    h("span", [
                      h("Icon", {
                        props: {
                          type: "ios-folder-outline"
                        },
                        style: {
                          marginRight: "8px",
                          fontSize:"15px"
                        }
                      }),
                      h("span", data.title)
                    ]),
                    h("span",[
                      h("span",{     
                          domProps: {
                            innerHTML: date66
                          },                
                          style: {
                            display: "inline-block",
                            float: "right",
                            marginRight: "32px"
                          }                       
                        })
                      ]  
                    )     
                  ]
                );
              },
            });
          }
        }
        item.children = files_array;
        this.$emit("update",this.listData,this.index); 
        for(let item227 of item.children){
            this.read_dir(item227);
        }
      });
    },
    
    start(file_dir, index) {
      // 判断文件
      fs.stat(file_dir, (err, stat_ob) => {
        if (stat_ob.isFile()) {
          //以文件开始
          return this.start_file(file_dir);
        }
        if (stat_ob.isDirectory()) {
          //以文件夹开始
          this.list[index].splice(0, this.list[index].length);
          return this.start_dir(file_dir, this.list[index]);
        }
        alert("不能对这个东西进行比对");
      });
    },
    toggleExpand(data){
      this.$emit("toggleExpand",data);
    }
    
  },
  created() {
    this.start_dir(this.dirpath);
  }
};
</script>

<style scoped lang="less">
.check-dir-col {
  height: 100vh;
  overflow: auto;
  border-right: 1px solid #a0a0a0;
  font-weight:bold;
  .path {
    width: 100%;
    height: 19px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #a0a0a0;
    .close {
      cursor: pointer;
    }
  }
  .name-size {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .name {
      width: 85%;
      > p {
        padding-left: 20px;
        border-bottom: 1px solid #a0a0a0;
      }
    }
    .size {
      width: 15%;
      > p {
        padding-left: 20px;
        border-bottom: 1px solid #a0a0a0;
        border-left: 1px solid #a0a0a0;
      }
    }
  }
  .list {
    padding: 20px;
  }
}
</style>
