import {fetch} from 'utils/fetch';
export function getMenuHideItem (options) {
	return fetch ({
		url: '/api/admin/systemConfig/getMenu',
		method: 'get',
		params: options
	})
};