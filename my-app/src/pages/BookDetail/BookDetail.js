import React, { Component } from 'react';
import { Card, Input, Avatar, Select, Tag, Collapse } from 'antd';
import Link from 'umi/link';
import CommentaryList from './CommentaryList.js';
import Commentary from './Commentary.js';
import { connect } from 'dva';
import logo from './assets/logo.png';
import styles from './BookDetail.less';
import Button from 'antd/es/button/button';

@connect(({ loading,commentary,user,book,bookshelf }) => ({
    user,
    book,
    bookshelf,
    commentary,
    loading: loading,
}))

export default class BookDetail extends Component {
    componentDidMount(){
        const { dispatch,book:{book_record} } = this.props;
        dispatch({
            type: 'commentary/fetchCommentary',
            payload: {
                bookID: book_record.bookID,
            },
        });
    }

    //收藏该书
    onClick(){
        const { dispatch,book:{book_record},user:{currentUser} } = this.props;
        dispatch({
            type: 'bookshelf/submitShelf',
            payload: {
                bookID: book_record.bookID,
                UID:currentUser.userid,
            },
        });
    }

    render() {
        const {
            user: { currentUser },
            book: { book_record },
            commentary: { commentary },
        } = this.props;

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
                <Card bordered={false} style={{backgroundColor:'#FCFCFC'}}>
                    <div style={{marginBottom:10,textAlign:'center',fontWeight:'bolder',fontSize:40,color:'#333333'}}>{book_record.bookname}</div>
                    <div style={{marginBottom:5,textAlign:'center',fontWeight:'bold',fontSize:14,color:'#333333'}}>{book_record.author}</div>
                    <div style={{margin:10,textAlign:'center'}}>
                        <img src={book_record.avatar} style={{width: 120, height: 180, marginLeft: 20 }}/>
                    </div>
                    <div style={{textAlign:'center',fontWeight:'bold',fontSize:12,color:'#666666'}}>出版社：{book_record.press}  |出版时间：{book_record.publishingtime}  |评分：<span style={{ color: 'red', marginRight: 6, fontWeight: 'bolder' }}>{book_record.score}</span></div>
                    <div style={{textAlign:'center',marginTop:10}}>
                        <Tag color="#2db7f5">{book_record.prefername}</Tag>
                    </div>
                    <div style={{fontWeight:'bold',backgroundColor: '#ebf0f2',width:'60%',margin:'0 auto',padding:'10px 13px',marginTop:30,fontSize:13,color:'#333333'}}>简介</div>
                    <div style={{width:'60%',margin:'0 auto',padding:'20px 13px 10px',fontSize:13,color:'#333333'}}>{book_record.description}</div>
                    <Card bordered={false} style={{backgroundColor:'#FCFCFC',width:'60%',margin:'0 auto',textAlign:'center'}}>
                        <Button target="_blank" href={book_record.bookURL} style={{border:'none',color:'gray',backgroundColor:'aliceblue'}}>开始阅读</Button>
                        <Button style={{border:'none',color:'gray',backgroundColor:'aliceblue',marginLeft:20}} onClick={()=>this.onClick()}>收藏</Button>
                    </Card>
                    <div style={{fontWeight:'bold',backgroundColor: '#ebf0f2',width:'60%',margin:'0 auto',padding:'10px 13px',marginTop:30,fontSize:13,color:'#333333'}}>评论（{commentary.length}）</div>
                    <Card bordered={false} style={{backgroundColor:'#FCFCFC',width:'60%',margin:'0 auto'}}>
                        {
                            commentary.map((item,i)=>{
                                return(
                                    <CommentaryList data={item} key={i}/>
                                );
                            }) 
                        }
                    </Card>
                    <Card bordered={false} style={{backgroundColor:'#FCFCFC',width:'60%',margin:'0 auto'}}>
                        <Commentary userInfo={currentUser} bookID={book_record.bookID}/>
                    </Card>
                </Card>
                <div style={{padding: '24px 24px 24px',textAlign: 'center',}}>Copyright @ 2019 hm,zpp,cl,yy,jhs,cxr</div>
            </div>
        );
    }
}