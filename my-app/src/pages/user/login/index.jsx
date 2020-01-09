import React, { Component } from 'react';
import { Form, Input, Select, Button, Card } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ user }) => ({
  user,
}))

@Form.create()

//登录组件
export default class Login extends Component {
  componentDidMount() {
  }

  onClickRegister = () => {
    router.push(`/user/register`);
  }

  //提交登录
  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };

      dispatch({
        type:'user/login',
        payload:{
          email:values.email,
          password:values.password,
        }
      });
    });
  };


  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className={styles.body}>
        <div className={styles.main}>
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark style={{paddingTop:'35%',paddingLeft:'10%'}}>
          <div style={{float:"left",fontSize:22,fontWeight:300,color:"white"}}>账号</div>
          <FormItem style={{margin:"0 auto",marginBottom:40}}>
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
            })(<Input style={{width:"70%",height:35,marginLeft:30}} placeholder="请输入邮箱"/>)}
          </FormItem>
          <div style={{float:"left",fontSize:22,fontWeight:300,color:"white"}}>密码</div>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入你的密码',
                }
              ],
            })(<Input.Password style={{width:"70%",height:35,marginLeft:30,fontSize:18}} placeholder="请输入密码" />)}
          </FormItem>
          <div style={{float:"left",color:"white"}}>忘记密码？</div>
          <div style={{color:"white",paddingLeft:"63%"}}>新用户点击<a onClick={this.onClickRegister}>注册</a></div>
          <div style={{ 'textAlign': 'center',marginTop:10 }}>
            <Button onClick={this.handleSubmit} className={styles.button}>
              登录
            </Button>
          </div>
        </Form>
        </div>
      </div>
    );
  }
}
