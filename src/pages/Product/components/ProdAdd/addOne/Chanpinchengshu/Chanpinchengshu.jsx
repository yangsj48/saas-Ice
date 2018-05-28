import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder';
import {
	Input,
	Button,
	Checkbox,
	Select,
	DatePicker,
	Switch,
	Radio,
	Grid,
	Table,
	Dialog,
	Feedback
} from '@icedesign/base';
import { Title, BtnAddRow } from 'components';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据

export default class Chanpinchengshu extends Component {

	constructor(props) {
		super(props);

		this.state = {
			percentageSetting: []
		}
	}

	addNewList(data) {
		let percentageSetting = this.state.percentageSetting;
		percentageSetting.push({})
		this.setState({
			percentageSetting
		})
	}

	deleteItem(index) {
		let percentageSetting = this.state.percentageSetting
		percentageSetting.splice(index, 1);
		this.setState({
			percentageSetting
		});
	}

	getArrIndex = (arr, obj) => {
		let index = null;
		let key = Object.keys(obj)[0];
		arr.every(function (value, i) {
			if (value[key] === obj[key]) {
				index = i;
				return false;
			}
			return true;
		});
		return index;
	};
	//最小、大期限不可同时相等 
	testChange1 = (rule, value, callback) => {
		let { items, boolean } = this.props
		let oIndex = this.getArrIndex(items,{loanTermRangeMin:value});
		let max = items[oIndex].loanTermRangeMax;
		if (rule.required && !value) {
			callback('最小期限必填');
			return;
		}
		if (value < 0) {
			callback('最小期限必须大于0')
		}
		if(max){
			if(Number(value) >= max){
				callback('不能大于或等于后者');
			}
		}
		for (var i = 0; i < items.length - 1; i++) {
			for (var j = i + 1; j < items.length; j++) {
				if ((items[i].loanTermRangeMin == items[j].loanTermRangeMin) && (items[i].loanTermRangeMax == items[j].loanTermRangeMax)) {
					Feedback.toast.show({
						type: 'error',
						content: '额度期限的最小、大期限不能同时相等！',
						afterClose: () => {
							this.props.onChangeBoolean(false)
						},
						duration: 3000
					});
				}
			}
		}
		
		
		callback();
	}

	//最大成数
	testChange2 = (rule, value, callback) => {//loanPercentageMax
		let {items} = this.props
		let oIndex = this.getArrIndex(items,{loanPercentageMax:value});
		let min = items[oIndex].loanPercentageMin;

		if (rule.required && !value) {
			callback('最大成数必填');
			return;
		}
		if (value < 0 ) {
			callback('最大成数必须大于0')
		}
		if(min){
			if(value <= min ){
				callback('不能小于或等于前者')
			}
		}
		
		callback();
	}

	//最小成数
	testChange3 = (rule, value, callback) => {
		let {items} = this.props
		let oIndex = this.getArrIndex(items,{loanPercentageMin:value});
		let max = items[oIndex].loanPercentageMax;

		if (rule.required && !value) {
			callback('最小成数必填');
			return;
		}
		if (value < 0) {
			callback('最小成数范围0～100内')
		}
		if(max){
			if(Number(value) >= max){
				callback('不能大于或等于后者')
			}
		}
		
		callback();
	}

	//最小、大期限不可同时相等
	testChange4 = (rule, value, callback) => {
		let { items, boolean } = this.props;
		let oIndex = this.getArrIndex(items,{loanTermRangeMax:value});
		let min = items[oIndex].loanTermRangeMin;

		if (rule.required && !value) {
			callback('最大期限必填');
			return;
		}
		if (value < 0) {
			callback('最大期限必须大于0')
		}
		if(min){
			if(value <= min){
				callback('不能小于或等于前者');
			}
		}
		for (var i = 0; i < items.length - 1; i++) {
			for (var j = i + 1; j < items.length; j++) {
				if ((items[i].loanTermRangeMin == items[j].loanTermRangeMin) && (items[i].loanTermRangeMax == items[j].loanTermRangeMax)) {
					Feedback.toast.show({
						type: 'error',
						content: '额度期限的最小、大期限不能同时相等！',
						afterClose: () => {
							this.props.onChangeBoolean(false)
						},
						duration: 3000
					});
				}
			}
		}
		callback();
	}
	renderCell1 = (value, index, record, context) => {
		return (
			<div>
				<IceFormBinder
					required
					name={`percentageSetting[${index}].loanTermRangeMin`}
					validator={this.testChange1}
				>
					<Input placeholder="最小期限" />
				</IceFormBinder>
				<div style={{ display: 'inline' }}><IceFormError name={`percentageSetting[${index}].loanTermRangeMin`} /></div>
			</div>
		);
	}

	renderCell2 = (value, index, record, context) => {
		return (
			<div>
				<IceFormBinder
					required
					name={`percentageSetting[${index}].loanPercentageMax`}
					validator={this.testChange2}
				>
					<Input placeholder="最大成数" />
				</IceFormBinder>
				<div style={{ display: 'inline' }}><IceFormError name={`percentageSetting[${index}].loanPercentageMax`} /></div>
			</div>
		);
	}

	renderCell3 = (value, index, record, context) => {
		return (
			<div>
				<IceFormBinder
					required
					name={`percentageSetting[${index}].loanPercentageMin`}
					validator={this.testChange3}
				>
					<Input placeholder="最小成数" />
				</IceFormBinder>
				<div style={{ display: 'inline' }}><IceFormError name={`percentageSetting[${index}].loanPercentageMin`} /></div>

			</div>
		);
	}

	renderCell4 = (value, index, record, context) => {
		return (
			<div>
				<IceFormBinder
					required
					name={`percentageSetting[${index}].loanTermRangeMax`}
					validator={this.testChange4}
				>
					<Input placeholder="最大期限" />
				</IceFormBinder>
				<div style={{ display: 'inline' }}><IceFormError name={`percentageSetting[${index}].loanTermRangeMax`} /></div>
			</div>
		);
	}

	renderCell5 = (value, index, record, context) => {
		return (
			<div>
				<Button
					onClick={this.props.removeItem.bind(this, index)}
					shape="text"
					className="deleteBtn">删除</Button>
			</div>
		);
	}

	render() {
		let { styles, items = [] } = this.props;

		return (
			<div className="chanpinchengshu">
				<div className="table-title">产品成数设置</div>
				<Table
					dataSource={items}
					hasHeader
					className="table"
				>
					<Table.Column title="最小期限(月)" cell={this.renderCell1} />
					<Table.Column title="最大期限(月)" cell={this.renderCell4} />
					<Table.Column title="最小成数(%)" cell={this.renderCell3} />
					<Table.Column title="最大成数(%)" cell={this.renderCell2} />
					<Table.Column title="操作" width={80} cell={this.renderCell5} />
				</Table>
				<BtnAddRow style={{ marginTop: 20 }} onClick={this.props.addItem.bind(this)} />
			</div>
		)
	}
}
