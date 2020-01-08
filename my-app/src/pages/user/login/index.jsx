import React, { Component } from 'react';
import { Form, Input, Select, Button, Card } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ login }) => ({
  login,
}))

@Form.create()

//登录组件
export default class Login extends Component {
  componentDidMount() {
  }

  onClickRegister = () => {
    router.push(`/user/register`);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };

      //跳转路由
      router.push(`/HomePage`);
    });
  };


  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className={styles.body}>
        <div className={styles.main}>
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark style={{paddingTop:'30%',paddingLeft:'10%'}}>
          <div style={{float:"left",fontSize:27,fontWeight:300,color:"white"}}>账号</div>
          <FormItem className={styles.formItem}>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '这不是有效邮箱',
                },
                {
                  required: true,
                  message: '请输入你的邮箱',
                },
              ],
            })(<Input style={{width:"70%",height:40,marginLeft:20,fontSize:22}} placeholder="请输入邮箱"/>)}
          </FormItem>
          <div style={{float:"left",fontSize:27,fontWeight:300,color:"white"}}>密码</div>
          <FormItem className={styles.formItem}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入你的密码',
                }
              ],
            })(<Input.Password style={{width:"70%",height:40,marginLeft:20,fontSize:22}} placeholder="请输入密码" />)}
          </FormItem>
          <div style={{float:"left",fontSize:18}}>忘记密码？</div>
          <div style={{fontSize:18}}>新用户点击<a onClick={this.onClickRegister}>注册</a></div>
          <div style={{ 'textAlign': 'center',marginTop:5 }}>
            <Button type="primary" onClick={this.handleSubmit}>
              登录
            </Button>
          </div>
        </Form>
        </div>
      </div>
    );
  }
}
