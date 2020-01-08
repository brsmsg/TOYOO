import React, { Component } from 'react';
import { Form, Input,Select, Button, Card} from 'antd';
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

            dispatch({
                type: 'user/register',
                payload: values,
            });

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

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };

        return (
            <div className={styles.main}>
                <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark {...formItemLayout}>
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
                        })(<Input placeholder="请输入邮箱"/>)}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('nick_name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入你的用户名',
                                },
                            ],
                        })(<Input placeholder="请输入你的用户名"/>)}
                    </FormItem>
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
                        })(<Input.Password placeholder="请输入密码"/>)}
                    </FormItem>
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
                        })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="请再次输入密码" />)}
                    </FormItem>
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
                                optionFilterProp="children"
                                placeholder="请选择性别"
                            >
                                <Option value="1">男</Option>
                                <Option value="0">女</Option>
                            </Select>
                        )}
                    </FormItem>
                    <div style={{ 'textAlign': 'center' }}>
                        <Button type="primary" onClick={this.handleSubmit}>
                            注册
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}