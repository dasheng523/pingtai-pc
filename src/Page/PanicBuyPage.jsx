import React from 'react';
import { Menu, Breadcrumb, Icon, Button, Table, Popconfirm, message } from 'antd';
import './PanicBuyPage.less';


const SubMenu = Menu.SubMenu;

const MainPage = React.createClass({
  getInitialState(){
    return {
      date : '',
    };
  },

  render(){
    return <div className="t">
      PanicBuyPage
    </div>
  }
});

export default MainPage;
