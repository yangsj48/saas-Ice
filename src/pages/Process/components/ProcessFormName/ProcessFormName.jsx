import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 12
    }
};

export default class ProcessFormItem extends Component {
    constructor() {
        super();
    }

    render() {
        const { info = {}, editable = false } = this.props;

        return (
            <Row>
                <Col xxs="6" s="6" l="6">
                    <FormItem {...formItemLayout} label="业务类型：">
                        <p className="next-form-text-align">
                            {info.businessTypeName}
                        </p>
                    </FormItem>
                </Col>
                <Col xxs="6" s="6" l="6">
                    <FormItem {...formItemLayout} label="资方：">
                        <p className="next-form-text-align">
                            {info.tenantName}
                        </p>
                    </FormItem>
                </Col>
                <Col xxs="6" s="6" l="6">
                    <FormItem {...formItemLayout} label="流程名称：">
                        <IceFormBinder name="processName">
                            <Input placeholder="流程名称" size="large" />
                        </IceFormBinder>
                        <IceFormBinder name="businessTypeId">
                            <Input htmlType="hidden" />
                        </IceFormBinder>
                        <IceFormBinder name="tenantId">
                            <Input htmlType="hidden" />
                        </IceFormBinder>
                    </FormItem>
                </Col>
            </Row>
            );
    }
}
