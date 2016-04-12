import React from 'react';
import { QueueAnim, Icon, Button, Table, Popconfirm, message, Breadcrumb, Select, Radio, Checkbox, DatePicker, InputNumber, Form, Cascader, Input, Upload, Collapse, Row, Col, Transfer } from 'antd';
import { hashHistory } from 'react-router'
import { YsPicUpload } from '../component/YsUpload'
import './PanicBuyManagerPage.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;
const InputGroup = Input.Group;


class PanicBuyMainPage extends React.Component{

  render(){
    return <div className="ant-layout-content">
      <div className="main_hd main_hd_bd" key="a">
        <h3 className="title_border">
          抢购活动
        </h3>
      </div>
      {this.props.children || "似乎有一些问题！！！"}
    </div>
  }
}


class PanicBuyIndexPage extends React.Component{
  getTableData() {
    return [{
      key: '1',
      name: '白菜',
      price: '1元/斤',
      status: '缺货'
    }, {
      key: '2',
      name: '西瓜',
      price: '0.5元/斤',
      status: '正常'
    }, {
      key: '3',
      name: '大白兔奶糖',
      price: '5元/包',
      status: '正常'
    }]
  }
  getTableColumns(){
    return [{
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      key: 'operation',
      render(text, record,key) {
        return (
          <span>
            <a href="#">编辑</a>
              <span className="ant-divider"></span>
            <Popconfirm title="确定要删除这个商品吗？" onConfirm={()=>{confirm(record)}}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        );
      }
    }]
  }

  render(){
    return <QueueAnim className="main-content">
        <div className="topbar" key="b">
          <Button type="primary" size="large" className="pull-right" onClick={()=>{hashHistory.push('/panicBuyPage/add')}}>
            <Icon type="plus" />新增活动
          </Button>
          <div style={{clear:'both'}}></div>
          <Table columns={this.getTableColumns()} dataSource={this.getTableData()} key="c" />
        </div>
      </QueueAnim>
  }
}


let PanicBuyAddPage = React.createClass({
  getInitialState(){
    return {}
  },
  render(){
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    };
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 2, message: '商品名称至少为 2 个字' },
      ],
    });
    const actityDateProps = getFieldProps('actityDate', {
      rules: [
        { required: true, type: 'array',  message: '您还没填写活动时间呢' },
      ],
    });
    const textareaProps = getFieldProps('intro', {
      rules: [
        { required: true,  message: '填写商品说明，才能让用户了解你的商品' },
      ],
    });
    const priceProps = getFieldProps('price', {
      rules: [
        { validator: this.checkPrice, required: true}],
    })
    const ysUpload = YsPicUpload();
    const YsUploadNode = ysUpload.getNode();

    return <QueueAnim className="main-content">
      <div className="topbar flex flex-align-center" key="b">
        <Button className="backbtn" size="small" onClick={()=>{hashHistory.goBack()}}>
          <Icon type="left" />
        </Button>
        <Breadcrumb separator=">" {...this.props} />
        <div style={{clear:'both'}}></div>
      </div>
      <div className="mini-tip-box text-center" key="c">
        <Icon type="info-circle" className="blue-text" style={{marginRight:"5"}} />
        尽量选择足够吸引人的商品。
      </div>
      <Form horizontal form={this.props.form} key="d">
        <FormItem
          {...formItemLayout}
          label="活动名称："
          hasFeedback>
          <Input {...nameProps} placeholder="请填写商品名称，不少于2个字" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动时间："
          hasFeedback>
          <RangePicker {...actityDateProps} showTime format="yyyy/MM/dd HH:mm:ss" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动说明："
          hasFeedback>
          <Input {...textareaProps} type="textarea" placeholder="写得详细一些，商品会更吸引人" rows="5" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动图片："
          help="上传图片的最佳尺寸：300像素*300像素，其他尺寸会影响页面效果，格式png，jpeg，jpg，gif。大小不超过1M">
          <YsUploadNode />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动商品：">
          <Transfer
                  dataSource={this.state.mockData}
                  showSearch
                  listStyle={{
                    width: 200,
                    height: 300,
                  }}
                  operations={['上架商品', '下架商品']}
                  notFoundContent="暂上架商品"
                  titles={['所有商品', '已上架商品']}
                  targetKeys={this.state.targetKeys}
                  onChange={this.handleChange}
                  render={item => `${item.title}-${item.description}`}
                  footer={this.renderFooter} />
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 9 }} >
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    </QueueAnim>
  }
});
PanicBuyAddPage = createForm()(PanicBuyAddPage);


export {PanicBuyMainPage, PanicBuyIndexPage, PanicBuyAddPage}
