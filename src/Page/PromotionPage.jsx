import React from 'react';
import { QueueAnim, Icon, Button, Table, Popconfirm, message, Breadcrumb, Select, Radio, Checkbox, DatePicker, InputNumber, Form, Cascader, Input, Upload, Collapse, Row, Col, Transfer } from 'antd';
import { hashHistory } from 'react-router'
import './PromotionPage.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;
const InputGroup = Input.Group;


let PromotionForm = React.createClass({
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

  getInitialState() {
    return {
      mockData: [],
      targetKeys: [],
    };
  },
  componentDidMount() {
    this.getMock();
  },
  getMock() {
    let targetKeys = [];
    let mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i,
        title: `内容${i + 1}`,
        description: `内容${i + 1}的描述`,
        chosen: Math.random() * 2 > 1
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  },
  handleChange(targetKeys) {
    this.setState({ targetKeys });
  },
  renderFooter() {
    return (
      <Button type="ghost" size="small" style={{ float: 'right', margin: '5' }}
        onClick={this.getMock}>
        刷新
      </Button>
    );
  },

  render() {
    const { getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    };
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 3, message: '活动名称至少为 3 个字' },
      ],
    });
    const actityDateProps = getFieldProps('actityDate', {
      rules: [
        { required: true, type: 'array',  message: '您还没填写活动时间呢' },
      ],
    });
    const textareaProps = getFieldProps('intro', {
      rules: [
        { required: true,  message: '不填写活动说明，怎么让用户了解你的活动' },
      ],
    });
    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          {...formItemLayout}
          label="活动名称："
          hasFeedback>
          <Input {...nameProps} placeholder="请填写活动名称，不少于3个字" />
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
          <Input {...textareaProps} type="textarea" placeholder="写得详细一些，活动会更吸引人。" rows="5" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动图片："
          help="上传图片的最佳尺寸：300像素*300像素，其他尺寸会影响页面效果，格式png，jpeg，jpg，gif。大小不超过1M">
          <Upload className="upload-list-inline" action="/upload.do" listType="picture">
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
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
    );
  },
});
PromotionForm = createForm()(PromotionForm);



const PromotionPage = React.createClass({
  render(){
    return <div className="ant-layout-content">
      <div className="main_hd main_hd_bd" key="a">
        <h3 className="title_border">
          特惠活动
        </h3>
      </div>
      {this.props.children || "似乎有一些问题！！！"}
    </div>
  }
});


const PromotionIndexPage = React.createClass({
  getInitialState(){
    return {
      data : [{
        key: '1',
        name: '五一优惠大酬宾活动',
        attime: '05-01 至 05-05',
        status: '进行中'
      }, {
        key: '2',
        name: '五一优惠大酬宾活动2',
        attime: '05-01 至 05-05',
        status: '未开始'
      }, {
        key: '3',
        name: '五一优惠大酬宾活动3',
        attime: '05-01 至 05-05',
        status: '已结束'
      }],
    };
  },

  getColumns(){
    let confirm = (record)=>{
      console.log(record);
      let newData = this.state.data.filter((info) => {
        return info.key != record.key;
      });
      this.setState({data:newData});
      message.success('点击了确定');
    }
    let cancel = ()=>{
      message.error('点击了取消');
    }
    return [{
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
      render(text) {
        return <a href="#">{text}</a>;
      }
    }, {
      title: '活动时间',
      dataIndex: 'attime',
      key: 'attime',
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
            <Popconfirm title="确定要删除这个活动吗？" onConfirm={()=>{confirm(record)}} onCancel={cancel}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        );
      }
    }]
  },

  render(){
    return <QueueAnim className="main-content">
        <div className="topbar" key="b">
          <Button type="primary" size="large" className="pull-right" onClick={()=>{hashHistory.push('/promotionPage/add')}}>
            <Icon type="plus" />新增特惠
          </Button>
          <div style={{clear:'both'}}></div>
        </div>
        <Table columns={this.getColumns()} dataSource={this.state.data} key="c" />
      </QueueAnim>
  }
});


const PromotionAddPage = React.createClass({
  render(){
    return (
        <QueueAnim className="main-content">
          <div className="topbar flex flex-align-center" key="b">
            <Button className="backbtn" size="small" onClick={()=>{hashHistory.goBack()}}>
              <Icon type="left" />
            </Button>
            <Breadcrumb separator=">" {...this.props} />
            <div style={{clear:'both'}}></div>
          </div>
          <div className="mini-tip-box text-center" key="c">
            <Icon type="info-circle" className="blue-text" style={{marginRight:"5"}} />
            确保活动的真实性才能吸引到用户。
          </div>
          <PromotionForm key="d"/>
        </QueueAnim>
    )
  },
});

export {PromotionPage, PromotionIndexPage, PromotionAddPage};
