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
										:data="searchList"
										height="650"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										@row-dblclick="clickchange"
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
										prop="modelType"
										label="构件名称">
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
										label="数据内容">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.value" class="edit-input" size="small" clearable/>
												<span v-else>{{ row.value }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										label="设计参考值">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.valueRefer" class="edit-input" size="small" clearable/>
												<span v-else>{{ row.valueRefer }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										prop="unit"
										label="单位"
										width="80">
										</el-table-column>
										<el-table-column
										align="center"
										prop="modifyCreatDate"
										label="创建时间">
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
									type="success" icon="el-icon-upload" @click="updateDataInfo">提交</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-edit" @click="operateDataInfo">编辑</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close" @click="cancelEdit">取消</el-button>
								</el-col>
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
										:data="searchList"
										height="650"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										@row-dblclick="clickchange"
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
										prop="modelType"
										label="构件名称">
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
										label="数据内容">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.value" class="edit-input" size="small" clearable/>
												<span v-else>{{ row.value }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										label="设计参考值">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.valueRefer" class="edit-input" size="small" clearable/>
												<span v-else>{{ row.valueRefer }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										prop="unit"
										label="单位"
										width="80">
										</el-table-column>
										<el-table-column
										align="center"
										prop="modifyCreatDate"
										label="创建时间">
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
									type="success" icon="el-icon-upload" @click="updateDataInfo">提交</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-edit" @click="operateDataInfo">编辑</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close" @click="cancelEdit">取消</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-more">选择</el-button>
								</el-col>
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
										:data="searchList"
										height="650"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										@row-dblclick="clickchange"
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
										prop="modelType"
										label="构件名称">
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
										label="数据内容">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.value" class="edit-input" size="small" clearable/>
												<span v-else>{{ row.value }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										label="设计参考值">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.valueRefer" class="edit-input" size="small" clearable/>
												<span v-else>{{ row.valueRefer }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										prop="unit"
										label="单位"
										width="80">
										</el-table-column>
										<el-table-column
										align="center"
										prop="modifyCreatDate"
										label="创建时间">
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
									type="success" icon="el-icon-upload" @click="updateDataInfo">提交</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-edit" @click="operateDataInfo">编辑</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close" @click="cancelEdit">取消</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-more" @click="engineerselectWorkInfo">选择</el-button>
								</el-col>
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
										:data="searchList"
										height="650"
										style="width: 100%"
										border
										@selection-change="handleSelectionChange"
										@sort-change='sortChange'
										@row-dblclick="clickchange"
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
										prop="modelType"
										label="构件名称">
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
										label="数据内容">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.value" class="edit-input" size="small" clearable/>
												<span v-else>{{ row.value }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										label="设计参考值">
											<template slot-scope="{row}">
												<el-input v-if="row.edit" v-model="row.valueRefer" class="edit-input" size="small" clearable/>
												<span v-else>{{ row.valueRefer }}</span>
											</template>
										</el-table-column>
										<el-table-column
										align="center"
										prop="unit"
										label="单位"
										width="80">
										</el-table-column>
										<el-table-column
										align="center"
										prop="modifyCreatDate"
										label="创建时间">
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
									type="success" icon="el-icon-upload" @click="updateDataInfo">提交</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-edit" @click="operateDataInfo">编辑</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="danger" icon="el-icon-circle-close" @click="cancelEdit">取消</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="primary" icon="el-icon-upload" @click="uploadDataInfo">导入</el-button>
								</el-col>
								<el-col :span="2" :offset="1">
									<el-button class="certain-button" size="small"
									type="success" icon="el-icon-more" @click="qualitiselectWorkInfo">选择</el-button>
								</el-col>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</div>
		<OperateDiolog :opened ="operateFrom.opened" :operateinfo = operateFrom.operateBrief />
		<UploadDiolog :opened ="uploadFrom.opened" :uploadinfo = uploadFrom.uploadBrief />
		<EngineerselectDiolog :opened ="engineerselectFrom.opened" :engineerselectinfo = engineerselectFrom.engineerselectBrief />
		<QualitiselectDiolog :opened ="qualitiselectFrom.opened" :qualitiselectinfo = qualitiselectFrom.qualitiselectBrief />
	</div>
</template>

<script>

import OperateDiolog from './components/OperateDiolog.vue'
import UploadDiolog from './components/UploadDiolog.vue'
import EngineerselectDiolog from './components/EngineerselectDiolog.vue'
import QualitiselectDiolog from './components/QualitiselectDiolog.vue'
import { gettunnel, getregion, getmileageSection, getpageQuery, updatebatchinfo } from '@/api/background.js'

export default {
	name: 'work-info-write',
	components: {
		OperateDiolog,
		UploadDiolog,
		EngineerselectDiolog,
		QualitiselectDiolog
	},
	data() {
		return{
			tunneloptions: [],
			tunnelvalue:'',
			legendoptions: [{
				legendvalue: '01',
				legendlabel: 'Ⅲ级'
			},{
				legendvalue: '02',
				legendlabel: 'Ⅳ级'				
			},{
				legendvalue: '03',
				legendlabel: 'Ⅴ级'
			}],
			legendvalue:'',
			regionoptions: [],
			regionvalue:'',
			factoroptions: [],
			setlegened: [],
			factorvalue:'',
			circleoptions: [{
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
			}],
			circlevalue: '',
			componentoptions:[],
			componentvalue:'',
			searchList: [],
			tabsName: '测量队',
			selectdata: [],
			copyList: [
				{
					name: "喷混模型",
					cdoe: "",
					legend: "",
					workinfo: "实际喷射厚度",
					datainfo: "",
					designref: "",
					unit: "cm"
				},
				{
					name: "喷混模型",
					cdoe: "",
					legend: "",
					workinfo: "实际喷射厚度",
					datainfo: "",
					designref: "",
					unit: "cm"
				}
			],

			operateFrom: {
				title: '质量自检',
				opened:false,
				operateBrief: []
			},

			uploadFrom: {
				title: '自检结果',
				opened:false,
				uploadBrief: {}
			},

			engineerselectFrom: {
				title: '施工信息',
				opened:false,
				engineerselectBrief: {}
			},

			qualitiselectFrom: {
				title: '质检信息',
				opened:false,
				qualitiselectBrief: {}
			},
			totalpage: 0,
			ebscode: '',
			size: 10,
			page: 1,
			queryfileds: []
		}
	},
	
	created() {
		this.gettunneltype();
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
		},

		getsearch() {
			if(this.factoroptions.code != undefined && this.circleoptions.code != undefined && this.componentoptions.code != undefined){
				const str1 = this.factoroptions.code.substr(0,2)
				const str2 = this.factoroptions.code.substr(2,2)
				const str3 = this.factoroptions.code.substr(4,2)
				const str4 = this.factoroptions.code.substr(6,2)
				const str5 = this.factoroptions.code.substr(8,2)
				const str6 = this.factoroptions.code.substr(10,3)
				this.ebscode = str1 + '-' + str2 + '-' + str3 + '-' + str4 + '-' + str5 + '-' + str6 + '-' + this.circleoptions.code + '-' + this.componentoptions.code
				console.log(this.ebscode)
			}
			getpageQuery(this.tabsName, this.ebscode, this.page, this.size).then(res => {
				this.totalpage = res.detail.totalCount
				this.searchList = res.data.map(item =>{
					item.edit = false;
					// item.createDate = 111;
					//0001-01-01T01:15:32.000+00:00
					// var date = item.createDate.substr(0,10)
					// var time = item.createDate.substr(11,8)
					// item.modifyCreatDate = date + ' ' + time
					var date = new Date(item.createDate).toJSON();
					item.modifyCreatDate = new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
					return item;
				})
				console.log(this.searchList)
			}).catch(err =>{
				console.log(err);
			})
		},
		handleSizeChange(val) {
			this.size = val
			this.getsearch()
    },
		handleCurrentChange(val) {
			this.page = val
			this.getsearch()
    },
		updateDataInfo() {
			this.cancelEdit()
			for(var i = 0; i < this.selectdata.length; i++){
				const createDate = this.selectdata[i].createDate
				const department = this.selectdata[i].department
				const ebs = this.selectdata[i].ebs
				const endSegment = this.selectdata[i].endSegment
				const modelType = this.selectdata[i].modelType
				const modifyDate = this.selectdata[i].modifyDate
				const name = this.selectdata[i].name
				const objectID = this.selectdata[i].objectID
				const startSegment = this.selectdata[i].startSegment
				const unit = this.selectdata[i].unit
				const value = this.selectdata[i].value
				const valueRefer = this.selectdata[i].valueRefer
				console.log(createDate, department, ebs, endSegment, modelType, modifyDate, name, objectID, startSegment, unit, value, valueRefer)
				this.queryfileds = [{
					"createDate": createDate,
					"department": department,
					"ebs": ebs,
					"endSegment": endSegment,
					"modelType": modelType,
					"modifyDate": modifyDate,
					"name": name,
					"objectID": objectID,
					"startSegment": startSegment,
					"unit": unit,
					"value": value,
					"valueRefer": valueRefer
				}]
				updatebatchinfo(this.queryfileds).then(res => {
						this.$message({
							message: "提交成功！",
							type: 'success'
						});
				}).catch(err =>{
					console.log(err);
				})
			}
		},
		operateDataInfo() {
			for(var i = 0; i < this.selectdata.length; i++) {
				if(this.selectdata.name == '锚杆锚固质量自检'){
					this.operateFrom.opened = !this.operateFrom.opened;
					this.operateFrom.operateBrief = this.selectdata
				}else{
					this.selectdata[i].edit = true
				}
			}
		},
		cancelEdit() {
			console.log(this.searchList,'dsadsadef')
			for(var i = 0; i < this.searchList.length; i++) {
				if(this.searchList.name != '锚杆锚固质量自检') {
				this.searchList[i].edit = false
				}
			}
		},
		uploadDataInfo() {
			this.uploadFrom.opened = !this.uploadFrom.opened;
			this.uploadFrom.uploadBrief = this.searchList[0]
		},
		engineerselectWorkInfo() {
			this.engineerselectFrom.opened = !this.engineerselectFrom.opened;
			this.engineerselectFrom.engineerselectBrief = this.searchList[0]
		},
		qualitiselectWorkInfo() {
			this.qualitiselectFrom.opened = !this.qualitiselectFrom.opened;
			this.qualitiselectFrom.qualitiselectBrief = this.searchList[0]
		},
		sortChange(column) {
				console.log(column)
		},
		indexMethod(index) {
			return (this.page - 1) * this.size + index + 1;
		},
		handleClick() {
			if(this.ebscode) {
				this.getsearch()
			}
		},
		clickchange(row) {
			row.edit = !row.edit
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
	.block {
		margin-top: 5px;
	}
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple {
    background: #d3dce6;
  }
	.button-group {
		margin-top: 5px;
		display:flex;
		justify-content:center;
	}
</style>