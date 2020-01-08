import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './MyWorldMap.less';
import Button from 'antd/es/button/button';

@connect(({ }) => ({
    
}))

export default class MyWorldMap extends Component {
    render() {
        return (
            <div>我的世界地图</div>
        );
    }
}