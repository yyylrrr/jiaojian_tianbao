<template>
<div>
	<div>

  <el-dialog
    title='新增预警'
    :visible.sync="opened"
    width="42%"
		center
  >
						<el-row>
							<el-col :span="8">
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
							<el-col :span="8">
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
							<el-col :span="8">
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
						</el-row>
						<el-row>
							<el-col :span="8">
									<dt class="select-title">规则模板:</dt>
								<el-select v-model="rulevalue1" 
									clearable 
									size="mini"
									class="search-box-handlerr">
									<el-option
										v-for="item in ruleList1"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="8">
								<dt class="select-titlee">&</dt>
								<el-select v-model="rulevalue2" 
									clearable 
									size="mini"
									class="search-box-handlerrr"
									@change="watchrule2change">
									<el-option
										v-for="item in ruleList2"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
								<dt class="select-titleee">数值①：</dt>
								<el-input v-model="commentvalue1" size="mini" class="valueinput1" placeholder="数值①"></el-input>
							</el-col>
							<el-col :span="4">
								<dt class="select-titleeee">数值②：</dt>
								<el-input v-model="commentvalue2" size="mini" class="valueinput2" placeholder="数值②" :disabled = "rule2value"></el-input>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
									<dt class="select-title">预警内容:</dt>
									<el-input v-model="info" size="mini" class="infoinput" placeholder="请输入内容"></el-input>
							</el-col>
						</el-row>
						<el-row>
<el-form :model="warnPeopleForm_one" ref="warnPeopleFormRef_one" :show-close="true">
    <el-row v-for="(item,index) in warnPeopleForm_one.object" :key="index">
        <el-col :span="8">
            <el-form-item :prop="'object.' + index + '.username'" label="关联管理角色："  label-width="110px" style="margin-left: -3px;">
							<el-select size="mini" v-model="item.username" allow-create filterable default-first-option style="width:250px;margin-left:-15px;" placeholder="请选择">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item :prop="'object.' + index + '.phone_number'" label="关联管理人：" label-width="100px" style="margin-left: 90px;">
                <el-input size="mini" type="text" v-model="item.phone_number" style="width:250px;margin-left: -20px;"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="1">
            <el-button style="margin-top:4px;margin-left:175px;" type="success" plain round circle size="mini" v-if=" index == warnPeopleForm_one.object.length - 1 " :v-show="warnPeopleForm_one.object[index] == ''? false:true" @click="addSender_1()" class="el-icon-circle-plus"></el-button>
        </el-col>
        <el-col :span="1">
						<el-button style="margin-top:4px;margin-left:175px;" type="danger" size="mini" plain round circle v-if="warnPeopleForm_one.object.length > 1" @click="removeSender_1(index)" class="el-icon-remove"></el-button>
        </el-col>
    </el-row>
</el-form>
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
										prop="manageMember"
										label="管理角色及管理人">
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
</div>
</template>

<script>
import { savewarnrule, getwarnQuery, deletewarnrule } from '@/api/background.js'

