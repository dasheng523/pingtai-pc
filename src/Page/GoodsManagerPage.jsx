import React from 'react';
import { QueueAnim, Icon, Button, Table, Popconfirm, message, Breadcrumb, Select, Radio, Checkbox, DatePicker, InputNumber, Form, Cascader, Input, Upload, Collapse, Row, Col } from 'antd';
import { hashHistory, Link } from 'react-router'
import reqwest from 'reqwest';

import Utils from '../component/YsUtils'
import { YsPicUpload } from '../component/YsUpload'
import './PromotionPage.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;
const InputGroup = Input.Group;


const ysUpload = YsPicUpload();
const YsUploadNode = ysUpload.getNode();


/**
 * 商品管理主框架
 * @param  {[type]} {               render( [description]
 * @return {[type]}   [description]
 */
const GoodsPage = React.createClass({
  render(){
    return <div className="ant-layout-content">
      <div className="main_hd main_hd_bd" key="a">
        <h3 className="title_border">
          商品管理
        </h3>
      </div>
      {this.props.children || "似乎有一些问题！！！"}
    </div>
  }
});

/**
 * 商品管理主页面
 * @param  {[type]} {               render( [description]
 * @return {[type]}   [description]
 */
const GoodsIndexPage = React.createClass({
  getInitialState() {
    return {
      data: [],
      pagination: {},
      loading: false,
    };
  },

  componentDidMount(){
    this.fetch();
  },

  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  },

  fetch(params = {}){
    console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
      url: '/goodslist.json',
      method: 'post',
      data: params,
      type: 'json',
      success: (result) => {
        const pagination = this.state.pagination;
        pagination.total = result.data.totalCount;
        this.setState({
          loading: false,
          data: result.data.list,
          pagination,
        });
      }
    });
  },

  getColumns(){
    let confirm = (record)=>{

      let newData = this.state.data.filter((info) => {
        return info.key != record.key;
      });
      Utils.fetchDataWithCode('/delGoods.json',{id:record.key},(rs)=>{
        if(rs.status==1){
          this.setState({data:newData});
          message.success(rs.data);
        }
        else{
          message.error(rs.data);
        }
      });

    }
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
      render:(text, record,key)=>{
        return (
          <span>
            <Link to={{ pathname: '/goodsManagerPage/add', query: { id: record.key } }}>编辑</Link>
              <span className="ant-divider"></span>
            <Popconfirm title="确定要删除这个商品吗？" onConfirm={()=>{confirm(record)}}>
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
          <Button type="primary" size="large" className="pull-right" onClick={()=>{hashHistory.push('/goodsManagerPage/add')}}>
            <Icon type="plus" />新增商品
          </Button>
          <div style={{clear:'both'}}></div>
        </div>
        <Table columns={this.getColumns()}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        key="c" />
      </QueueAnim>
  }
});

/**
 * 添加商品
 */
const GoodsAddPage = createForm()(React.createClass({

  getInitialState() {
    return {
      data: {},
      loading:false,
    };
  },

  fetchGoods(params = {}){
    let { query } = this.props.location;
    if(!query.id){
      return;
    }
    this.setState({ loading: true });
    params = query;

    Utils.fetchDataWithCode('/goodsInfo.json',params,(result) => {
      this.setState({ loading: false ,data: result.data});
      this.props.form.setFieldsValue({
        name: result.data.name,
        price: result.data.price,
        intro: result.data.intro,
      });
    });

  },

  componentDidMount(){
    this.fetchGoods();
  },

  render(){
    const checkPrice = (rule, value, callback) => {
      if (!value || value.indexOf("/")<=0) {
        callback(new Error('正确格式： 5元/斤 或 1.2元/个 等'));
      } else {
        callback();
      }
    }

    const handleReset = (e) => {
      e.preventDefault();
      this.props.form.resetFields();
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((errors, values) => {
        if (!!errors) {
          console.log('Errors in form!!!');
          return;
        }
        values.uploadList = ysUpload.getUploadFiles();
        let goodsInfo = this.state.data;
        Object.assign(goodsInfo,values);
        Utils.fetchDataWithCode('/goodsCommit.json',goodsInfo,(result)=>{
          if(result.status == 1){
            message.success(result.data);
            setTimeout(()=>{
              hashHistory.replace('/goodsManagerPage');
            },1500);
          }else{
            message.error(result.data);
          }
        });
      });
    }

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
    const textareaProps = getFieldProps('intro', {
      rules: [
        { required: true,  message: '填写商品说明，才能让用户了解你的商品' },
      ],
    });
    const priceProps = getFieldProps('price', {
      rules: [
        { validator: checkPrice, required: true}],
    });

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
          label="商品名称："
          hasFeedback>
          <Input {...nameProps} placeholder="请填写商品名称，不少于2个字" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商品价格："
          hasFeedback>
          <Input {...priceProps} placeholder="请填写商品名称，不少于2个字" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商品说明："
          hasFeedback>
          <Input {...textareaProps} type="textarea" placeholder="写得详细一些，商品会更吸引人" rows="5" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商品图片："
          help="上传图片的最佳尺寸：300像素*300像素，其他尺寸会影响页面效果，格式png，jpeg，jpg，gif。大小不超过1M">
            <YsUploadNode piclist={this.state.data.uploadList} />
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 9 }} >
          <Button type="primary" onClick={handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={handleReset}>重置</Button>
        </FormItem>
      </Form>
    </QueueAnim>
  }
}));


export {GoodsPage, GoodsIndexPage, GoodsAddPage};
