import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './HomePage.less';
import Button from 'antd/es/button/button';

@connect(({ }) => ({
    
}))

export default class HomePage extends Component {
    onClick = () => {
        //点击按钮跳转到我的世界地图
        console.log("nihao");
        router.push(`/MyWorldMap`); 
    }
    render() {
        return (
            <Button type="primary" onClick={this.onClick}>点击进入我的世界地图</Button>
        );
    }
}