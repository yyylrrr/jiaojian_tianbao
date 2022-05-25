<template>
	<div>
		<div class="info-box">
			<el-card class="box-card">
				<el-tabs v-model="tabsName" @tab-click="handleClick">
					<el-tab-pane label="测量队" name="测量队">
						<el-row>
							<el-col :span="3">
								<dt class="select-title">隧道类型</dt>
								<el-select v-model="tunnelvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getregiontype">
									<el-option
										v-for="item in tunneloptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
								<dt class="select-title">所属区域</dt>
								<el-select v-model="regionvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getfactortype">
									<el-option
										v-for="item in regionoptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
									<dt class="select-title">围岩等级</dt>
								<el-select v-model="legendvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getlegendtype">
									<el-option
										v-for="item in legendoptions"
										:key="item.legendvalue"
										:label="item.legendlabel"
										:value="item.legendvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-title">围岩里程段</dt>
								<el-select v-model="factorvalue" 
									clearable 
									size="mini"
									class="search-box-handlerr"
									@change="confirmfactor">
									<el-option
										v-for="item in factoroptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-titlee">循环类型</dt>
								<el-select v-model="circlevalue" 
									clearable 
									size="mini"
									class="search-box-handlerrr"
									@change="confirmcircle">
									<el-option
										v-for="item in circleoptions"
										:key="item.circlevalue"
										:label="item.circlelabel"
										:value="item.circlevalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-titleee">构件类型</dt>
								<el-select v-model="componentvalue" 
									clearable 
									size="mini"
									class="search-box-handlerrrr"
									@change="confirmcomponent">
									<el-option
										v-for="item in componentoptions"
										:key="item.componentvalue"
										:label="item.componentlabel"
										:value="item.componentvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="getsearch">确认</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										height="700"
										style="width: 100%"
										border
										:data="warninfolist"
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										:index="indexMethod"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件名称"
										prop="componentTypeName">
										</el-table-column>
										<el-table-column
										align="center"
										prop="surroundRockGrade"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="startSegment"
										label="起始里程">
										</el-table-column>
										<el-table-column
										align="center"
										prop="endSegment"
										label="终止里程">
										</el-table-column>
										<el-table-column
										align="center"
										prop="name"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="warningInfo"
										label="实时预警详情">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="modifyCreatDate"
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
									<el-button type="info" @click="deletewarninfo">消警</el-button>
								</div>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="实验室" name="实验室">
						<el-row>
							<el-col :span="3">
								<dt class="select-title">隧道类型</dt>
								<el-select v-model="tunnelvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getregiontype">
									<el-option
										v-for="item in tunneloptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
								<dt class="select-title">所属区域</dt>
								<el-select v-model="regionvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getfactortype">
									<el-option
										v-for="item in regionoptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
									<dt class="select-title">围岩等级</dt>
								<el-select v-model="legendvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getlegendtype">
									<el-option
										v-for="item in legendoptions"
										:key="item.legendvalue"
										:label="item.legendlabel"
										:value="item.legendvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-title">围岩里程段</dt>
								<el-select v-model="factorvalue" 
									clearable 
									size="mini"
									class="search-box-handlerr"
									@change="confirmfactor">
									<el-option
										v-for="item in factoroptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-titlee">循环类型</dt>
								<el-select v-model="circlevalue" 
									clearable 
									size="mini"
									class="search-box-handlerrr"
									@change="confirmcircle">
									<el-option
										v-for="item in circleoptions"
										:key="item.circlevalue"
										:label="item.circlelabel"
										:value="item.circlevalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-titleee">构件类型</dt>
								<el-select v-model="componentvalue" 
									clearable 
									size="mini"
									class="search-box-handlerrrr"
									@change="confirmcomponent">
									<el-option
										v-for="item in componentoptions"
										:key="item.componentvalue"
										:label="item.componentlabel"
										:value="item.componentvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="getsearch">确认</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										height="700"
										style="width: 100%"
										border
										:data="warninfolist"
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										:index="indexMethod"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件名称"
										prop="componentTypeName">
										</el-table-column>
										<el-table-column
										align="center"
										prop="surroundRockGrade"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="startSegment"
										label="起始里程">
										</el-table-column>
										<el-table-column
										align="center"
										prop="endSegment"
										label="终止里程">
										</el-table-column>
										<el-table-column
										align="center"
										prop="name"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="warningInfo"
										label="实时预警详情">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="modifyCreatDate"
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
					<el-tab-pane label="工程部" name="工程部">
						<el-row>
							<el-col :span="3">
								<dt class="select-title">隧道类型</dt>
								<el-select v-model="tunnelvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getregiontype">
									<el-option
										v-for="item in tunneloptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
								<dt class="select-title">所属区域</dt>
								<el-select v-model="regionvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getfactortype">
									<el-option
										v-for="item in regionoptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
									<dt class="select-title">围岩等级</dt>
								<el-select v-model="legendvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getlegendtype">
									<el-option
										v-for="item in legendoptions"
										:key="item.legendvalue"
										:label="item.legendlabel"
										:value="item.legendvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-title">围岩里程段</dt>
								<el-select v-model="factorvalue" 
									clearable 
									size="mini"
									class="search-box-handlerr"
									@change="confirmfactor">
									<el-option
										v-for="item in factoroptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-titlee">循环类型</dt>
								<el-select v-model="circlevalue" 
									clearable 
									size="mini"
									class="search-box-handlerrr"
									@change="confirmcircle">
									<el-option
										v-for="item in circleoptions"
										:key="item.circlevalue"
										:label="item.circlelabel"
										:value="item.circlevalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-titleee">构件类型</dt>
								<el-select v-model="componentvalue" 
									clearable 
									size="mini"
									class="search-box-handlerrrr"
									@change="confirmcomponent">
									<el-option
										v-for="item in componentoptions"
										:key="item.componentvalue"
										:label="item.componentlabel"
										:value="item.componentvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="getsearch">确认</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										height="700"
										style="width: 100%"
										border
										:data="warninfolist"
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										:index="indexMethod"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件名称"
										prop="componentTypeName">
										</el-table-column>
										<el-table-column
										align="center"
										prop="surroundRockGrade"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="startSegment"
										label="起始里程">
										</el-table-column>
										<el-table-column
										align="center"
										prop="endSegment"
										label="终止里程">
										</el-table-column>
										<el-table-column
										align="center"
										prop="name"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="warningInfo"
										label="实时预警详情">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="modifyCreatDate"
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
					<el-tab-pane label="质检部" name="质检部">
						<el-row>
							<el-col :span="3">
								<dt class="select-title">隧道类型</dt>
								<el-select v-model="tunnelvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getregiontype">
									<el-option
										v-for="item in tunneloptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
								<dt class="select-title">所属区域</dt>
								<el-select v-model="regionvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getfactortype">
									<el-option
										v-for="item in regionoptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="3">
									<dt class="select-title">围岩等级</dt>
								<el-select v-model="legendvalue" 
									clearable 
									size="mini"
									class="search-box-handler"
									@change="getlegendtype">
									<el-option
										v-for="item in legendoptions"
										:key="item.legendvalue"
										:label="item.legendlabel"
										:value="item.legendvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-title">围岩里程段</dt>
								<el-select v-model="factorvalue" 
									clearable 
									size="mini"
									class="search-box-handlerr"
									@change="confirmfactor">
									<el-option
										v-for="item in factoroptions"
										:key="item.code"
										:label="item.chineseName"
										:value="item.code">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-titlee">循环类型</dt>
								<el-select v-model="circlevalue" 
									clearable 
									size="mini"
									class="search-box-handlerrr"
									@change="confirmcircle">
									<el-option
										v-for="item in circleoptions"
										:key="item.circlevalue"
										:label="item.circlelabel"
										:value="item.circlevalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="4">
									<dt class="select-titleee">构件类型</dt>
								<el-select v-model="componentvalue" 
									clearable 
									size="mini"
									class="search-box-handlerrrr"
									@change="confirmcomponent">
									<el-option
										v-for="item in componentoptions"
										:key="item.componentvalue"
										:label="item.componentlabel"
										:value="item.componentvalue">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="2">
									<el-button class="certain-button" size="mini"
									type="primary" icon="el-icon-search" @click="getsearch">确认</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div>
										<el-table
										height="700"
										style="width: 100%"
										border
										:data="warninfolist"
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										>
										<el-table-column
										align="center"
										type = "index"
										label= "序号"
										:index="indexMethod"
										width="60">
										</el-table-column>
										<el-table-column
										align="center"
										label="构件名称"
										prop="componentTypeName">
										</el-table-column>
										<el-table-column
										align="center"
										prop="surroundRockGrade"
										label="围岩等级">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="startSegment"
										label="起始里程">
										</el-table-column>
										<el-table-column
										align="center"
										prop="endSegment"
										label="终止里程">
										</el-table-column>
										<el-table-column
										align="center"
										prop="name"
										label="施工信息">
										</el-table-column>
										<el-table-column
										align="center"
										prop="warningInfo"
										label="实时预警详情">
										</el-table-column>
										<el-table-column
										sortable='custom'
										align="center"
										prop="modifyCreatDate"
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
				</el-tabs>
			</el-card>
		</div>
	</div>
