import React from 'react';
import { Menu, Breadcrumb, Icon, Button, Table, Popconfirm, message } from 'antd';
import './App.less';


const SubMenu = Menu.SubMenu;

function confirm() {
  message.success('点击了确定');
}

function cancel() {
  message.error('点击了取消');
}

const columns = [{
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
  render(text, record) {
    return (
      <span>
        <a href="#">编辑</a>
          <span className="ant-divider"></span>
        <Popconfirm title="确定要删除这个活动吗？" onConfirm={confirm} onCancel={cancel}>
          <a href="#">删除</a>
        </Popconfirm>
      </span>
    );
  }
}];
const data = [{
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
}];



const App = React.createClass({
  getInitialState(){
    return {
      date : '',
    };
  },

  render(){
    return <div className="ant-layout-top">
      <div className="ant-layout-header border-box">
        <div className="ant-layout-wrapper">
          <div className="ant-layout-logo">商户后台</div>
          <div className="ant-layout-account flex flex-align-center">
            <a className="ant-layout-account-info" href="#">
              <img src="http://7xsodg.com2.z0.glb.clouddn.com/qrcode_for_gh_014551192914_430.jpg" />
              店多多商城
            </a>
            <a className="ant-layout-logout" href="#">退出</a>
          </div>
        </div>
      </div>
      <div className="ant-layout-wrapper ant-layout-topaside">
        <div className="ant-layout-container border-box">
            <aside className="ant-layout-sider">
              <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                <SubMenu key="sub1" title={<span><Icon type="user" />功能菜单</span>}>
                  <Menu.Item key="1">首页</Menu.Item>
                  <Menu.Item key="2">特惠活动</Menu.Item>
                  <Menu.Item key="3">抢购活动</Menu.Item>
                  <Menu.Item key="4">商户资料</Menu.Item>
                </SubMenu>
              </Menu>
            </aside>
            <div className="ant-layout-content">
              <div className="main_hd main_hd_bd">
                <h3 className="title_border">
                  首页
                </h3>
              </div>
              <div className="main-content">
                <div className="topbar">
                  <Button type="primary" size="large" className="pull-right">
                    <Icon type="plus" />新增特惠
                  </Button>
                  <div style={{clear:'both'}}></div>
                </div>
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
            店多多商户后台 版权所有 © 2016 由业翔技术开发工作室支持
          </div>
      </div>

    </div>
  }
});

export default App;
