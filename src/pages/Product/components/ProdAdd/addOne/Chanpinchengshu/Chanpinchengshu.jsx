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
  Dialog
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

  addNewList(data){
    let percentageSetting = this.state.percentageSetting;
    percentageSetting.push({})
    this.setState({
      percentageSetting
    })
  }

  deleteItem(index){
    let percentageSetting = this.state.percentageSetting
		percentageSetting.splice(index, 1);
      this.setState({
        percentageSetting
      });
  }

  renderCell1 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`percentageSetting[${index}].loanTermRangeMin`}
	        >
	        	<Input placeholder="最小期限" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell2 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`percentageSetting[${index}].loanPercentageMax`}
	        >
	        	<Input placeholder="最大成数" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell3 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`percentageSetting[${index}].loanPercentageMin`}
	        >
	        	<Input placeholder="最小成数" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell4 = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`percentageSetting[${index}].loanTermRangeMax`}
	        >
	        	<Input placeholder="最大期限" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderCell5 = (value, index, record, context) => {
    return(
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
				<Table.Column title="最大期限(月)"  cell={this.renderCell4} />
				<Table.Column title="最小成数(%)"  cell={this.renderCell3} />
				<Table.Column title="最大成数(%)"  cell={this.renderCell2} />
				<Table.Column title="操作" width={80}  cell={this.renderCell5} />
				</Table>
        <BtnAddRow style={{marginTop: 20}} onClick={this.props.addItem.bind(this)} />
		</div>
    )
  }
}