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

//注册组件
export default class Register extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type: 'global/fetchPrefers',
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, dispatch } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };

            // dispatch({
            //     type: 'user/register',
            //     payload: values,
            // });

            //跳转路由
            router.push(`/user/login`);
        });
    };

    //判断两次输入密码是否一致
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;

        return (
            <div className={styles.body}>
                <div className={styles.main}>
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark style={{ paddingTop: '35%', paddingLeft: '10%' }}>
                        <div style={{ float: "left", fontSize: 22, fontWeight: 300, color: "white",width:100 }}>邮箱</div>
                        <FormItem>
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
                            })(<Input style={{ width: "70%", height: 35 }} placeholder="请输入邮箱" />)}
                        </FormItem>
                        <div style={{ float: "left", fontSize: 22, fontWeight: 300, color: "white",width:100 }}>用户名</div>
                        <FormItem>
                            {getFieldDecorator('nick_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入你的用户名',
                                    },
                                ],
                            })(<Input style={{ width: "70%", height: 35, fontSize: 18 }} placeholder="请输入你的用户名" />)}
                        </FormItem>
                        <div style={{ float: "left", fontSize: 22, fontWeight: 300, color: "white" ,width:100}}>密码</div>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入你的密码',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password style={{ width: "70%", height: 35, fontSize: 18 }} placeholder="请输入密码" />)}
                        </FormItem>
                        <div style={{ float: "left", fontSize: 22, fontWeight: 300, color: "white",width:100 }}>确认密码</div>
                        <FormItem>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请再次输入密码',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password style={{ width: "70%", height: 35, fontSize: 18 }} onBlur={this.handleConfirmBlur} placeholder="请再次输入密码" />)}
                        </FormItem>
                        <div style={{ float: "left", fontSize: 22, fontWeight: 300, color: "white",width:100 }}>性别</div>
                        <FormItem>
                            {getFieldDecorator('gender', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择你的性别',
                                    },
                                ],
                            })(
                                <Select
                                    style={{ width: "70%", height: 35, fontSize: 18 }}
                                    optionFilterProp="children"
                                    placeholder="请选择性别"
                                >
                                    <Option value="1">男</Option>
                                    <Option value="0">女</Option>
                                </Select>
                            )}
                        </FormItem>
                        <div style={{ 'textAlign': 'center', marginTop: 10 }}>
                            <Button onClick={this.handleSubmit} className={styles.button}>
                                注册
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}