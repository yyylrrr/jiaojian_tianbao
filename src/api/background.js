import request from '@/utils/request'

//获取隧道类型字典
export function gettunnel() {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/addProperty/tunnel',
    method: 'get',
  })
}

//获取所属区域字典
export function getregion(tunnelCode) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/addProperty/region',
    method: 'get',
		params: {
			tunnelCode
		}
  })
}

//获取里程段
export function getmileageSection(regionCode) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/addProperty/mileageSection',
    method: 'get',
		params: {
			regionCode
		}
  })
}

//分页查询构建属性
export function getpageQuery(department, ebsStr, page, size, sortByStartMileage) {
	return request({
		url: 'https://portal.ehjedu.cn/arcgisService/addProperty/pageQuery',
		method: 'get',
		params: {
			department: department,
			ebsStr: ebsStr,
			page: page,
			size: size,
			sortByStartMileage: sortByStartMileage
		}
	})
}

//批量保存构建施工信息
export function updatebatchinfo(queryfileds) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/addProperty/batch-update',
    method: 'put',
		data: queryfileds		
  })
}

//保存预警规则
export function savewarnrule(warningRuleVO) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/warningRule/save',
    method: 'put',
		data: warningRuleVO		
  })
}

//分页查询预警规则
export function getwarnQuery(page, size) {
	return request({
		url: 'https://portal.ehjedu.cn/arcgisService/warningRule/pageQuery',
		method: 'get',
		params: {
			page: page,
			size: size
		}
	})
}

//删除预警规则
export function deletewarnrule(objectID) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/warningRule/delete',
    method: 'delete',
		params: {
			objectID
		}
  })
}

//删除预警信息
export function deletewarninfo(objectID) {
  return request({
    url: 'https://portal.ehjedu.cn/arcgisService/warningInfo/delete',
    method: 'delete',
		params: {
			objectID
		}
  })
}

//分页查询预警信息
export function getwarninfoQuery(department, ebsStr, orderByCreateDate, page, size) {
	return request({
		url: 'https://portal.ehjedu.cn/arcgisService/warningInfo/pageQuery',
		method: 'get',
		params: {
			department: department,
			ebsStr: ebsStr,
			orderByCreateDate : orderByCreateDate,
			page: page,
			size: size
		}
	})
}