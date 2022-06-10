<template>
		<div class="info-box">
			<el-card class="box-card">
            <el-upload
                class="upload-demo"
                ref="upload" 
                accept=".xlsx, .xls"
                :file-list="fileList"
                :on-change="handleChange"
                :action="uploadUrl"  
                :show-file-list="true"
                :on-success="onSuccess"
                :on-error="onError"
                :auto-upload="false"
            >
                <el-button class="button1" size="small" type="primary" slot="trigger">选取词典</el-button>
								<el-button class="button2" size="small" type="primary" @click="handleSubmit">提交词典</el-button>
								<el-button class="button2" size="small" type="primary" @click="download">下载模板</el-button>
            </el-upload>
			</el-card>
		</div>
</template>

<script>
export default {
	name: 'proceeding-manage',
	data() {
		return {
			fileList: [],
			uploadUrl: '',
		}
	},
	created() {
	},
	methods: {
		onSuccess(res) {
			this.$message({
				message: "上传成功！",
				type: 'success'
				});
				this.getdictable()
			},
			onError(res) {
				this.$message({
					message: "上传失败！",
					type: 'danger'
				}); 
      },
			handleChange(file, fileList) {
				if (fileList.length > 0) {
					this.fileList = [fileList[fileList.length - 1]]
					}
      },
			handleSubmit() {
				this.uploadUrl = 'https://portal.ehjedu.cn/arcgisService/excel/dateUpload'
				this.$nextTick(() => {
					this.$refs.upload.submit()
					})
			},
			download() {
				window.open('https://portal.ehjedu.cn/arcgisService/excel/dicDownload','_blank')
			},
	}
}

</script>

<style scoped>
  .box-card {
		margin: 1%;
    width: 98%;
		height: 920px;
  }
	.button1{
		margin-top: 10px;
	}
	.button2{
		margin-left: 20px;
	}

</style>