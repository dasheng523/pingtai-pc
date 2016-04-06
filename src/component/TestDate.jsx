import React from 'react';
import { DatePicker,message} from 'antd';
import './TestDate.less';
/*
const App = () =>
  <DatePicker />;
*/

const TestDate = React.createClass({
  getInitialState(){
    return {
      date : '',
    };
  },

  handleChange(value){
    message.info('您选择的日期为:'+value.toString());
    this.setState({
      date :value,
    });
  },

  render(){
    return <div style={{width: 400, margin: '100px auto'}}>
      <DatePicker onChange={this.handleChange}></DatePicker>
      <div style={{marginTop: 20}}>当前日期：{this.state.date.toString()}</div>
    </div>
  }
});

export default TestDate;
