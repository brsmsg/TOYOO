import React, { Component } from 'react';
import { Card, Input, Avatar, Select, Carousel, Col, Row, Collapse,Tag } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import defaultAvatar from './assets/avatar.jpg';
import logo from './assets/logo.png';
import styles from './HomePage.less';
import Button from 'antd/es/button/button';


const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;
const { Panel } = Collapse;

@connect(({ loading, global, user, book }) => ({
    user,
    global,
    book,
    loading: loading,
}))

export default class HomePage extends Component {
    state={
        select_value:'',
    };

    componentDidMount() {
        const { dispatch, user: { currentUser } } = this.props;
        dispatch({
            type: 'book/fetchBestSeller',
        });
        dispatch({
            type: 'book/fetchRankList',
        });
        dispatch({
            type: 'book/fetchRecommend',
            payload: {
                preferID: currentUser.preferID,
            }
        });
        dispatch({
            type: 'global/fetchPrefers',
        });
    }

    //搜索函数,value是用户输入的书名
    onSearchBook(value) {
        
        const { dispatch } = this.props;
        const { select_value } = this.state;
        console.log(select_value);
        dispatch({
            type: 'book/searchBook',
            payload: {
                bookname: value,
                preferID: select_value,
            },
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

    //设置搜索标签的值
    onChange = value => {
        this.setState({
            select_value: value,
        });
    };

    render() {
        const {
            global: { prefers },
            user: { currentUser },
            book: { recommend, best_seller, rank_list },
        } = this.props;

        const selectBefore = (
            <Select defaultValue="0" style={{ width: 100 }} onChange={this.onChange}>
                <Option value="0" key="0" >全部分类</Option>
                {
                    prefers.map((item) => {
                        return (
                            <Option value={item.preferID} key={item.preferID}>{item.prefername}</Option>
                        );
                    })
                }
            </Select>
        );

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
                    <Search
                        addonBefore={selectBefore}
                        placeholder="请输入要查询的书名"
                        onSearch={(value) => { this.onSearchBook(value); }}
                        style={{ width: '60%', paddingLeft: '26%', marginTop: 10 }}
                    />
                </div>
                <Carousel autoplay style={{ height: 200 }}>
                    <div>
                        <img src="https://img3.doubanio.com/view/ark_campaign_pic/web_large/public/8651.jpg" style={{ width: '100%', height: 200 }} />
                    </div>
                    <div>
                        <img src="https://img1.doubanio.com/view/ark_campaign_pic/web_large/public/8647.jpg" style={{ width: '100%', height: 200 }} />
                    </div>
                    <div>
                        <img src="https://img9.doubanio.com/view/ark_campaign_pic/web_large/public/8626.jpg" style={{ width: '100%', height: 200 }} />
                    </div>
                </Carousel>
                <Card style={{ paddingLeft: '11%', marginTop: 40 }} bordered={false}>
                    <div style={{ padding: '8px 12px', color: '#fff', fontWeight: 'bold', fontSize: 14, backgroundColor: '#bb996d', display: 'inline' }}>重磅推荐</div>
                    <Row gutter={16}>
                        {
                            recommend.map((item) => {
                                return (
                                    <Col span={12}>
                                        <Card
                                            hoverable
                                            style={{ width: 500,margin:20 }}
                                            bordered={false}
                                        >
                                            <Meta
                                                avatar={
                                                    <Button type="link" onClick={()=>{this.onClick(item);}}><img src={item.avatar} style={{ width: 150, height: 200 }}/></Button>
                                                }
                                                title={
                                                    <div>
                                                        <span style={{ fontWeight: 'bold', fontSize: 23 }}>{item.bookname}</span>
                                                        <div>{item.author}</div>
                                                    </div>
                                                }
                                                description={
                                                    <div>
                                                        <div style={{ marginTop: 30, marginBottom: 20 }}>{item.description.substring(0, 50)}...</div>
                                                        <Tag color="#f50">{item.prefername}</Tag>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Card>
                <Card style={{ paddingLeft: '9%', marginTop: 20, backgroundColor: 'aliceblue' }} bordered={false}>
                    <div style={{ fontSize: 24, fontWeight: 'bolder' }}>畅销作品</div>
                    <Row gutter={16}>
                        {
                            best_seller.map(item => {
                                return (
                                    <Col span={6}>
                                        <Card
                                            hoverable
                                            bordered={false}
                                            style={{ width: 230, backgroundColor: 'aliceblue', paddingTop: 40 }}
                                            cover={<img src={item.avatar} style={{ width: 120, height: 180, marginLeft: 20 }} />}
                                        >
                                            <Meta
                                                title={
                                                    <div>
                                                        <span style={{ fontWeight: 'bold', fontSize: 16 }}>{item.bookname}</span>
                                                        <div style={{ fontSize: 12 }}>{item.author}</div>
                                                    </div>
                                                }
                                                description={
                                                    <div>
                                                        <div style={{ fontSize: 13 }}>{item.description.substring(0, 30)}...</div>
                                                        <div style={{ padding: 3, fontSize: 12 }}>评分：<span style={{ color: 'red' }}>{item.score}</span> | {item.prefername} | </div>
                                                        <a style={{ fontSize: 12,color:'#333333'}} type="link" onClick={()=>{this.onClick(item);}}>详情</a>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Card>
                <Card style={{ paddingLeft: '8%', marginTop: 40, backgroundColor: '#fff' }} bordered={false}>
                    <div style={{ fontSize: 24, fontWeight: 'bolder', marginBottom: 40 }}>排行榜</div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                hoverable
                                bordered={false}
                                style={{ width: 360, backgroundColor: 'aliceblue' }}
                            >
                                <div style={{ fontSize: 18, fontWeight: 'bolder', color: '#007799' }}>IT榜</div>
                                <Collapse accordion bordered={false} style={{ backgroundColor: 'aliceblue' }}>
                                    {
                                        rank_list.IT.map((item,i) => {
                                            if(i<3)
                                            {
                                                return (
                                                    <Panel header={<div><span style={{ color: 'red', marginRight: 6, fontWeight: 'bolder' }}>{i+1}</span>{item.bookname}</div>} key={i} showArrow={false}>
                                                        <img src={item.avatar} style={{ float: 'left', width: 80, height: 120, marginLeft: 20, marginBottom: 10 }} />
                                                        <div style={{ float: 'left', marginLeft: 20 }}>
                                                            <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>作者：{item.author}</div>
                                                            <div style={{ color: 'red', fontSize: 12, fontWeight: 'bolder' }}>评分：{item.score}</div>
                                                            <a style={{ fontSize: 12,color:'#333333'}} type="link" onClick={()=>{this.onClick(item);}}>详情</a>
                                                        </div>
                                                    </Panel>
                                                );
                                            }
                                            else
                                            {
                                                return (
                                                    <Panel header={<div><span style={{ color: '#f9c300', marginRight: 6, fontWeight: 'bolder' }}>{i+1}</span>{item.bookname}</div>} key={i} showArrow={false}>
                                                        <img src={item.avatar} style={{ float: 'left', width: 80, height: 120, marginLeft: 20, marginBottom: 10 }} />
                                                        <div style={{ float: 'left', marginLeft: 20 }}>
                                                            <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>作者：{item.author}</div>
                                                            <div style={{ color: 'red', fontSize: 12, fontWeight: 'bolder' }}>评分：{item.score}</div>
                                                            <a style={{ fontSize: 12,color:'#333333'}} type="link" onClick={()=>{this.onClick(item);}}>详情</a>
                                                        </div>
                                                    </Panel>
                                                );
                                            }
                                            
                                        })
                                    }
                                </Collapse>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                bordered={false}
                                style={{ width: 360, backgroundColor: 'aliceblue' }}
                            >
                                <div style={{ fontSize: 18, fontWeight: 'bolder', color: '#007799' }}>小说榜</div>
                                <Collapse accordion bordered={false} style={{ backgroundColor: 'aliceblue' }}>
                                {
                                    rank_list.Story.map((item,i) => {
                                        if(i<3)
                                        {
                                            return (
                                                <Panel header={<div><span style={{ color: 'red', marginRight: 6, fontWeight: 'bolder' }}>{i+1}</span>{item.bookname}</div>} key={i} showArrow={false}>
                                                    <img src={item.avatar} style={{ float: 'left', width: 80, height: 120, marginLeft: 20, marginBottom: 10 }} />
                                                    <div style={{ float: 'left', marginLeft: 20 }}>
                                                        <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>作者：{item.author}</div>
                                                        <div style={{ color: 'red', fontSize: 12, fontWeight: 'bolder' }}>评分：{item.score}</div>
                                                        <a style={{ fontSize: 12,color:'#333333'}} type="link" onClick={()=>{this.onClick(item);}}>详情</a>
                                                    </div>
                                                </Panel>
                                            );
                                        }
                                        else
                                        {
                                            return (
                                                <Panel header={<div><span style={{ color: '#f9c300', marginRight: 6, fontWeight: 'bolder' }}>{i+1}</span>{item.bookname}</div>} key={i} showArrow={false}>
                                                    <img src={item.avatar} style={{ float: 'left', width: 80, height: 120, marginLeft: 20, marginBottom: 10 }} />
                                                    <div style={{ float: 'left', marginLeft: 20 }}>
                                                        <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>作者：{item.author}</div>
                                                        <div style={{ color: 'red', fontSize: 12, fontWeight: 'bolder' }}>评分：{item.score}</div>
                                                        <a style={{ fontSize: 12,color:'#333333'}} type="link" onClick={()=>{this.onClick(item);}}>详情</a>
                                                    </div>
                                                </Panel>
                                            );
                                        }
                                        
                                    })
                                }
                                </Collapse>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                hoverable
                                bordered={false}
                                style={{ width: 360, backgroundColor: 'aliceblue' }}
                            >
                                <div style={{ fontSize: 18, fontWeight: 'bolder', color: '#007799' }}>文学榜</div>
                                <Collapse accordion bordered={false} style={{ backgroundColor: 'aliceblue' }}>
                                {
                                    rank_list.Literature.map((item,i) => {
                                        if(i<3)
                                        {
                                            return (
                                                <Panel header={<div><span style={{ color: 'red', marginRight: 6, fontWeight: 'bolder' }}>{i+1}</span>{item.bookname}</div>} key={i} showArrow={false}>
                                                    <img src={item.avatar} style={{ float: 'left', width: 80, height: 120, marginLeft: 20, marginBottom: 10 }} />
                                                    <div style={{ float: 'left', marginLeft: 20 }}>
                                                        <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>作者：{item.author}</div>
                                                        <div style={{ color: 'red', fontSize: 12, fontWeight: 'bolder' }}>评分：{item.score}</div>
                                                        <a style={{ fontSize: 12,color:'#333333'}} type="link" onClick={()=>{this.onClick(item);}}>详情</a>
                                                    </div>
                                                </Panel>
                                            );
                                        }
                                        else
                                        {
                                            return (
                                                <Panel header={<div><span style={{ color: '#f9c300', marginRight: 6, fontWeight: 'bolder' }}>{i+1}</span>{item.bookname}</div>} key={i} showArrow={false}>
                                                    <img src={item.avatar} style={{ float: 'left', width: 80, height: 120, marginLeft: 20, marginBottom: 10 }} />
                                                    <div style={{ float: 'left', marginLeft: 20 }}>
                                                        <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>作者：{item.author}</div>
                                                        <div style={{ color: 'red', fontSize: 12, fontWeight: 'bolder' }}>评分：{item.score}</div>
                                                        <a style={{ fontSize: 12,color:'#333333'}} type="link" onClick={()=>{this.onClick(item);}}>详情</a>
                                                    </div>
                                                </Panel>
                                            );
                                        }
                                        
                                    })
                                    }
                                </Collapse>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <div style={{padding: '24px 24px 24px',textAlign: 'center',}}>Copyright @ 2019 hm,zpp,cl,yy,jhs,cxr</div>
            </div>
        );
    }
}