import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Input, Avatar, List,Skeleton ,Button} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

const { Search } = Input;
const { Meta } = Card;

@connect(({ book_management, loading,global }) => ({
    book_management,
    global,
    loading: loading,
}))

export default class BookManagement extends Component {

    componentDidMount() {
        const { dispatch ,global:{prefers}} = this.props;
        dispatch({
            type: 'book_management/fetch',
        });

        if(prefers.length==0)
        {
            dispatch({
                type: 'global/fetchPrefers',
            });
        }
    }

    //点击修改按钮触发，跳转到修改信息页面
    onClickUpdate(item){
        const { dispatch } = this.props;
        //将点击的对应的图书信息存到reducer
        dispatch({
        type: 'book_management/addBookRecord',
        payload: item,
        });
        //跳转路由
        router.push(`/BookManagement/updateBook/${item.bookID}`); 
    }

    //点击删除按钮触发函数
    onClickDelete(item){
        const { dispatch } = this.props;
        //将点击的对应的图书信息的bookID作为参数，发送请求
        dispatch({
        type: 'book_management/deleteBook',
        payload:{
            bookID:item.bookID,
        } 
        });
    }

    //点击添加按钮触发函数
    onClickAdd(){
        //跳转路由
        router.push(`/BookManagement/addBook`); 
    }

    render() {
        const {
            book_management: { data },
            loading
        } = this.props;

        return (
            <PageHeaderWrapper>
                <Card border={false}>
                    <Button style={{marginLeft: 20}}type="primary" onClick={this.onClickAdd} >添加</Button>
                    <List
                        itemLayout="horizontal"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item
                                actions={[<Button onClick={()=>{this.onClickDelete(item);}}>删除</Button>,<Button onClick={()=>{this.onClickUpdate(item);}}>修改</Button>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                    avatar={<img src={item.avatar} style={{ width: 100 }} />}
                                    title={<div>书名：{item.bookname}</div>}
                                    description={<div>简介：{item.description}</div>}
                                    style={{ textAlign: 'left', paddingLeft: 10 }}
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}