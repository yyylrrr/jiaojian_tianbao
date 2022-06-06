<template>
		<div class="info-box">
			<el-card class="box-card">
         <!-- 列表 -->
	        <el-table
	          :data="tableData"
	          border
						class="table1"
						height="770"
	          style="width: 100%">
					<el-table-column
						label="序号"
						align="center"
						type = "index"
						:index="indexMethod"
						width="80">
					</el-table-column>
	          <el-table-column
	            prop="chineseName"
	            label="编码名称">
	          </el-table-column>
	          <el-table-column
	            prop="code"
	            label="编码">
	          </el-table-column>
	        </el-table>
       	 <!-- 列表 end -->
						<el-row>
							<el-col :span="12">
								<div class="block">
									<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:page-sizes = [50,100,200,400]
										:page-size = 50
										layout="total, sizes, prev, pager, next, jumper"
										:total= totalpage>
									</el-pagination>
								</div>
							</el-col>
						</el-row>
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
								<el-button class="button2" size="small" type="danger" @click="deleteexcel">清空数据库</el-button>
            </el-upload>
			</el-card>
		</div>
</template>

<script>

import { deleteexcel, getdicQuery } from '@/api/background.js'

export default {
	name: 'dic-manage',
	data() {
		return {
			fileList: [],
			uploadUrl: '',
			tableData: [],
			totalpage: 0,
			size: 50,
			page: 1,
		}
	},
	created() {
		this.getdictable()
	},
	methods: {
		indexMethod(index) {
			return (this.page - 1) * this.size + index + 1;
		},
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
				this.uploadUrl = 'https://portal.ehjedu.cn/arcgisService/excel/dicUpload'
				this.$nextTick(() => {
					this.$refs.upload.submit()
					})
			},
			download() {
				window.open('https://portal.ehjedu.cn/arcgisService/excel/dicDownload','_blank')
			},
			deleteexcel() {
				deleteexcel().then(res => {
					this.$message({
						message: "清除成功！",
						type: 'success'
					});
					this.getdictable()
				}).catch(err =>{
					console.log(err);
				})
			},
			getdictable() {
				getdicQuery(this.page,this.size).then(res => {
					//  console.log(res.data)
					this.totalpage = res.detail.totalCount
					this.tableData =res.data
				}).catch(err =>{
					console.log(err);
				})
			},
		handleSizeChange(val) {
			this.size = val
			this.getdictable();
    },
		handleCurrentChange(val) {
			this.page = val
			this.getdictable();
    },
	}
}
</script>

<style scoped>
	.block {
		margin-top: 10px;
	}
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