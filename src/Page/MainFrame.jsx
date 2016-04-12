import React from 'react';
import { Menu, Breadcrumb, Icon, Button, Table, Popconfirm, message } from 'antd';
import { Link } from 'react-router'
import './MainFrame.less';


const SubMenu = Menu.SubMenu;

const App = React.createClass({
  getInitialState(){
    return {
      date : '',
    };
  },

  render(){
    const key = this.props.location.pathname;
    const keys = key.replace('/', '') ? [key.replace('/', '')] : ['home'];

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
            <Menu mode="inline" defaultSelectedKeys={keys} defaultOpenKeys={['sub1']}>
              <SubMenu key="sub1" title={<span><Icon type="user" />功能菜单</span>}>
                <Menu.Item key="home">
                  <Link to="/">首页</Link>
                  </Menu.Item>
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
