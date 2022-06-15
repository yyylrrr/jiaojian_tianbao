<template>
  <el-dialog
		:title="uploadtitle"
		:data="uploadinfo"
    :visible.sync="dialogVisible"
    width="40%"
		center
  >
	<el-row :gutter="5" >
		<el-col :span="14" :offset="5" class="radioGroup">
			<el-radio v-model="radio" label="合格" size="small" border>合格</el-radio>
			<el-radio v-model="radio" label="Ⅰ级不合格" size="small" border>Ⅰ级不合格</el-radio>
			<el-radio v-model="radio" label="Ⅱ级不合格" size="small" border>Ⅱ级不合格</el-radio>
		</el-col>
	</el-row>
	<el-row>
		<el-col class="uploadfile">
			<el-upload
				class="upload-demo"
				ref="upload"
                      action="#"
                      :show-file-list="true"
                      :on-remove="removeFile"
                      :multiple="true"
                      :file-list="fileList"
                      :on-change="handleChange"
                      :auto-upload="false"
                      :limit="5"
                      :on-exceed="handleExceed"
                      accept=".jpeg, .jpg, .png, .pdf">
				<el-button slot="trigger" size="small" type="primary" class="uploadbutton">选择本地自检结果文件</el-button>
				<el-button style="margin-left: 10px;" size="small" type="success" class="uploadbutton" @click="uploadFile">上传到服务器</el-button>
			</el-upload>
		</el-col>
	</el-row>
  </el-dialog>
</template>

<script>

import { batchUploadFile } from '@/api/background.js'

export default {
  name: '',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
		uploadinfo: {
				type: Array,
				default:function() {
				return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
			selectinfo: {},
			radio: "",
			fileList: [],
    }
  },
	methods: {
    // 选择文件时，往fileList里添加
    handleChange(fileList) {
      this.fileList.push(fileList)
    },
    removeFile(file) {
      // 移除文件时，要重新给fileList赋值
      const arr = []
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid !== file.uid) {
          arr.push(this.fileList[i])
        }
      }
      this.fileList = arr
    },
    // 手动文件上传
    async uploadFile() {
      if (this.fileList.length === 0) {
        this.$message.warning('请选取文件')
        return
      }
			this.selectinfo.value = this.radio
			await this.$parent.updateDataInfo()
			// console.log(this.selectinfo.value)
      let formData = new FormData()
      // 因为要传一个文件数组过去，所以要循环append
      this.fileList.forEach((item, index) => {
        formData.append('file', item.raw)
      })
			formData.append('id', this.selectinfo.objectID)
			formData.append('value', this.radio)
      // batchUploadFile是我自己定义的接口
      await batchUploadFile(formData).then(res => {
				this.$message.success('上传成功！')
        this.fileList = []
				this.dialogVisible = false
      })
			// console.log(this.radio)
			await this.$parent.getsearch();
    },
    // 上传文件超出个数
    handleExceed(files, fileList) {
      this.$message.warning('文件个数超出限制')
    }
	},
	computed: {
		uploadtitle() {
			return this.selectinfo.modelType + '自检结果'
		}
	},
  watch: {
    opened() {
      this.dialogVisible = true
			this.selectinfo = this.uploadinfo[0]
    }
  },
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
	.radioGroup {
				display:flex;
				justify-content:center;
	}
	.uploadfile {
      width:100%;
      text-align:center;
			height: 205px;
			border:1px solid #909399;
	}
	.uploadbutton {
		margin-top: 10px;
	}
</style>