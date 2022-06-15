<template>
		<div class="info-box">
			<el-card class="box-card">
						<el-row>
							<el-col :span="7">
								<dt class="select-title">勘探位置选择</dt>
								<el-select v-model="positiontype" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in positionoptions"
										:key="item.code2 + item.chineseName2"
										:label="item.chineseName2"
										:value="item.code2">
									</el-option>
								</el-select>
								<div class="selectbutton">
									<el-button type="info" size="mini" plain @click="positionmanage = true">勘探位置管理</el-button>
									</div>
							</el-col>
							<el-col :span="7">
								<dt class="select-title">分析报告类型</dt>
								<el-select v-model="reporttype" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in reportoptions"
										:key="item.code1 + item.chineseName1"
										:label="item.chineseName1"
										:value="item.code1">
									</el-option>
								</el-select>
								<div class="selectbutton">
									<el-button type="info" size="mini" plain @click="reportmanage = true">报告类型管理</el-button>
								</div>
							</el-col>
							<el-col :span="4">
								<dt class="select-titlee">分析报告名称</dt>
								<el-input v-model="reportname" 
									clearable 
									size="mini"
									class="search-box-handlerr">
								</el-input>
							</el-col>
							<el-col :span="4">
									<dt class="select-titleee">查看链接</dt>
								<el-input v-model="reportlink" 
									clearable 
									size="mini"
									class="search-box-handlerrr">
								</el-input>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="addreport">添加</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										:data="reportList"
										height="800"
										style="width: 100%"
										border
										@row-dblclick="clickchange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										:index="indexMethod"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="分析报告名称">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.reportName" size="small" clearable/>
												<span v-else>{{ row.reportName }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										label="查看链接">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.link" size="small" clearable/>
												<span v-else>{{ row.link }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										label="勘探位置">
											<template slot-scope="{row}">
												<el-select v-if="row.edit" v-model="row.locationName" size="small" class="edit-input"  placeholder="请选择">
													<el-option v-for="item in positionoptions" :key="item.code2 + 'r'" :label="item.chineseName2" :value="item.code2"></el-option>
												</el-select>
												<span v-else>{{ row.locationName }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										label="分析报告类型">
											<template slot-scope="{row}">
												<el-select v-if="row.edit" v-model="row.typeName" size="small" class="edit-input"  placeholder="请选择">
													<el-option v-for="item in reportoptions" :key="item.code1 + 'r'" :label="item.chineseName1" :value="item.code1"></el-option>
												</el-select>
												<span v-else>{{ row.typeName }}</span>
											</template>
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="modifyCreatDate"
										label="修改时间">
										</el-table-column>
										<el-table-column
											label="操作"
											align="center"
											width="100">
											<template slot-scope="scope">
												<el-button @click="renewClick(scope.row)" type="text" size="small">更新</el-button>
												<el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="block">
									<el-pagination
										@size-change="handleSizeChange"
										@current-change="handleCurrentChange"
										:page-sizes = [10,20,30,40]
										:page-size = 10
										layout="total, sizes, prev, pager, next, jumper"
										:total= totalpage>
									</el-pagination>
								</div>
							</el-col>
						</el-row>
			</el-card>
			<el-dialog
				title="勘探位置管理"
				:visible.sync="positionmanage"
				width="30%">
				<el-table
					:data="positionData"
					style="width: 100%"
					@row-dblclick="clickchange">
					<el-table-column
						label="序号"
						align="center"
						type = "index"
						width="80">
					</el-table-column>
					<el-table-column
						label="勘探位置名称"
						align="center">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.locationName" size="small" @keyup.enter.native="editposition(row)" clearable/>
												<span v-else>{{ row.locationName }}</span>
											</template>
					</el-table-column>
					<el-table-column
						label="操作"
						align="center"
						width="160">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="editposition(scope.row)">完成</el-button>
							<el-button
								size="mini"
								type="danger"
								@click="deleteposition(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
					<el-input v-model="position" size="mini" style="width:40%;margin:20px" placeholder="请输入新增位置名称"></el-input>
					<el-button type="primary" @click="savePosition" size="mini">新增</el-button>
				</span>
			</el-dialog>
			<el-dialog
				title="分析报告类型管理"
				:visible.sync="reportmanage"
				width="30%">
				<el-table
					:data="reportData"
					style="width: 100%"
					@row-dblclick="clickchange">
					<el-table-column
						label="序号"
						align="center"
						type = "index"
						width="80">
					</el-table-column>
					<el-table-column
						label="报告类型名称"
						align="center">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.typeName" size="small" @keyup.enter.native="editreport(row)" clearable/>
												<span v-else>{{ row.typeName }}</span>
											</template>
					</el-table-column>
					<el-table-column
						label="操作"
						align="center"
						width="160">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="editreport(scope.row)">完成</el-button>
							<el-button
								size="mini"
								type="danger"
								@click="deletereport(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
					<el-input v-model="report" size="mini" style="width:40%;margin:20px" placeholder="请输入新增位置名称"></el-input>
					<el-button type="primary" @click="saveReport" size="mini">新增</el-button>
				</span>
			</el-dialog>
		</div>
</template>

<script>
import { savereport, getreportQuery, deleteReportInfo, saveposition, getposition, editposition, deleteposition, saveereport, getreport, editreport, deletereport} from '@/api/background.js'

export default {
	name: 'work-manage',
	data() {
		return {
			positionmanage: false,
			position: '',
			reportmanage: false,
			report:'',
			totalpage: 0,
			size: 10,
			page: 1,
			positiontype: '',
			reporttype: '',
			reportoptions:[],
			positionoptions:[],
			reportname:'',
			reportlink:'',
			reportList:[],
			reportfileds: {},
			sortType:false,
			sortableFields:'modifyDate',
			positionData:[],
			reportData:[]
		}
	},
	created() {
		this.getreportpage();
		this.getPosition();
		this.getReport();
	},
	methods: {
		indexMethod(index) {
			return (this.page - 1) * this.size + index + 1;
		},
		addreport() {
			if(this.reportlink != '' &&
				this.reportname != '' &&
				this.positiontype != '' &&
				this.reporttype != ''){
				this.reportfileds = {
					"createDate": null,
					"link":this.reportlink,
					"locationId": this.positiontype,
					"modifyDate": null,
					"objectID": null,
					"reportName": this.reportname,
					"reportTypeId": this.reporttype,
				}
				console.log(this.reportfileds)
				savereport(this.reportfileds).then(res => {
					this.$message({
						message: "提交成功！",
						type: 'success'
						});
					this.reportlink = ''
					this.reportname = ''
					this.reporttype = ''
					this.positiontype = ''
					this.getreportpage();
				}).catch(err =>{
					console.log(err);
				})
			}else{
				this.$message({
					message: "缺少相关信息！",
					type: 'warning'
				});				
			}
		},
		getreportpage(){
			getreportQuery(this.page,this.size,this.sortType,this.sortableFields).then(res => {
				this.totalpage = res.detail.totalCount
				this.reportList = res.data.map(item =>{
					item.edit = false;
					var date = new Date(item.modifyDate).toJSON();
					item.modifyCreatDate = new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
					return item;
				})
				console.log(this.reportList,'测试')
			}).catch(err =>{
				console.log(err);
			})
		},
		handleSizeChange(val) {
			this.size = val
			this.getreportpage();
    },
		handleCurrentChange(val) {
			this.page = val
			this.getreportpage();
    },
		renewClick(report){
			if(report.link != '' &&
				report.reportName != '' &&
				report.reportType != ''){
				report.reportfileds = {
					"createDate": null,
					"link":report.link,
					"modifyDate": null,
					"objectID": report.objectID,
					"reportName": report.reportName,
					"reportType": report.reportType
				}
				report.edit = false
				savereport(report.reportfileds).then(res => {
					this.$message({
						message: "更新成功！",
						type: 'success'
						});
					report.edit = false
					this.getreportpage();
				}).catch(err =>{
					console.log(err);
				})
			}else{
				this.$message({
					message: "缺少相关信息！",
					type: 'warning'
				});				
			}
		},
		deleteClick(report){
			deleteReportInfo([report.objectId]).then(res => {
					this.$message({
						message: "删除成功！",
						type: 'success'
						});
					this.getreportpage();
				}).catch(err =>{
					console.log(err);
				})
		},
		clickchange(row) {
			row.edit = !row.edit
		},
		sortChange(column) {
			console.log(column)
					if(column.order == 'ascending' || column.order == null){
						this.sortType = true
						this.getreportpage();
					}else{
						this.sortType = false
						this.getreportpage();		
					}
				},
		savePosition(){
			let reportLocationDO = {
				"createDate" : null,
				"locationName": this.position,
				"modifyDate": null,
				"objectID": null
			}
			if(this.position != ''){
				saveposition(reportLocationDO).then(res => {
						this.$message({
							message: "新增位置成功！",
							type: 'success'
							});
				this.position = ''
				this.getPosition();
					}).catch(err =>{
						console.log(err);
					})
			}else{
						this.$message({
							message: "请输入位置！",
							type: 'warning'
							});
			}
		},
		async getPosition(){
				await getposition().then(res => {
					this.positionData = res.data.map(item =>{
					item.edit = false;
					var date = new Date(item.modifyDate).toJSON();
					item.modifyCreatDate = new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
					return item;
				})
				this.positionoptions = []
				for(let i = 0; i < this.positionData.length; i++){
					this.positionoptions.push({chineseName2:this.positionData[i].locationName,code2:this.positionData[i].objectID})
				}
				// console.log(this.positionData,this.positionoptions)
					}).catch(err =>{
						console.log(err);
					})			
		},
		async editposition(row){
			// console.log(this.positionData)
			for(let i = 0; i < this.positionData.length; i++) {
				console.log(this.positionData[i].locationName == '')
				if(this.positionData[i].locationName != '' && this.positionData[i].edit == true){
					let reportLocationDO = {
						"createDate" : null,
						"locationName": this.positionData[i].locationName,
						"modifyDate": null,
						"objectID": this.positionData[i].objectID
					}
					await editposition(reportLocationDO).then(res => {
											this.$message({
												message: "编辑位置成功！",
												type: 'success'
												});
											this.positionData[i].edit =false
										}).catch(err =>{
											console.log(err);
										})
				}else if(this.positionData[i].locationName == ''){
						this.$message({
							message: "请输入位置！",
							type: 'warning'
							});
							return
				}
			}
			await this.getPosition();
		},
		deleteposition(row){
			deleteposition(row.objectID).then(res => {
									this.$message({
										message: "删除位置成功！",
										type: 'success'
										});
									this.getPosition();
								}).catch(err =>{
									console.log(err);
								})
		},
		saveReport(){
			let reportTypeDO = {
				"createDate" : null,
				"modifyDate": null,
				"objectID": null,
				"typeName": this.report
			}
			if(this.report != ''){
				saveereport(reportTypeDO).then(res => {
						this.$message({
							message: "新增报告类型成功！",
							type: 'success'
							});
				this.report = ''
				this.getReport();
					}).catch(err =>{
						console.log(err);
					})
			}else{
						this.$message({
							message: "请输入报告类型！",
							type: 'warning'
							});
			}
		},
		async getReport(){
				await getreport().then(res => {
					this.reportData = res.data.map(item =>{
					item.edit = false;
					var date = new Date(item.modifyDate).toJSON();
					item.modifyCreatDate = new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
					return item;
				})
					}).catch(err =>{
						console.log(err);
					})
					this.reportoptions = []
					for(let i = 0; i < this.reportData.length; i++){
						this.reportoptions.push({chineseName1:this.reportData[i].typeName,code1:this.reportData[i].objectID})
					}
		},
		async editreport(val){
			console.log(this.reportData)
			for(let i = 0; i < this.reportData.length; i++){
				if(this.reportData[i].typeName != '' && this.reportData[i].edit == true){
				let reportTypeDO = {
					"createDate" : null,
					"typeName": this.reportData[i].typeName,
					"modifyDate": null,
					"objectID": this.reportData[i].objectID
				}
				await editreport(reportTypeDO).then(res => {
										this.$message({
											message: "编辑报告类型成功！",
											type: 'success'
											});
										this.reportData[i].edit =false
									}).catch(err =>{
										console.log(err);
									})
				}else if(this.reportData[i].typeName == ''){
							this.$message({
								message: "请输入报告类型！",
								type: 'warning'
								});
								return
				}				
			}
			await this.getReport();
		},
		deletereport(val){
			deletereport(val.objectID).then(res => {
									this.$message({
										message: "删除报告类型成功！",
										type: 'success'
										});
									this.getReport();
								}).catch(err =>{
									console.log(err);
								})
		},
	}
}
</script>

<style scoped>
  .box-card {
		margin: 1%;
    width: 98%;
  }
	.select-title {
		color: #303133;
		font-size: 13px;
		font-weight: bold;
		margin-top: 10px;
	}
	.select-titlee {
		color: #303133;
		font-size: 13px;
		font-weight: bold;
		margin-top: 10px;
	}
	.select-titleee {
		color: #303133;
		font-size: 13px;
		font-weight: bold;
		margin-top: 10px;
	}
	.search-box-handler {
		margin-left: 90px;
		width: 200px;
		top: -22px;
	}
	.search-box-handlerr {
		margin-left: 90px;
		width: 50%;
		top: -22px;
	}
	.search-box-handlerrr {
		margin-left: 60px;
		width: 50%;
		top: -22px;
	}
	.certain-button {
		margin-top: 5px;
	}
	.block {
		margin-top: 5px;
	}
	.edit-input{
		width: 100%;
	}
	.selectbutton{
		margin-left: 300px;
		margin-top: -50px;
	}
</style>