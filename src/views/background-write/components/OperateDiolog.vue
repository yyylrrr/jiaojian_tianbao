<template>
  <el-dialog
    :title="operatetitle"
		:data="operateinfo"
    :visible.sync="dialogVisible"
    width="60%"
		center
  >
	<el-row  :gutter="5">
		<el-col :span="2.5" :offset="4">
			<span class="select-title">是&emsp;否&emsp;合&emsp;格&emsp;：</span>
		</el-col>
		<el-col :span="6">
			<el-radio-group v-model="radio" @change="watchrule2change">
			<el-radio label = "合格" border size="mini">是</el-radio>
			<el-radio label = "不合格" border size="mini">否</el-radio>
			</el-radio-group>
		</el-col>
		<el-col :span="2.5" :offset="1">
			<span class="select-title">不合格数量：</span>
		</el-col>
		<el-col :span="4">
			<el-input v-model="unpasscount" placeholder="请输入内容" :disabled = "rule2value"></el-input>
		</el-col>
	</el-row>
	<el-row  :gutter="5">
		<el-col :span="2.5" :offset="4">
			<span class="select-title">不合格位置：</span>
		</el-col>
		<el-col :span="4">
			<el-input v-model="unpassadress" placeholder="请输入内容" :disabled = "rule2value"></el-input>
		</el-col>
		<el-col :span="2.5" :offset="3">
			<span class="select-title">合&emsp;格&emsp;数&emsp;量&emsp;：</span>
		</el-col>
		<el-col :span="4">
			<el-input v-model="passcount" placeholder="请输入内容"></el-input>
		</el-col>
	</el-row>
						<el-row>
							<el-col class="button-group">
								<el-col :span="2" :offset="8">
									<el-button size="small"
									type="success"
									icon="el-icon-upload"
									@click="submitHandler"
									>保存</el-button>
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

export default {
  name: '',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
		operateinfo: {
				type: Array,
				default:function() {
				return []
      }
    }
  },
  data() {
    return {
			rule2value: false,
      dialogVisible: false,
			selectinfo: {},
			radio: "",
			unpasscount: '',
			unpassadress: '',
			passcount: '',
    }
  },
	methods: {
		watchrule2change(val){
			console.log(val)
			if(val == '合格'){
				this.rule2value = true
			}else{
				this.rule2value = false
			}
		},
		async submitHandler() {
			if(this.radio === "合格"){
				this.selectinfo.value = this.radio+ "," + "合格数量：" + this.passcount
			}
			else if(this.radio === "不合格"){
				this.selectinfo.value = "不合格" +"," +  "不合格数量：" + this.unpasscount + "," + "不合格位置：" + this.unpassadress + "," + "合格数量：" + this.passcount
			}
			await this.$parent.updateDataInfo()
			this.unpasscount= ''
			this.unpassadress= ''
			this.passcount= ''
			this.radio = ''
			this.rule2value = false
			this.dialogVisible = false
			await this.$parent.getsearch()
		},
		cancelHandler() {
			this.dialogVisible = false
		}
	},
	computed: {
		operatetitle() {
			return this.selectinfo.name
		}
	},
  watch: {
    opened() {
      this.dialogVisible = true
			this.selectinfo = this.operateinfo[0]
    }
  },
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
	.select-title {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		text-align:center;
		line-height: 40px	;
	}
</style>