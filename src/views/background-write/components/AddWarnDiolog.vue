<template>
  <el-dialog
    :title="AddWarntitle"
    :visible.sync="dialogVisible"
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
							<el-col :span="6">
								<dt class="select-title">对比规则:</dt>
								<el-select v-model="changevalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in changeList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>									
								</el-select>
							</el-col>
							<el-col :span="6">
								<dt class="select-title">超出值/百分比:</dt>
								<el-input v-model="commentvalue" size="mini" class="valueinput" placeholder="请输入内容"></el-input>
							</el-col>
							<el-col :span="12">
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
</template>

<script>
import axios from 'axios'
import { savewarnrule } from '@/api/background.js'

export default {
  name: '',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
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
  mounted() {
    this.loadData()
  },
	methods: {
		submitHandler() {
			// console.log(this.scopevalue.value)
			// console.log(this.membervalue.value)
			// console.log(this.indexvalue.value)
			// console.log(this.rulevalue)
			// console.log(this.changevalue)
			// console.log(this.value)
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
			}).catch(err =>{
				console.log(err);
			})
			this.scopevalue = '',
			this.membervalue = '',
			this.indexvalue = '',
			this.rulevalue = '',
			this.changevalue = '',
			this.commentvalue = '',
			this.info = '',
			this.dialogVisible = false
		},
		cancelHandler() {
			this.dialogVisible = false
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
	computed: {
		AddWarntitle() {
			return '新增预警'
		}
	},
  watch: {
    opened() {
      this.dialogVisible = true
    },
  },
}
</script>

<style scoped>
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
		width: 52%;
		margin-left: 100px;
		top: -35px;
	}
	.infoinput {
		width: 77%;
		margin-left: 98px;
		top: -35px;
	}
</style>