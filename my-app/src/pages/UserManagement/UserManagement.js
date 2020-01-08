import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Input, Avatar, List,Skeleton ,Button} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

const { Search } = Input;
const { Meta } = Card;

@connect(({ user_management, loading,global }) => ({
    user_management,
    global,
    loading: loading,
}))

export default class UserManagement extends Component {

    componentDidMount() {
        const { dispatch ,global:{prefers}} = this.props;
        dispatch({
            type: 'user_management/fetch',
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
        //将点击的对应的用户信息存到reducer
        dispatch({
        type: 'user_management/addUserRecord',
        payload: item,
        });
        //跳转路由
        router.push(`/UserManagement/updateUser/${item.UID}`); 
    }

    //点击删除按钮触发函数
    onClickDelete(item){
        const { dispatch } = this.props;
        //将点击的对应的用户信息的UID作为参数，发送请求
        dispatch({
        type: 'user_management/deleteUser',
        payload:{
            UID:item.UID,
        } 
        });
    }

    render() {
        const {
            user_management: { data },
            loading,
        } = this.props;

        return (
            <PageHeaderWrapper>
                <Card border={false}>
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
                                style={{textAlign: 'left'}}
                                actions={[<Button onClick={()=>{this.onClickDelete(item);}}>删除</Button>,<Button onClick={()=>{this.onClickUpdate(item);}}>修改</Button>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={item.avatar} />
                                        }
                                    title={<div>用户名：{item.nick_name}</div>}
                                    style={{paddingLeft: 10}}
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