<template>
		<div class="info-box">
			<el-card class="box-card">
						<el-row>
							<el-col :span="7">
								<dt class="select-title">分析报告类型</dt>
								<el-select v-model="reporttype" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in reportoptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="7">
								<dt class="select-title">分析报告名称</dt>
								<el-input v-model="reportname" 
									clearable 
									size="mini"
									class="search-box-handler">
								</el-input>
							</el-col>
							<el-col :span="7">
									<dt class="select-title">查看链接</dt>
								<el-input v-model="reportlink" 
									clearable 
									size="mini"
									class="search-box-handlerr">
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
										label="分析报告类型">
											<template slot-scope="{row}">
												<el-select v-if="row.edit" v-model="row.reportType" size="small" class="edit-input"  placeholder="请选择">
													<el-option v-for="item in reportoptions" :key="item.code" :label="item.chineseName" :value="item.code"></el-option>
												</el-select>
												<span v-else>{{ row.reportType }}</span>
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
		</div>
</template>

<script>
import { savereport, getreportQuery, deleteReportInfo } from '@/api/background.js'

export default {
	name: 'work-manage',
	data() {
		return {
			totalpage: 0,
			size: 10,
			page: 1,
			reporttype: '',
			reportoptions:[{chineseName:'格聂山3#横洞超前地质预报综合分析成果',code:'格聂山3#横洞超前地质预报综合分析成果'
			},{chineseName:'格聂山3#横洞地质核查单',code:'格聂山3#横洞地质核查单'
			},{chineseName:'格聂山3#横洞围岩等级爆破设计',code:'格聂山3#横洞围岩等级爆破设计'
			}],
			reportname:'',
			reportlink:'',
			reportList:[],
			reportfileds: {},
			sortType:false,
			sortableFields:'modifyDate'
		}
	},
	created() {
		this.getreportpage();
	},
	methods: {
		indexMethod(index) {
			return (this.page - 1) * this.size + index + 1;
		},
		addreport() {
			if(this.reportlink != '' &&
				this.reportname != '' &&
				this.reporttype != ''){
				this.reportfileds = {
					"createDate": null,
					"link":this.reportlink,
					"modifyDate": null,
					"objectID": null,
					"reportName": this.reportname,
					"reportType": this.reporttype
				}
				savereport(this.reportfileds).then(res => {
					this.$message({
						message: "提交成功！",
						type: 'success'
						});
					this.reportlink = ''
					this.reportname = ''
					this.reporttype = ''
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
			deleteReportInfo([report.objectID]).then(res => {
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
				}	
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
		font-size: 15px;
		font-weight: bold;
		margin-top: 10px;
		margin-left: 10px;
		width: 100px;
	}
	.search-box-handler {
		margin-left: 105px;
		width: 78%;
		top: -22px;
	}
	.search-box-handlerr {
		margin-left: 75px;
		width: 80%;
		top: -22px;
	}
	.certain-button {
		margin-left: -5px;
		margin-top: 5px;
	}
	.block {
		margin-top: 5px;
	}
	.edit-input{
		width: 100%;
	}
</style>