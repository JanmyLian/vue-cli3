<!-- 
	组件：username支持多个输入不全input/area框
	扩展element-ui自定义输入搜索框组件，使之支持rtx名称输入匹配
-->
<template>
	<el-autocomplete
		style="width:100%"
		v-model="input_value"
		:fetch-suggestions="queryStaff"
		@select="handleSelect"
		type="textarea"
		:size="size"
		placeholder="请输入名称"
		custom-item="staff-item"
		>
	</el-autocomplete>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI);
//自定义自动补全搜索模板
Vue.component('staff-item', {
	functional: true,
	render: function (h, ctx){
		var item = ctx.props.item;
		return h('li', ctx.data, [
			h('div', { attrs: { class: 'name' } }, [item.name])
		]);
	},
	props: {
		item: { type: Object, required: true }
	}
});

import {
    getStaff
} from "@/services/admin/common"

export default {
	/**
	 * value: 父组件传递的value值
	 * multi: 是否支持多个名称输入，true时每次结束会带上;
	 */
	props: ["value","multi","size"],
	data() {
		return {
			staffs: [],
			oldVal:'',
			input_value: ''
		}
	},
	watch: {
		'value': function(newValue, oldValue) {
			this.input_value = newValue;
		},
		'input_value': function(newValue, oldValue) {
			this.$emit('change', newValue); // 传值给父级组件
		}
	},
	created(){
		//获取员工数据
		this.fetchStaff();
	},
	methods: {
		queryStaff(queryString, cb) {
			//queryString = queryString.replace(/(^\s*)|(\s*$)/g,"");//去掉两边空格
			const startpos = queryString.lastIndexOf(';')+1;
			this.oldVal = queryString.substr(0,startpos);
			queryString = queryString.substr(startpos);

			if(!queryString){
				//return false;
				queryString = " ";
			}
			let restaurants = this.staffs;
			const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		createStateFilter(queryString) {
			return (state) => {
				return (state.value.indexOf(queryString.toLowerCase()) === 0);
			};
		},
		handleSelect(item){
			if(item.value){
				this.input_value = this.oldVal + item.value;
				if(this.multi){
					const tmpVal = this.input_value.split(";");
					let tmpNewVal = [];
					for(let i = 0;i < tmpVal.length; i++){
						if(tmpNewVal.indexOf(tmpVal[i]) == -1) tmpNewVal.push(tmpVal[i]);
					}
					this.input_value = tmpNewVal.join(";")+";";
					// this.$emit('change', this.input_value); // 传值给父级组件
				}
			}
		},
		fetchStaff(){
			if(window._staffs instanceof Array && window._staffs.length >0){
				this.staffs = window._staffs;
			}else{
				getStaff({}, res => {
					if(res instanceof Array && res.length > 0){
						this.staffs = window._staffs = [...res]
					}else{
						this.$message.error('getStaff error')
					}
				})
			}
		}
	}
}
</script>