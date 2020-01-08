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
    loading: loading,
    global,
}))

@Form.create()

export default class updateBook extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, book_management: { bookRecord }, dispatch } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                bookID:bookRecord.bookID,
            };

            dispatch({
                type: 'book_management/updateBook',
                payload: values,
            });
            //跳转路由
            router.push(`/BookManagement`);
        });
    };

    render() {
        const {
            form: { getFieldDecorator },
            book_management: { bookRecord },
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
            <PageHeaderWrapper title="修改图书信息">
                <Card border={false}>
                    <div>
                        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark {...formItemLayout}>
                            <FormItem label="书名：">
                                {getFieldDecorator('bookname', {
                                    initialValue: bookRecord.bookname,
                                })(<Input/>)}
                            </FormItem>
                            <FormItem label="出版社：">
                                {getFieldDecorator('press', {
                                    initialValue: bookRecord.press,
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="作者：">
                                {getFieldDecorator('author', {
                                    initialValue: bookRecord.author,
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="出版日期：">
                                {getFieldDecorator('publishingtime', {
                                    initialValue: bookRecord.publishingtime,
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="类别：">
                                {getFieldDecorator('preferID', {
                                    initialValue: bookRecord.preferID,
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
                                    initialValue: bookRecord.description,
                                })(<Input.TextArea autoSize={true} />)}
                            </FormItem>
                            <FormItem label="评分：">
                                {getFieldDecorator('score', {
                                    initialValue: bookRecord.score,
                                })(<Input.TextArea autoSize={true} />)}
                            </FormItem>
                            <FormItem label="阅读网址：">
                                {getFieldDecorator('bookURL', {
                                    initialValue: bookRecord.bookURL,
                                })(<Input.TextArea autoSize={true} />)}
                            </FormItem>
                            <FormItem label="封面图片：">
                                {getFieldDecorator('avatar', {
                                    initialValue: bookRecord.avatar,
                                })(<Input.TextArea autoSize={true} />)}
                            </FormItem>
                            <div style={{ 'textAlign': 'center' }}>
                                <Button type="primary" style={{ 'marginRight': '21%' }} onClick={this.handleSubmit}>
                                    更新图书信息
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
} 