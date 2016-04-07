import React from 'react';
import { Menu, Breadcrumb, Icon, Button, Table, Popconfirm, message } from 'antd';
import './ShopInfoPage.less';


const SubMenu = Menu.SubMenu;

const MainPage = React.createClass({
  getInitialState(){
    return {
      date : '',
    };
  },

  render(){
    return <div className="t">
      ShopInfoPage
    </div>
  }
});

export default MainPage;
