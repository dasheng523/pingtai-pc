import React from 'react';
import { Menu, Breadcrumb, Icon } from 'antd';
import './LoginForm.less';

const LoginForm = React.createClass({

  render(){
    return <div className="ys-loginbox">
      <div className="ys-panel text-center padding">
        <h1>微信扫一扫即可登录后台</h1>
        <img src="http://7xsodg.com2.z0.glb.clouddn.com/qrcode_for_gh_014551192914_430.jpg"></img>
      </div>
    </div>;
  }
});

export default LoginForm;
