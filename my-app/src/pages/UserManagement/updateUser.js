import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Upload, Select, Button, Card, Tag, Icon, message } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

const { Search } = Input;
const { Meta } = Card;

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ user_management, loading,global }) => ({
    user_management,
    global,
    loading: loading,
}))

@Form.create()

export default class updateUser extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, user_management: { userRecord }, dispatch } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                avatar:userRecord.avatar,
                UID:userRecord.UID
            };

            if(values.authority=="admin"||values.authority==1)
            {
                values['authority']=1;
            }
            else
            {
                values['authority']=0;
            }
            if(values.gender=="男"||values.gender==1)
            {
                values['gender']=1;
            }
            else
            {
                values['gender']=0;
            }

            dispatch({
                type: 'user_management/updateUser',
                payload: values,
            });

            //跳转路由
            router.push(`/UserManagement`);
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
            user_management: { userRecord },
            global: { prefers },
        } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 7 },
                md: { span: 6 },
                lg: { span: 7 },
                xl: { offset: 1, span: 5 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 15 },
                md: { span: 18 },
                lg: { span: 15 },
                xl: { span: 10 },
            },
        };

        return (
            <PageHeaderWrapper title="修改用户信息">
                <Card border={false}>
                    <div>
                        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark {...formItemLayout}>
                        <FormItem label="昵称">
                                {getFieldDecorator('nick_name', {
                                    initialValue: userRecord.nick_name,
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="邮箱：">
                                {getFieldDecorator('email', {
                                    initialValue: userRecord.email,
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="电话：">
                                {getFieldDecorator('phone', {
                                    initialValue: userRecord.phone,
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="性别：">
                                {getFieldDecorator('gender', {
                                    initialValue: userRecord.gender?'男':'女',
                                })(
                                    <Select
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                    >
                                        <Option value="0">女</Option>
                                        <Option value="1">男</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="权限：">
                                {getFieldDecorator('authority', {
                                    initialValue: userRecord.authority?'admin':'user',
                                })(
                                    <Select
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                    >
                                        <Option value="0">user</Option>
                                        <Option value="1">admin</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="偏好：">
                                {getFieldDecorator('preferID', {
                                    initialValue: userRecord.preferID,
                                })(
                                    <Select
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                    >
                                        {
                                            prefers.map((item) => {
                                                return(
                                                    <Option value={item.preferID}>{item.prefername}</Option>
                                                );
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="密码：">
                                {getFieldDecorator('password', {
                                    initialValue: userRecord.password,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入你的密码',
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ],
                                })(<Input.Password placeholder="请输入密码" />)}
                            </FormItem>
                            <FormItem label="确认密码：">
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
                            <div style={{ 'textAlign': 'center' }}>
                                <Button type="primary" style={{ 'marginRight': '21%' }} onClick={this.handleSubmit}>
                                    更新用户的基本信息
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
} 