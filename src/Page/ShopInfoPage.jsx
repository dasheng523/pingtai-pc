import React from 'react';
import { QueueAnim, Icon, Button, Table, Popconfirm, message, Breadcrumb, Select, Radio, Checkbox, DatePicker, InputNumber, Form, Cascader, Input, Upload, Collapse, Row, Col } from 'antd';
import './ShopInfoPage.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;

let ShopForm = React.createClass({
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  },

  nameExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  },

  render(){
    const { getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    };
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 3, message: '店铺名称至少为 3 个字' },
      ],
    });
    const textareaProps = getFieldProps('intro', {
      rules: [
        { required: true,  message: '店铺介绍' },
      ],
    });
    return <Form horizontal form={this.props.form}>
      <FormItem
        {...formItemLayout}
        label="店铺名称："
        hasFeedback>
        <Input {...nameProps} placeholder="请填写店铺名称，不少于3个字" />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="店铺说明："
        hasFeedback>
        <Input {...textareaProps} type="textarea" placeholder="写得详细一些，你的店铺会更吸引人。" rows="5" />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="店铺图片："
        help="上传图片的最佳尺寸：300像素*300像素，其他尺寸会影响页面效果，格式png，jpeg，jpg，gif。大小不超过1M">
        <Upload className="upload-list-inline" action="/upload.do" listType="picture">
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
      </FormItem>

      <FormItem
        wrapperCol={{ span: 12, offset: 7 }} >
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="ghost" onClick={this.handleReset}>重置</Button>
      </FormItem>
    </Form>
  }
});

ShopForm = createForm()(ShopForm);


const MainPage = React.createClass({
  getInitialState(){
    return {
      date : '',
    };
  },

  render(){
    return <div className="ant-layout-content">
      <div className="main_hd main_hd_bd" key="a">
        <h3 className="title_border">
          商家资料
        </h3>
      </div>
      <QueueAnim className="main-content">
        <div className="topbar" key="b">
          <div style={{clear:'both'}}></div>
        </div>
        <ShopForm key='c' />
      </QueueAnim>
    </div>;
  }
});

export default MainPage;
