import React from 'react';
import { Menu, Breadcrumb, Icon, Button, Table, Popconfirm, message } from 'antd';
import './MainPage.less';


const SubMenu = Menu.SubMenu;

const MainPage = React.createClass({
  getInitialState(){
    return {
      date : '',
    };
  },

  render(){
    return <div className="t">
      欢迎访问点多多商户后台
    </div>
  }
});

export default MainPage;
