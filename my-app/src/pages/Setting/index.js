import React, { Component } from 'react';
import { Form, Input, List, Avatar, Select, Button, Card, Skeleton, message,Collapse } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';
import Link from 'umi/link';
import logo from './assets/logo.png';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ user, user_management,bookshelf, loading,global }) => ({
    user,
    global,
    bookshelf,
    user_management,
    loading: loading,
}))

@Form.create()

export default class Setting extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount(){
        const { dispatch ,user:{currentUser} } = this.props;
        dispatch({
            type: 'bookshelf/fetchShelf',
            payload: {
                UID:currentUser.userid,
            }
        });
    }

    //点击某本书的区域查看书的详细信息
    onClick(item) {
        const { dispatch } = this.props;
        dispatch({
            type: 'book/saveBookRecord',
            payload: item
        });
        //跳转到图书详情页面
        router.push(`/BookDetail`); 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, user: { currentUser }, dispatch } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                UID: currentUser.userid,
                avatar: currentUser.avatar,
            };
            if(currentUser.authority=="admin")
            {
                values['authority']=1;
            }
            else
            {
                values['authority']=0;
            }
            if(values.gender=="男")
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

            //跳转到登录界面
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
            user: { currentUser },
            global: { prefers },
            bookshelf: { book_shelf },
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
            <div className={styles.body}>
                <div className={styles.header}>
                    <Link to="/">
                        <img alt="logo" className={styles.logo} src={logo} />
                        <span className={styles.title}>悦读</span>
                    </Link>
                    <Link to='/Setting'>
                        <div style={{ float: "right", marginRight: 10, marginLeft: 5 }}>{currentUser.name}</div>
                        <Avatar src={currentUser.avatar} style={{ float: "right", width: 44, height: 44 }} />
                    </Link>
                </div>
                <Card bordered={false} style={{ backgroundColor: '#FCFCFC' }}>
                    <div style={{ marginLeft:'20%',padding: '8px 12px', color: '#333', fontWeight: 'bold', fontSize: 14, backgroundColor: '#ebf0f2', display: 'inline' }}>个人信息</div>
                    <Card bordered={false} style={{width: '60%', margin: '0 auto', marginTop:10, marginBottom:10, paddingLeft: 200,backgroundColor: '#FCFCFC'  }}>
                        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark {...formItemLayout}>
                            <FormItem label="昵称">
                                {getFieldDecorator('nick_name', {
                                    initialValue: currentUser.name,
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="邮箱：">
                                {getFieldDecorator('email', {
                                    initialValue: currentUser.email,
                                })(<Input disabled={true} />)}
                            </FormItem>
                            <FormItem label="电话：">
                                {getFieldDecorator('phone', {
                                    initialValue: currentUser.phone,
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="密码：">
                                {getFieldDecorator('password', {
                                    initialValue: currentUser.password,
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
                            <FormItem label="性别：">
                                {getFieldDecorator('gender', {
                                    initialValue: currentUser.gender,
                                })(
                                    <Select
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                    >
                                        <Option value="女">女</Option>
                                        <Option value="男">男</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="偏好：">
                                {getFieldDecorator('preferID', {
                                    initialValue: currentUser.preferID,
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
                            <div style={{ 'textAlign': 'center' }}>
                                <Button type="primary" style={{ 'marginRight': '21%' }} onClick={this.handleSubmit}>
                                    提交修改
                                </Button>
                            </div>
                        </Form>
                    </Card>
                    <div style={{ marginLeft:'20%',padding: '8px 12px', color: '#333', fontWeight: 'bold', fontSize: 14, backgroundColor: '#ebf0f2', display: 'inline' }}>我的收藏</div>
                        <Card bordered={false} style={{width: '60%', margin: '0 auto', marginTop:10, marginBottom:10, backgroundColor: '#FCFCFC'  }}>
                        <List
                            itemLayout="horizontal"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={book_shelf}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Button type="link" onClick={()=>{this.onClick(item);}}>详情</Button>]}
                                >
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                        avatar={<img src={item.avatar} style={{ width: 100 }} />}
                                        title={<div style={{fontWeight: 'bold', fontSize: 16}}>书名：{item.bookname}</div>}
                                        description={<div>简介：{item.description.substring(0, 50)}......</div>}
                                        style={{ textAlign: 'left', paddingLeft: 10 }}
                                        />
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Card>
                <div style={{ padding: '24px 24px 24px', textAlign: 'center', }}>Copyright @ 2019 hm,zpp,cl,yy,jhs,cxr</div>
            </div>
        );
    }
}  