import React from 'react';
import { Menu, Breadcrumb, Icon, Button, Table, Popconfirm, message } from 'antd';
import { Link, hashHistory } from 'react-router'
import cookie from 'react-cookie';

import BufferState from '../component/BufferState';
import './MainFrame.less';

const SubMenu = Menu.SubMenu;

const buffer = new BufferState();

const App = React.createClass({
  getInitialState(){
    return {
      date : '',
    };
  },

  handleLogout(){
    cookie.remove('code');
    hashHistory.replace('/login');
  },

  render(){
    const key = this.props.location.pathname;
    const keys = key.replace('/', '') ? [key.replace('/', '')] : ['home'];

    let shopInfo = buffer.getShopInfo();

    return <div className="ant-layout-top">
      <div className="ant-layout-header border-box">
        <div className="ant-layout-wrapper">
          <div className="ant-layout-logo">
            <Link to="/">商户后台</Link>
          </div>
          <div className="ant-layout-account flex flex-align-center">
            <Link className="ant-layout-account-info" to="/shopInfo">{shopInfo.name}</Link>
            <a className="ant-layout-logout" href="javascript:;" onClick={this.handleLogout}>退出</a>
          </div>
        </div>
      </div>
      <div className="ant-layout-wrapper ant-layout-topaside">
        <div className="ant-layout-container border-box">
          <aside className="ant-layout-sider">
            <Menu mode="inline" defaultSelectedKeys={keys} defaultOpenKeys={['sub1']}>
              <SubMenu key="sub1" title={<span><Icon type="user" />功能菜单</span>}>
                <Menu.Item key="promotionPage">
                  <Link to="/promotionPage">特惠活动</Link>
                  </Menu.Item>
                <Menu.Item key="panicBuyPage">
                  <Link to="/panicBuyPage">抢购活动</Link>
                </Menu.Item>
                <Menu.Item key="goodsManagerPage">
                  <Link to="/goodsManagerPage">商品管理</Link>
                </Menu.Item>
                <Menu.Item key="shopInfo">
                  <Link to="/shopInfo">商户资料</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </aside>
          {this.props.children}
        </div>
        <div className="ant-layout-footer">
          店多多商户后台 版权所有 © 2016 由业翔技术开发工作室支持
        </div>
      </div>

    </div>
  }
});

export default App;
