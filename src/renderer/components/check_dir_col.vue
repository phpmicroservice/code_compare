<template>
<!-- 文件夹对比列 -->
  <div class="check-dir-col" :style="{width:width}" @drop="drop" @dragover="dragover">
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
          <!-- <Tree :data="data5"></Tree>   -->
          <Tree :data="listData" empty-text="空"></Tree>
      </div>     
  </div>
</template>

<script>
import fs from "fs";
import path from "path";
export default {
  data() {
    return {
      path: "",
      listData: [],
      data5: [
        {
          title: "parent 1",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
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
                      marginRight: "8px"
                    }
                  }),
                  h("span", data.title)
                ]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  [
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "ios-plus-empty",
                        type: "primary"
                      }),
                      style: {
                        width: "52px"
                      },
                      on: {
                        click: () => {
                          this.append(data);
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          children: [
            {
              title: "child 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                  expand: true
                },
                {
                  title: "leaf 1-1-2",
                  expand: true
                }
              ]
            },
            {
              title: "child 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1",
                  expand: true
                },
                {
                  title: "leaf 1-2-1",
                  expand: true
                }
              ]
            }
          ]
        }
      ]
    };
  },
  props: {
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
    drop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.path = e.dataTransfer.files[0].path;
      this.start(f.path, index);
      this.$emit("dirDrop", e.dataTransfer.files, this.index);
    },
    dragover(e) {
      e.preventDefault();
      e.stopPropagation();
    },
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
      console.log("157", dir);
      fs.readdir(dir, (err, files) => {
        let stat_ob,
          files_array = [];
        for (let i in files) {
          let file_dir = path.join(dir, files[i]);
          // 异步
          stat_ob = fs.statSync(file_dir);
          // 如果是文件
          if (stat_ob.isFile()) {
            files_array.push({
              title: "文件:" + files[i],
              path: file_dir,
              type: 0,
              dir: false,
              expand: false
            });
          } else if (stat_ob.isDirectory()) {
            // 如果是文件夹
            files_array.push({
              title: "文件夹:" + files[i],
              expand: false,
                path: file_dir,
              type: 0,
              dir: true,
              children: []
            });
          }
        }
        this.listData = files_array;
        // this.start_dir(file_dir, arr[i].children);
        
        for(let item136 of this.listData){
            if(item136.dir){
                console.log(190,item136.path);
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
        console.log('210',dir);
         let stat_ob = fs.statSync(dir);
          // 如果是文件
          if (!stat_ob.isDirectory()) {
              return 1;
          }
        
        fs.readdir(dir, (err, files) => {
        let stat_ob,
        files_array = [];
        for (let i in files) {
          let file_dir = path.join(dir, files[i]);
           console.log(198,file_dir);
          // 异步
          stat_ob = fs.statSync(file_dir);
          // 如果是文件
          if (stat_ob.isFile()) {
            files_array.push({
              title: "文件:" + files[i],
              type: 0,
              dir: false,
               path: file_dir,
              expand: false
            });
          } else if (stat_ob.isDirectory()) {
            // 如果是文件夹
            files_array.push({
              title: "文件夹:" + files[i],
              expand: false,
              type: 0,
               path: file_dir,
              dir: true,
              children: []
            });
          }
        }
        item.children = files_array;
        // this.start_dir(file_dir, arr[i].children);
        for(let item227 of item.children){
            console.log(243,item227);
            if(item227.dir){
                this.read_dir(item227);
            }
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
