import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Upload, Select, Button, Card, Tag, Icon, message } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

const { Search } = Input;
const { Meta } = Card;

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ book_management, loading,global }) => ({
    book_management,
    global,
    loading: loading,
}))

@Form.create()

export default class addBook extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const { form, book_management: { bookRecord }, dispatch } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            
            dispatch({
                type: 'book_management/addBook',
                payload: values,
            });

            //跳转路由
            router.push(`/BookManagement`);
        });
    };

    render() {
        const {
            form: { getFieldDecorator },
            global: {prefers},
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
            <PageHeaderWrapper title="添加图书信息">
                <Card border={false}>
                    <div>
                        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark {...formItemLayout}>
                        <FormItem label="书名：">
                                {getFieldDecorator('bookname', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入书名',
                                        }
                                    ],
                                })(<Input/>)}
                            </FormItem>
                            <FormItem label="出版社：">
                                {getFieldDecorator('press', {
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="作者：">
                                {getFieldDecorator('author', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入作者名',
                                        }
                                    ],
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="出版日期：">
                                {getFieldDecorator('publishingtime', {
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="类别：">
                                {getFieldDecorator('preferID', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择类别',
                                        }
                                    ],
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
                            <FormItem label="内容简介：">
                                {getFieldDecorator('description', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入内容简介',
                                        }
                                    ],
                                })(<Input.TextArea autoSize={true} />)}
                            </FormItem>
                            <FormItem label="评分：">
                                {getFieldDecorator('score', {
                                })(<Input.TextArea autoSize={true} />)}
                            </FormItem>
                            <FormItem label="阅读网址：">
                                {getFieldDecorator('bookURL', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入阅读网址',
                                        }
                                    ],
                                })(<Input.TextArea autoSize={true} />)}
                            </FormItem>
                            <FormItem label="封面图片：">
                                {getFieldDecorator('avatar', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入封面图片地址',
                                        }
                                    ],
                                })(<Input.TextArea autoSize={true} />)}
                            </FormItem>
                            <div style={{ 'textAlign': 'center' }}>
                                <Button type="primary" style={{ 'marginRight': '21%' }} onClick={this.handleSubmit}>
                                    确认添加
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
} 