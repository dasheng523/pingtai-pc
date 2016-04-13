import React from 'react';
import { QueueAnim, Icon, Button, Table, Popconfirm, message, Breadcrumb, Select, Radio, Checkbox, DatePicker, InputNumber, Form, Cascader, Input, Upload, Collapse, Row, Col } from 'antd';
import { hashHistory } from 'react-router'

import './ShopInfoPage.less';
import { YsPicUpload } from '../component/YsUpload'
import Utils from '../component/YsUtils'
import BufferState from '../component/BufferState';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;

const ysUpload = YsPicUpload();
const YsUploadNode = ysUpload.getNode();

let buffer = new BufferState();

function formView(picList = []){
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
      <YsUploadNode maxCount="3" piclist={picList} />
    </FormItem>

    <FormItem
      wrapperCol={{ span: 12, offset: 7 }} >
      <Button type="primary" onClick={this.handleSubmit}>保存</Button>
    </FormItem>
  </Form>
}



class ShopEditForm extends React.Component {
  constructor(props){
    super(props);
    this.formView = formView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    let shoInfo = buffer.getShopInfo();
    this.props.form.setFieldsValue({
      name: shoInfo.name,
      intro: shoInfo.intro,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      let shoInfo = buffer.getShopInfo();
      values.uploadList = ysUpload.getUploadFiles();
      Object.assign(shoInfo,values);
      Utils.fetchDataWithCode('/editShop.json',shoInfo,(result)=>{
          if(result.status==1){
            buffer.setShopInfo(shoInfo);
            message.success(result.data);
          }else{
            message.error(result.data);
          }
        }
      );
    })
  }

  render(){
    let shoInfo = buffer.getShopInfo();
    return this.formView(shoInfo.uploadList)
  }
}

ShopEditForm = createForm()(ShopEditForm);



class OpenShopForm extends React.Component {
  constructor(props){
    super(props);
    this.formView = formView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      values.picList = ysUpload.getUploadFiles();
      Utils.fetchData('/openShop.json',values,(result)=>{
          if(result.status==1){
            if(result.data.id){
              buffer.setShopInfo(result.data);
              message.success('恭喜你，开店成功');
              setTimeout(()=>{
                hashHistory.replace('/promotionPage');
              },2000);
            }else{
              message.error('服务器似乎出现了一些小问题');
            }
          }else{
            message.error(result.data);
          }
        },
      );
    })
  }

  render(){
    return this.formView()
  }
}

OpenShopForm = createForm()(OpenShopForm);



const OpenShopPage = React.createClass({
  render(){
    return <div className="ys-loginbox">
      <h3 className="ys-loginbox-title">
        店多多 开设店面
      </h3>
      <div className="ys-panel text-center padding">
        <OpenShopForm key='c' />
      </div>
    </div>;
  }
});


const ShopInfoPage = React.createClass({
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
        <ShopEditForm key='c' />
      </QueueAnim>
    </div>;
  }
});

export {ShopInfoPage,OpenShopPage};