export default {
	name: 'warn-rule-maintain',
	components: {
	},
	data() {
		return{
			warnPeopleForm_one:{
				object: [
					{
						username:'',
						phone_number: '',
					}
				]
			},
			manageMember:'',
			options:[{label:'项目经理',value:'项目经理'
			},{label:'项目总工',value:'项目总工'
			},{label:'项目书记',value:'项目书记'
			},{label:'工点分管领导',value:'工点分管领导'
			},{label:'部门部长',value:'部门部长'
			},{label:'技术人员',value:'技术人员'}],
			opened:false,
			totalpage: 0,
			size: 10,
			page: 1,
			warnruleList: [],
			scopevalue: '',
			membervalue:'',
			indexvalue:'',
			rulevalue1:'',
			rulevalue2:'',
			rule2value: false,
			changevalue:'',
			commentvalue1:'',
			commentvalue2:'',
			info:'',
      dialogVisible: false,
			firstColumnList: [{
				"label": "初支开挖",
				"value": "01",
				"children": [{
					"label": "喷混模型",
					"value": "01",
					"children":[{
						"label": "实际喷射厚度",
						"value": "实际喷射厚度"
					},{
						"label": "初支回弹检测强度",
						"value": "初支回弹检测强度"
					},{
						"label": "实际喷射方量",
						"value": "实际喷射方量"
					}]
				},{
					"label": "小导管模型",
					"value": "03",
					"children":[{
						"label": "注浆量",
						"value": "1"	
					}]
				},{
					"label": "管棚模型",
					"value": "管棚模型",
					"children":[{
						"label": "实际管棚长度",
						"value": "实际管棚长度"			
					},{
						"label": "注浆量",
						"value": "注浆量"		
					}]
				},{
					"label": "锚杆模型",
					"value": "05",
					"children":[{
						"label": "浆体密实度",
						"value": "浆体密实度"		
					}]
				}]
			},{
				"label": "仰拱",
				"value":"02",
				"children": [{
					"label": "仰拱（底板）模型",
					"value": "01",
					"children": [{
						"label": "24h同养混凝土试块强度",
						"value": "24h同养混凝土试块强度"			
					},{
						"label": "3d同养混凝土试块强度",
						"value": "3d同养混凝土试块强度"			
					},{
						"label": "7d同养混凝土试块强度",
						"value": "7d同养混凝土试块强度"			
					},{
						"label": "混凝土实际浇筑量",
						"value": "混凝土实际浇筑量"			
					}]
				}]
			},{
				"label": "二衬",
				"value":"03",
				"children": [{
					"label": "拱墙衬砌模型",
					"value": "01",
					"children":[{
							"label": "24h同养混凝土试块强度",
							"value": "24h同养混凝土试块强度"			
						},{
							"label": "3d同养混凝土试块强度",
							"value": "3d同养混凝土试块强度"			
						},
						{
							"label": "7d同养混凝土试块强度",
							"value": "7d同养混凝土试块强度"			
						},{
							"label": "混凝土实际浇筑量",
							"value": "混凝土实际浇筑量"				
						},{
							"label": "脱模后二衬表观质量",
							"value": "脱模后二衬表观质量"				
						},{
							"label": "自检结果",
							"value": "自检结果"			
						}]		
				}]
			},{
				"label": "防、排水",
				"value":"04",
				"children": [{
					"label": "洞内排水沟模型",
					"value": "02",
					"children":[{
						"label": "外观质量（错台、线形不顺直、尺寸偏差、外观差）",
						"value": "外观质量（错台、线形不顺直、尺寸偏差、外观差）"
					}]	
				}]
			}],
			secondColumnList: [],
			thirdColumnList: [],
			ruleList1:[{
				label: "[数值①%]>=[A/B]",
				value: "[数值%]>=[A/B]"
			},{
				label: "[数值①%]<=[A/B]",
				value: "[数值%]<=[A/B]"				
			},{
				label: "[数值①%]>[A/B]",
				value: "[数值%]>[A/B]"				
			},{
				label: "[数值①%]<[A/B]",
				value: "[数值%]<[A/B]"				
			},{
				label: "[数值①]>=[A]",
				value: "[数值]>=[A]"				
			},{
				label: "[数值①]<=[A]",
				value: "[数值]<=[A]"				
			},{
				label: "[数值①]<[A]",
				value: "[数值]<[A]"				
			},{
				label: "[数值①]>[A]",
				value: "[数值]>[A]"				
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
			ruleList2:[{
				label: "无",
				value: "无"				
			},{
				label: "[A/B]>=[数值②%]",
				value: "[A/B]>=[数值%]"				
			},{
				label: "[A/B]<=[数值②%]",
				value: "[A/B]<=[数值%]"				
			},{
				label: "[A/B]>[数值②%]",
				value: "[A/B]>[数值%]"				
			},{
				label: "[A/B]<[数值②%]",
				value: "[A/B]<[数值%]"				
			},{
				label: "[A]>=[数值②]",
				value: "[A]>=[数值]"				
			},{
				label: "[A]<=[数值②]",
				value: "[A]<=[数值]"				
			},{
				label: "[A]<[数值②]",
				value: "[A]<[数值]"				
			},{
				label: "[A]>[数值②]",
				value: "[A]>[数值]"				
			}],
			warnrulefileds: {}
		}
	},
  watch: {
  },
	created() {
		this.getwarnrule();
		// this.loadData();
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
				this.changewarnrule(res.data)
				console.log(this.warnruleList,'测试')
			}).catch(err =>{
				console.log(err);
			})
		},
		changewarnrule(ruleinfo) {
				this.warnruleList = ruleinfo.map(item =>{
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
					item.valuearr = String(item.value).split(',')
					item.rulearr = String(item.rule).split(',')
					item.warnrule = item.rulearr[0].replace(/数值/g,item.valuearr[0]) + ';' +item.rulearr[1].replace(/数值/g,item.valuearr[1])
					return item;
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
		// loadData() {
    //   axios
    //     .request({
    //       url: '/warn-rule.json',
    //       method: 'get'
    //     }).then((res) => {
		// 			this.firstColumnList = res.data
		// 			// console.log(this.firstColumnList)
		// 		})
		// },
		submitHandler() {
			if(this.scopevalue.value != '',
			this.membervalue.value != '',
			this.rulevalue1 != '',
			this.rulevalue2 != '',
			this.commentvalue1 != ''){
					this.submitHandlerbefore()
				}else{
					this.$message({
						message: "条件不完整，未提交！",
						type: 'warning'
						});
				}
		},
		submitHandlerbefore() {
			this.manageMember = ''
			for(let i = 0; i<this.warnPeopleForm_one.object.length ;i++){
				if(this.warnPeopleForm_one.object[i].username != '' && this.warnPeopleForm_one.object[i].phone_number != ''){
					this.manageMember = this.warnPeopleForm_one.object[i].username +':' + this.warnPeopleForm_one.object[i].phone_number + '；' + this.manageMember
				}else{
					this.manageMember = ''
				}
			}
			if(this.rulevalue2 == '无'){
				this.warnrulefileds = {
					"componentTypeCode": this.membervalue.value,
					"createDate": null,
					"indexName": this.indexvalue.value,
					"info": this.info,
					"manageMember": this.manageMember,
					"modifyDate": null,
					"objectID": null,
					"rule": this.rulevalue1+','+'',
					"scopeCode": this.scopevalue.value,
					"value": this.commentvalue1+','+this.commentvalue2
				}
			}else{
				this.warnrulefileds = {
					"componentTypeCode": this.membervalue.value,
					"createDate": null,
					"indexName": this.indexvalue.value,
					"info": this.info,
					"manageMember": this.manageMember,
					"modifyDate": null,
					"objectID": null,
					"rule": this.rulevalue1+','+ this.rulevalue2,
					"scopeCode": this.scopevalue.value,
					"value": this.commentvalue1+','+this.commentvalue2
				}
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
				this.rulevalue1 = '',
				this.rulevalue2 = '',
				this.rule2value = false,
				this.changevalue = '',
				this.commentvalue1 = '',
				this.commentvalue2 = '',
				this.info = '',
				this.warnPeopleForm_one.object.length = 0,
				this.warnPeopleForm_one.object.push( { username:'', phone_number: ''})
				this.opened = false
			}).catch(err =>{
				console.log(err);
			})
		},
		cancelHandler() {
			this.scopevalue = '',
			this.membervalue = '',
			this.indexvalue = '',
			this.rulevalue1 = '',
			this.rulevalue2 = '',
			this.rule2value = false,
			this.changevalue = '',
			this.commentvalue1 = '',
			this.commentvalue2 = '',
			this.info = '',
			this.warnPeopleForm_one.object.length = 0,
			this.warnPeopleForm_one.object.push( { username:'', phone_number: ''})
			this.getwarnrule();
			this.opened = false
		},
		getscope(item) {
      if (!item) {
				this.membervalue = '',
				this.indexvalue = ''
        return
      }else{
				this.secondColumnList = item.children
			}
		},
		getmember(item) {
      if (!item) {
				this.indexvalue = ''
        return
      }else{
				this.thirdColumnList = item.children
			}
		},
		addSender_1(){  //添加更多联系人
            this.warnPeopleForm_one.object.push( { username:'', phone_number: ''})
    },
		removeSender_1(index){   //移除
            this.warnPeopleForm_one.object.splice( index, 1)
    },
		watchrule2change(val){
			console.log(val)
			if(val == '无'){
				this.rule2value = true
			}else{
				this.rule2value = false
			}
		}
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
	.select-titlee {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		line-height: 40px	;
		margin-left: 10px;
	}
	.select-titleee {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		line-height: 40px	;
		margin-left: -30px;
	}
	.select-titleeee {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		line-height: 40px	;
		margin-left: -15px;
	}
	.search-box-handler {
		margin-left: 66px;
		top: -35px;
	}
	.search-box-handlerr {
		margin-left: 66px;
		width: 75%;
		top: -35px;
	}
	.search-box-handlerrr{
		top: -35px;
		width: 75%;
		margin-left: 26px;
	}
	.button-group {
		display:flex;
		justify-content:center;
	}
	.valueinput1 {
		width: 60%;
		margin-left: 24px;
		top: -35px;
	}
	.valueinput2 {
		width: 60%;
		margin-left: 40px;
		top: -35px;
	}
	.infoinput {
		width: 90%;
		margin-left: 10%;
		top: -35px;
	}
</style>