</template>

<script>

import { gettunnel, getregion, getmileageSection, getwarninfoQuery, deletewarninfo} from '@/api/background.js'

export default {
	name: 'warn-info-manage',

	data() {
		return{
			tunneloptions: [],
			tunnelvalue:'',
			legendoptions: [],
			legendvalue:'',
			regionoptions: [],
			regionvalue:'',
			factoroptions: [],
			setlegened: [],
			factorvalue:'',
			circleoptions: [],
			circlevalue: '',
			componentoptions:[],
			componentvalue:'',
			tabsName: '测量队',
			totalpage: 0,
			ebscode: '',
			size: 10,
			page: 1,
			selectdata: [],
			warninfolist: [],
			direction: true,
			orderBy: "startSegment"
		}
	},

	created() {
		this.gettunneltype();
		this.getwarninfo()
	},

	methods: {
		gettunneltype() {
			gettunnel().then(res => {
				this.tunneloptions = res.data;
			}).catch(err =>{
				console.log(err);
			})
		},

		getregiontype(item) {
      if (!item) {
				this.regionvalue = ''
				this.factorvalue = ''
				this.legendvalue = ''
				this.circlevalue = ''
				this.componentvalue = ''
        return
      }
			getregion(item).then(res => {
				this.regionvalue = ''
				this.factorvalue = ''
				this.legendvalue = ''
				this.circlevalue = ''
				this.componentvalue = ''
				this.regionoptions = res.data;
			}).catch(err =>{
				console.log(err);
			})
		},

		getfactortype(item) {
      if (!item) {
				this.factorvalue = ''
				this.legendvalue = ''
				this.circlevalue = ''
				this.componentvalue = ''
        return
      }
			getmileageSection(item).then(res => {
				this.factorvalue = ''
				this.legendvalue = ''
				this.circlevalue = ''
				this.componentvalue = ''
				this.setlegened = res.data;
				this.legendoptions= [{
					legendvalue: '01',
					legendlabel: 'Ⅲ级'
				},{
					legendvalue: '02',
					legendlabel: 'Ⅳ级'				
				},{
					legendvalue: '03',
					legendlabel: 'Ⅴ级'
				}]
			}).catch(err =>{
				console.log(err);
			})
		},

		getlegendtype(item) {
			if (!item) {
				this.factorvalue = ''
				this.circlevalue = ''
				this.componentvalue = ''
        return
      } else {
				this.factorvalue = ''
				this.circlevalue = ''
				this.componentvalue = ''
				this.legendoptions.levle = item
				this.factoroptions = this.setlegened.filter(item => item.code.substr(8,2) == this.legendoptions.levle)
			}
		},

		confirmfactor(item) {
      if (!item) {
				this.circlevalue = ''
				this.componentvalue = ''
        return
      } else {
				this.circlevalue = ''
				this.componentvalue = ''
				this.factoroptions.code = item
				this.circleoptions= [{
					circlevalue: '01',
					circlelabel: '初支开挖',
					children: [{
						componentvalue: '01',
						componentlabel: '喷混模型',
					},{
						componentvalue: '02',
						componentlabel: '拱架模型',
					},{
						componentvalue: '03',
						componentlabel: '小导管模型',
					},{
						componentvalue: '04',
						componentlabel: '管棚模型',
					},{
						componentvalue: '05',
						componentlabel: '锚杆模型',
					}]
				},{
					circlevalue: '02',
					circlelabel: '仰拱',
					children: [{
						componentvalue: '01',
						componentlabel: '仰拱（底板）模型',
					},{
						componentvalue: '02',
						componentlabel: '仰拱填充模型',
					}]
				},{
					circlevalue: '03',
					circlelabel: '二衬',
					children: [{
						componentvalue: '04',
						componentlabel: '拱墙衬砌模型',
					}]
				},{
					circlevalue: '04',
					circlelabel: '防、排水',
					children: [{
						componentvalue: '01',
						componentlabel: '排水盲管模型',
					},{
						componentvalue: '02',
						componentlabel: '洞内排水沟模型',
					},{
						componentvalue: '03',
						componentlabel: '检查井模型',
					},{
						componentvalue: '04',
						componentlabel: '泄水洞模型',
					},{
						componentvalue: '05',
						componentlabel: '隧底深埋排水沟模型',
					},{
						componentvalue: '06',
						componentlabel: '接口工程预埋',
					}]
				}]
			}
		},

		confirmcircle(item) {
      if (!item) {
				this.componentvalue = ''
        return
			} else {
				this.componentvalue = ''
				this.circleoptions.code = item
				this.componentoptions = this.circleoptions.find(item => item.circlevalue == this.circleoptions.code).children
				// console.log(this.componentoptions)
			}			
		},

		confirmcomponent(item) {
      if (!item) {

        return
			} else {
				this.componentoptions.code = item
				// console.log(this.componentoptions.code)
			}			
		},
		
		handleSelectionChange(val) {
			this.selectdata = val
			console.log(this.selectdata)
		},

		getsearch() {
			if(this.tunnelvalue != '' && this.regionvalue == ''){
				const str1 = this.tunnelvalue.substr(0,2)
				const str2 = this.tunnelvalue.substr(2,2)
				const str3 = this.tunnelvalue.substr(4,2)
				this.ebscode = str1 + '-' + str2 + '-' + str3
				// console.log(this.ebscode)
			}else if(this.regionvalue != '' && this.legendvalue == '' ){
				const str1 = this.regionvalue.substr(0,2)
				const str2 = this.regionvalue.substr(2,2)
				const str3 = this.regionvalue.substr(4,2)
				const str4 = this.regionvalue.substr(6,2)
				this.ebscode = str1 + '-' + str2 + '-' + str3 + '-' + str4
				// console.log(this.ebscode)
			}else if(this.legendvalue != '' && this.factorvalue == ''){
				const str1 = this.regionvalue.substr(0,2)
				const str2 = this.regionvalue.substr(2,2)
				const str3 = this.regionvalue.substr(4,2)
				const str4 = this.regionvalue.substr(6,2)
				this.ebscode = str1 + '-' + str2 + '-' + str3 + '-' + str4 + '-' + this.legendvalue
				// console.log(this.ebscode)
			}else if(this.factorvalue != '' && this.circlevalue == ''){
				const str1 = this.factorvalue.substr(0,2)
				const str2 = this.factorvalue.substr(2,2)
				const str3 = this.factorvalue.substr(4,2)
				const str4 = this.factorvalue.substr(6,2)
				const str5 = this.factorvalue.substr(8,2)
				const str6 = this.factorvalue.substr(10,3)
				this.ebscode = str1 + '-' + str2 + '-' + str3 + '-' + str4 + '-' + str5 + '-' + str6
				// console.log(this.ebscode)
			}else if(this.circlevalue != '' && this.componentvalue == ''){
				const str1 = this.factorvalue.substr(0,2)
				const str2 = this.factorvalue.substr(2,2)
				const str3 = this.factorvalue.substr(4,2)
				const str4 = this.factorvalue.substr(6,2)
				const str5 = this.factorvalue.substr(8,2)
				const str6 = this.factorvalue.substr(10,3)
				this.ebscode = str1 + '-' + str2 + '-' + str3 + '-' + str4 + '-' + str5 + '-' + str6+ '-' + this.circlevalue
				// console.log(this.ebscode)
			}else if(this.componentvalue != ''){
				const str1 = this.factorvalue.substr(0,2)
				const str2 = this.factorvalue.substr(2,2)
				const str3 = this.factorvalue.substr(4,2)
				const str4 = this.factorvalue.substr(6,2)
				const str5 = this.factorvalue.substr(8,2)
				const str6 = this.factorvalue.substr(10,3)
				this.ebscode = str1 + '-' + str2 + '-' + str3 + '-' + str4 + '-' + str5 + '-' + str6+ '-' + this.circlevalue + '-' + this.componentvalue
				// console.log(this.ebscode)
			}
			this.getwarninfo()	
		},
		handleSelectionChange(val) {
			this.selectdata = val
			console.log(this.selectdata)
		},
		handleSizeChange(val) {
			this.size = val
			this.getwarninfo()
    },
		handleCurrentChange(val) {
			this.page = val
			this.getwarninfo()
    },
		handleClick(){
			console.log(this.tabsName)
			this.getwarninfo()
		},
		sortChange(column) {
			console.log(column.order)
			if(column.prop == 'startSegment'){
				if(column.order == 'ascending' || column.order == null){
					this.direction = true
					this.orderBy = 'startSegment'
					this.getwarninfo()
				}else{
					this.direction = false
					this.orderBy = 'startSegment'
					this.getwarninfo()				
				}
			}else{
				if(column.prop == 'modifyCreatDate'){
					if(column.order == 'ascending' || column.order == null){
						this.direction = true
						this.orderBy = 'modifyDate'
						this.getwarninfo()
					}else{
						this.direction = false
						this.orderBy = 'modifyDate'
						this.getwarninfo()		
					}
				}				
			}
		},
		getwarninfo() {
			getwarninfoQuery(this.tabsName,this.direction, this.ebscode, this.orderBy, this.page, this.size).then(res => {
				this.totalpage = res.detail.totalCount
				this.warninfolist = res.data.map(item =>{
					var date = new Date(item.createDate).toJSON();
					item.modifyCreatDate = new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
					return item;
				})
				console.log(this.totalpage,this.warninfolist)
			}).catch(err =>{
				console.log(err);
			})
		},
		indexMethod(index) {
			return (this.page - 1) * this.size + index + 1;
		},
		deletewarninfo() {
			var array = [];
			for(let i = 0; i < this.selectdata.length; i++){
        if (array.indexOf(this.selectdata[i].objectID) === -1) {
            array.push(this.selectdata[i].objectID)
        }
			}
			console.log(array)
			for(let j = 0; j < array.length; j++){
				console.log(array[j])
				deletewarninfo(array[j]).then(res => {
					this.getwarninfo()
					}).catch(err =>{
						console.log(err);
				})
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
	.select-title {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		margin-top: 10px;
		margin-left: 10px;
		width: 80px;
	}
	.select-titlee {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		margin-top: 10px;
		width: 80px;
		margin-left: 5px;
	}
	.select-titleee{
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		margin-top: 10px;
		width: 80px;
		margin-left: -15px;
	}
	.search-box-handler {
		margin-left: 75px;
		top: -22px;
	}
	.search-box-handlerr {
		margin-left: 90px;
		top: -22px;
	}
	.search-box-handlerrr {
		margin-left: 70px;
		top: -22px;
	}
	.search-box-handlerrrr{
		margin-left: 50px;
		top: -22px;
	}
	.certain-button {
		margin-left: -35px;
		margin-top: 5px;
	}
</style>