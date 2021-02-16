import React, { Component } from 'react'
import { Collapse,Card } from 'antd';
import moment from 'moment'
import {getNotcieInfo} from './service'

const { Panel } = Collapse;
class Notice extends Component {
    constructor(props){
        super(props);
        this.state={
            noticeList:[]
        }
    }

    async componentDidMount(){
        const result = await getNotcieInfo()
        this.setState({
            noticeList:result.noticeList
        })
    }

    render() {
        const {noticeList} = this.state
        return (
            <Card>
                <Collapse
                    defaultActiveKey={[1]}

                    >{
                        noticeList&&noticeList.length?noticeList.map((item,index)=>(
                            <Panel header={item.title} key={index+1} extra={<p><span style={{marginRight:10}}>公告发布时间:</span>{moment(item.createDate).format('YYYY-MM-DD hh:mm:ss')}</p>}>
                                <div>{item.description}</div>
                            </Panel>
                        )):null
                    }
                    </Collapse>
            </Card>
        )
    }
}

export default Notice