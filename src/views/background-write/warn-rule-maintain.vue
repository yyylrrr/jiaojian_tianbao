<template>
<div>
	<div>

  <el-dialog
    title='新增预警'
    :visible.sync="opened"
    width="60%"
		center
  >
						<el-row>
							<el-col :span="6">
								<dt class="select-title">所属范围:</dt>
								<el-select v-model="scopevalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getscope">
									<el-option
										v-for="item in firstColumnList"
										:key="item.value"
										:label="item.label"
										:value="item">
									</el-option>									
								</el-select>
							</el-col>
							<el-col :span="6">
								<dt class="select-title">构件选择:</dt>
								<el-select v-model="membervalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getmember">
									<el-option
										v-for="item in secondColumnList"
										:key="item.value"
										:label="item.label"
										:value="item">
									</el-option>	
								</el-select>
							</el-col>
							<el-col :span="6">
									<dt class="select-title">指标选择:</dt>
								<el-select v-model="indexvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in thirdColumnList"
										:key="item.value"
										:label="item.label"
										:value="item">
									</el-option>	
								</el-select>
							</el-col>
							<el-col :span="6">
									<dt class="select-title">规则模板:</dt>
								<el-select v-model="rulevalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in ruleList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="9">
								<dt class="select-title">超出值/百分比:</dt>
								<el-input v-model="commentvalue" size="mini" class="valueinput" placeholder="请输入内容"></el-input>
							</el-col>
							<el-col :span="15">
									<dt class="select-title">预警内容编辑:</dt>
									<el-input v-model="info" size="mini" class="infoinput" placeholder="请输入内容"></el-input>
							</el-col>
						</el-row>
						<div class="button-group">
							<el-button size="small"
							type="success"
							icon="el-icon-upload"
							@click="submitHandler"
							>提交</el-button>
							<el-button size="small"
							type="danger"
							icon="el-icon-circle-close"
							@click="cancelHandler"
							>取消</el-button>
						</div>
  </el-dialog>

				<el-card class="box-card">
						<el-row>
							<el-col :span="24">
								<div class="table">
										<el-table
										:data="warnruleList"
										height="780"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
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
										prop="componentname"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										prop="indexName"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="warnrule"
										label="预警规则">
										</el-table-column>
										<el-table-column
										align="center"
										prop="info"
										label="预警内容">
										</el-table-column>
										<el-table-column
										align="center"
										label="操作"
										width="120"
										type="selection">
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
						<el-row>
							<el-col class="button-group">
								<el-col :span="2">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-upload" @click="AddWarnDataInfo">新增预警</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close" @click="deletewarnrule">删除</el-button>
								</el-col>
							</el-col>
						</el-row>
				</el-card>
	</div>
	<!-- <AddWarnDiolog :opened="AddWarnFrom.opened"></AddWarnDiolog> -->
</div>
</template>

<script>
import axios from 'axios'
import AddWarnDiolog from './components/AddWarnDiolog'
import { savewarnrule, getwarnQuery, deletewarnrule } from '@/api/background.js'

