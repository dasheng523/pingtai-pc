import React from 'react';
import { QueueAnim, Icon, Button, Table, Popconfirm, message, Breadcrumb, Select, Radio, Checkbox, DatePicker, InputNumber, Form, Cascader, Input, Upload, Collapse, Row, Col } from 'antd';
import { hashHistory } from 'react-router'
import './PromotionPage.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;
const InputGroup = Input.Group;


let Demo = React.createClass({
  componentDidMount() {
    this.props.form.setFieldsValue({
      eat: true,
      sleep: true,
      beat: true,
    });
  },

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

        <Goodslistbox form={this.props.form} />

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
Demo = createForm()(Demo);


/**
 * 创建一个商品列表控件
 * @param  {[goodsList]} 这是商品的数据
 * @param {[form 这个数据对应下来的表单]}
 * @return {[type]}   返回这个商品控件
 */
const Goodslistbox = React.createClass({
  getInitialState(){
    let dataSource = this.props.goodsList;
    if(!dataSource){
      dataSource = [];
    }
    return {
      dataSource:dataSource,
      showForm : false,
      showTable:true,
    }
  },
  checkPrice(rule, value, callback) {
    if (!value || value.indexOf("/")<=0) {
      callback(new Error('注意写正确格式： 5元/斤 或 1.2元/个 等'));
    } else {
      callback();
    }
  },
  handleAdd(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      let info = {goodsName:values.goodsName,goodIntro:values.goodIntro,price:values.price,key:new Date().getTime()}
      this.state.dataSource.push(info);
      this.setState({dataSource:this.state.dataSource,showForm:false,showTable:true});
    });
  },
  handleDel(key){
    let newDataSource = this.state.dataSource.filter((info)=>{
      if(info.key == key) return false;
      return true;
    });
    this.setState({dataSource: newDataSource});
  },
  handleEdit(key){
    let infos = this.state.dataSource.filter((info)=>{
      if(info.key == key) return true;
      return false;
    });
    this.props.form.setFieldsValue({
      goodsName: infos[0].goodsName,
      price: infos[0].price,
      goodIntro: infos[0].goodIntro,
    });
    this.setState({editKey:key});
    this.showForm();
  },
  handleUpdate(key){
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      let dataSource = this.state.dataSource.map((data)=>{
        if(data.key == key){
          data.goodsName = values.goodsName;
          data.goodIntro = values.goodIntro;
          data.price = values.price;
        }
        return data;
      });
      console.log(dataSource);
      this.setState({dataSource:dataSource,showForm:false,showTable:true,editKey:null});
    });
  },
  showForm(){
    this.setState({showForm:true,showTable:true});
  },
  render(){
    const columns = [{
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '操作',
      render: (text, record)=>{
        return (
          <span>
            <a href="javascript:;" onClick={()=>{this.handleEdit(record.key)}}>编辑</a>
            <span className="ant-divider"></span>
            <a href="javascript:;"  onClick={()=>{this.handleDel(record.key)}}>删除</a>
          </span>
        );
      }
    }];

    const goodInputForm = ()=>{
      let showForm = this.state.showForm;
      let editKey = this.state.editKey;
      if(showForm){
        return <div>
          <FormItem
            {...formItemLayout}
            label="商品名称："
            hasFeedback>
            <Input  {...goodsNameProps} placeholder="请输入商品名称"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="商品价格："
            hasFeedback>
            <Input {...priceProps} placeholder="格式如： 5元/斤，3元/小时，10元/个 等等" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述："
            hasFeedback>
            <Input {...textareaProps} type="textarea" placeholder="写得详细一些，商品会更吸引人。" rows="5" />
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 9 }} >
            {editKey ? <Button type="ghost" onClick={()=>{this.handleUpdate(editKey)}}>更新商品</Button> : <Button type="ghost" onClick={this.handleAdd}>提交商品</Button>}
          </FormItem>
        </div>
      }
    }

    const goodsTable = ()=>{
      let showTable = this.state.showTable;
      const showAddBtn = ()=>{
        if(!this.state.showForm){
          return (
            <FormItem
              wrapperCol={{ span: 12, offset: 9 }} >
              <Button type="ghost" onClick={this.showForm}>添加商品</Button>
            </FormItem>
          )
        }
      }
      if(showTable){
        return <div>
          <Table dataSource={this.state.dataSource} columns={columns} />
          {showAddBtn()}
        </div>
      }
    }

    const { getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    };
    const goodsNameProps = getFieldProps('goodsName', {
      rules: [
        { required: true, min: 3, message: '活动名称至少为 3 个字' },
      ],
    });
    const textareaProps = getFieldProps('goodIntro', {
      rules: [
        { required: true,  message: '您需要填写商品描述' },
      ],
    });
    const priceProps = getFieldProps('price', {
      rules: [
        { validator: this.checkPrice}],
    });
    return (
      <div className="goodslistbox">
        <Row>
          <Col span="16" offset="3">
            <h3 className="text-center" style={{padding:"10"}}>活动商品</h3>

            {goodsTable()}

            {goodInputForm()}
          </Col>
        </Row>
      </div>

    )
  }
});

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
          <Demo key="d"/>
        </QueueAnim>
    )
  },
});

export {PromotionPage, PromotionIndexPage, PromotionAddPage};
