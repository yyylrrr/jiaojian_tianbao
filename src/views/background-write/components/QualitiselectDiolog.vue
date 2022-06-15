<template>
  <el-dialog
    :title="qualitiselecttitle"
		:data="qualitiselectinfo"
    :visible.sync="dialogVisible"
    width="40%"
		center
  >
  <el-checkbox-group v-model="checkList" class="check-list">
    <el-checkbox label="错台" border class="check-box"></el-checkbox>
    <el-checkbox label="线条不顺直" border class="check-box"></el-checkbox>
    <el-checkbox label="尺寸偏差" border class="check-box"></el-checkbox>
		<el-checkbox label="冷缝" border class="check-box"></el-checkbox>
  </el-checkbox-group>
  <el-checkbox-group v-model="checkList" class="check-list">
    <el-checkbox label="色差" border class="check-box"></el-checkbox>
    <el-checkbox label="蜂窝麻面" border class="check-box"></el-checkbox>
    <el-checkbox label="露筋" border class="check-box"></el-checkbox>
		<el-checkbox label="浮浆" border class="check-box"></el-checkbox>
  </el-checkbox-group>
						<el-row>
							<el-col class="check-list">
								<el-col :span="2" :offset="8">
									<el-button size="small"
									type="success"
									icon="el-icon-upload"
									@click="submitHandler"
									>提交</el-button>
								</el-col>
								<el-col :span="2" :offset="4">
									<el-button size="small"
									type="danger" 
									icon="el-icon-circle-close"
									@click="cancelHandler"
									>取消</el-button>
								</el-col>
							</el-col>
						</el-row>
  </el-dialog>
</template>

<script>
import { savewarnrule } from '@/api/background.js'

export default {
  name: '',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
		qualitiselectinfo: {
				type: Array,
				default:function() {
				return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
			checkList: [],
			selectinfo: {},
    }
  },
	methods: {
		async submitHandler() {
			// console.log(this.checkList)
			this.selectinfo.value = ''
			for(let i = 0; i < this.checkList.length; i++){
				this.selectinfo.value = this.selectinfo.value + this.checkList[i].replace("",' ') + ';'
			}
			await this.$parent.updateDataInfo()
			await this.$parent.getsearch()
			this.checkList = []
			this.dialogVisible = false
			await this.$parent.getsearch()
			// this.addwarninfo()

		},
		cancelHandler() {
			this.checkList = [],
			this.dialogVisible = false
		},
		// addwarninfo() {
		// 		let warnrulefileds = {
		// 			"componentTypeCode": this.selectinfo.ebs.substr(19,2),
		// 			"createDate": null,
		// 			"indexName": null,
		// 			"info": null,
		// 			"manageMember": '',
		// 			"modifyDate": null,
		// 			"objectID": null,
		// 			"rule": null,
		// 			"scopeCode": this.selectinfo.ebs.substr(19,2),
		// 			"value": this.selectinfo.value
		// 		}
		// 	savewarnrule(warnrulefileds).then(res => {
		// 		this.$message({
		// 			message: "提交预警成功！",
		// 			type: 'success'
		// 			});
		// 	}).catch(err =>{
		// 		console.log(err);
		// 	})
		// }
	},
	computed: {
		qualitiselecttitle() {
			let title =  this.selectinfo.modelType + this.selectinfo.name
			return String(title)
		}
	},
  watch: {
    opened() {
      this.dialogVisible = true
			this.selectinfo = this.qualitiselectinfo[0]
			console.log(this.selectinfo)
    }
  },
}
</script>

<style scoped>
.check-list{
      width:100%;
      text-align:center;
			margin-top: 20px;
}
.check-box {
	width: 120px;
}
</style>