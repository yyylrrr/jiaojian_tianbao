<template>
  <el-dialog
		title="文件预览"
    :visible.sync="dialogVisible"
    width="40%"
		center
  >
				<el-table
					:data="urltable"
					style="width: 100%">
					<el-table-column
						label="序号"
						align="center"
						type = "index"
						width="80">
					</el-table-column>
					<el-table-column
						label="文件名称"
						align="center"
						prop="originalName">
					</el-table-column>
					<el-table-column
						label="修改时间"
						align="center"
						prop="modifyCreatDate">
					</el-table-column>
					<el-table-column
						label="操作"
						align="center"
						width="80">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="getlook(scope.row)">预览</el-button>
							<!-- <el-button
								size="mini"
								type="danger"
								@click="deleteposition(scope.row)">删除</el-button> -->
						</template>
					</el-table-column>
				</el-table>
  </el-dialog>
</template>

<script>

import { geturltable } from '@/api/background.js'

export default {
  name: '',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
		urltablemapobject: {
				type: Object,
				default:function() {
				return []
      }
		}
  },
  data() {
    return {
      dialogVisible: false,
			urltable: []
    }
  },
	created() {
		
	},
	methods: {
		geturltable(){
			geturltable(this.urltablemapobject.objectID).then(res => {
				console.log(res.data)
				this.urltable = res.data.map(item => {
					var date = new Date(item.modifyDate).toJSON();
					item.modifyCreatDate = new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
					return item;
				})
			})
		},
		getlook(row) {
			console.log(row)
			window.open(row.path, '_blank')
		}
	},
	computed: {

	},
  watch: {
    opened() {
      this.dialogVisible = true
			this.geturltable();
    }
  },
}
</script>

<style scoped>

</style>