export default {
	name: '',
	components: {
		AddWarnDiolog,
	},
	data() {
		return{
			// AddWarnFrom: {
			// 	title: '新增预警',
			// 	opened:false,
			// 	AddWarnBrief: []
			// },
			opened:false,
			totalpage: 0,
			size: 10,
			page: 1,
			warnruleList: [],
			scopevalue: '',
			membervalue:'',
			indexvalue:'',
			rulevalue:'',
			changevalue:'',
			commentvalue:'',
			info:'',
      dialogVisible: false,
			firstColumnList: [],
			secondColumnList: [],
			thirdColumnList: [],
			ruleList:[{
				label: "[A/B]>=[数值%]",
				value: "[A/B]>=[数值%]"
			},{
				label: "[A/B]<=[数值%]",
				value: "[A/B]<=[数值%]"				
			},{
				label: "[A/B]>[数值%]",
				value: "[A/B]>[数值%]"				
			},{
				label: "[A/B]<[数值%]",
				value: "[A/B]<[数值%]"				
			},{
				label: "[A]>=[数值]",
				value: "[A]>=[数值]"				
			},{
				label: "[A]<=[数值]",
				value: "[A]<=[数值]"				
			},{
				label: "[A]>[数值]",
				value: "[A]>[数值]"				
			},{
				label: "[A]<[数值]",
				value: "[A]<[数值]"				
			}],
			changeList:[{
				label: ">",
				value: ">"
			},{
				label: ">=",
				value: ">="
			},{
				label: "<",
				value: "<"
			},{
				label: "<=",
				value: "<="
			},{
				label: "=",
				value: "="
			}],
			warnrulefileds: {}
		}
	},

	created() {
		this.getwarnrule();
		this.loadData();
	},
	methods: {
		handleSelectionChange(val) {
			this.selectdata = val
		},
		handleSizeChange(val) {
			this.size = val
			this.getwarnrule()
    },
		handleCurrentChange(val) {
			this.page = val
			this.getwarnrule()
    },
		AddWarnDataInfo() {
					this.opened = !this.opened;
		},
		indexMethod(index) {
			return (this.page - 1) * this.size + index + 1;
		},
		getwarnrule() {
			getwarnQuery(this.page, this.size).then(res => {
				this.totalpage = res.detail.totalCount
				this.warnruleList = res.data.map(item =>{
					// item.componentname = this.datalist[parseInt(item.scopeCode)-1].children[parseInt(item.componentTypeCode)-1].label
					// item.workinfo = this.datalist[parseInt(item.scopeCode)-1].children[parseInt(item.componentTypeCode)-1].children[parseInt(item.indexName)-1].label
					for(var i = 0; i < this.firstColumnList.length; i++){
						if(item.scopeCode == this.firstColumnList[i].value){
							for(var j = 0; j < this.firstColumnList[i].children.length; j++)
							if(item.componentTypeCode == this.firstColumnList[i].children[j].value){
								item.componentname = this.firstColumnList[i].children[j].label
								// console.log(this.firstColumnList[i].children[j])
								// for(var k = 0; k < this.firstColumnList[i].children[j].children.length; k++){
								// 	if(item.indexName == this.firstColumnList[i].children[j].children[k].value){
								// 		item.workinfo = this.firstColumnList[i].children[j].children[k].label
								// 	}
								// }
							}
						}
					}
					item.warnrule = item.rule.replace(/数值/g,item.value)
					return item;
				})
				// console.log(this.warnruleList,this.firstColumnList,'测试')
			}).catch(err =>{
				console.log(err);
			})
		},
		deletewarnrule() {
			for(var i = 0; i < this.selectdata.length; i++){
				// console.log(this.selectdata[i].objectID)
				deletewarnrule(this.selectdata[i].objectID).then(res => {
					this.getwarnrule()
				}).catch(err =>{
					console.log(err);
				})
			}
		},
		loadData() {
      axios
        .request({
          url: '/warn-rule.json',
          method: 'get'
        }).then((res) => {
					this.firstColumnList = res.data
					// console.log(this.firstColumnList)
				})
		},
		submitHandler() {
			// console.log(this.scopevalue.value)
			// console.log(this.membervalue.value)
			// console.log(this.indexvalue.value)
			// console.log(this.rulevalue)
			// console.log(this.commentvalue)
			// console.log(this.info)
			this.warnrulefileds = {
				"componentTypeCode": this.membervalue.value,
				"createDate": null,
				"indexName": this.indexvalue.value,
				"info": this.info,
				"modifyDate": null,
				"objectID": null,
				"rule": this.rulevalue,
				"scopeCode": this.scopevalue.value,
				"value": this.commentvalue
			}
			savewarnrule(this.warnrulefileds).then(res => {
				this.$message({
					message: "提交成功！",
					type: 'success'
					});
				this.getwarnrule();
				this.scopevalue = '',
				this.membervalue = '',
				this.indexvalue = '',
				this.rulevalue = '',
				this.changevalue = '',
				this.commentvalue = '',
				this.info = '',
				this.opened = false
			}).catch(err =>{
				console.log(err);
			})
		},
		cancelHandler() {
			this.scopevalue = '',
			this.membervalue = '',
			this.indexvalue = '',
			this.rulevalue = '',
			this.changevalue = '',
			this.commentvalue = '',
			this.info = '',
			this.getwarnrule();
			this.opened = false
		},
		getscope(item) {
      if (!item) {
        return
      }else{
				this.secondColumnList = item.children
			}
		},
		getmember(item) {
      if (!item) {
        return
      }else{
				this.thirdColumnList = item.children
			}
		},
	},
  watch: {

  },
}
</script>

<style scoped>
  .box-card {
		margin: 1%;
    width: 98%;
  }
	.table {
		margin-top: 8px;
	}
  .el-row {
    margin-bottom: 15px;
  }
  .el-col {
    border-radius: 4px;
  }
	.button-group {
		margin-top: 5px;
		display:flex;
		justify-content:center;
	}
	.select-title {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		line-height: 40px	;
	}
	.search-box-handler {
		margin-left: 66px;
		top: -35px;
	}
	.button-group {
		display:flex;
		justify-content:center;
	}
	.valueinput {
		width: 70%;
		margin-left: 100px;
		top: -35px;
	}
	.infoinput {
		width: 81%;
		margin-left: 98px;
		top: -35px;
	}
</style>