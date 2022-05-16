<template>
	<div>
		<div class="info-box">
			<el-card class="box-card">
				<el-tabs v-model="tabsName" @tab-click="handleClick">
					<el-tab-pane label="测量队" name="测量队">
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										height="780"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										label="起始里程">
										</el-table-column>
										<el-table-column
										align="center"
										label="终止里程">
										</el-table-column>
										<el-table-column
										align="center"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										label="实时预警详情">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										label="预警时间">
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
							<el-col :span="12">
								<div class="button">
									<el-button type="info">消警</el-button>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="实验室" name="实验室">
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										height="780"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件编码">
										</el-table-column>
										<el-table-column
										align="center"
										label="循环类型">
										</el-table-column>
										<el-table-column
										align="center"
										label="里程段">
										</el-table-column>
										<el-table-column
										align="center"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										label="实时预警详情">
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
							<el-col :span="12">
								<div class="button">
									<el-button type="info">消警</el-button>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="工程部" name="工程部">
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										height="780"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件编码">
										</el-table-column>
										<el-table-column
										align="center"
										label="循环类型">
										</el-table-column>
										<el-table-column
										align="center"
										label="里程段">
										</el-table-column>
										<el-table-column
										align="center"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										label="实时预警详情">
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
							<el-col :span="12">
								<div class="button">
									<el-button type="info">消警</el-button>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="质检部" name="质检部">
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										height="780"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件名称">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件编码">
										</el-table-column>
										<el-table-column
										align="center"
										label="循环类型">
										</el-table-column>
										<el-table-column
										align="center"
										label="里程段">
										</el-table-column>
										<el-table-column
										align="center"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										label="实时预警详情">
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
							<el-col :span="12">
								<div class="button">
									<el-button type="info">消警</el-button>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return{
			tabsName: '测量队',
			totalpage: 0,
			ebscode: '',
			size: 10,
			page: 1,
			selectdata: [],
		}
	},

	methods: {
		handleSelectionChange(val) {
			this.selectdata = val
		},
		handleSizeChange(val) {
			this.size = val
    },
		handleCurrentChange(val) {
			this.page = val
    },
		handleClick(){

		},
		sortChange(column) {
		},
	}
}
</script>

<style scoped>
  .box-card {
		margin: 1%;
    width: 98%;
  }
  .el-row {
    margin-bottom: 15px;
  }
  .el-col {
    border-radius: 4px;
  }
	.block {
		margin-top: 5px;
	}
	.button {
		margin-left: 80%;
	}
</style>