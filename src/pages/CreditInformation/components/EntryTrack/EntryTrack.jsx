import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {  Table } from '@icedesign/base';
import Req from '../../reqs/CreditInformationReq';
import  './EntryTrack.scss'
import  classNames from  'classnames'
export default class EntryTrack extends Component {
  static displayName = 'EntryTrack';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component :[],
      dataSource: [],
      trackList:[]
    };
  }
  componentDidMount(){
    let {actions} = this.props;
    console.log(this.props)

    Req.getTrackDetail({
      businessId : this.props.params.id,
      isApproveInfo :false
    }).then((res)=>{
      if(res.data && res.code == 200){
        this.setState({
          trackList : res.data.trackList ? res.data.trackList : []
        })
      }else {

      }
    });
  }
  //判断Json是否为kong
  isEmptyObject(e) {
    var t;
    for (t in e)
      return false;
    return true;
  }
  //获取变更字段
  changeFile = (data)=>{
    var list = [];
    if(data.length >0){
      data.map((item)=>{
        list.push( <span key={i}>{item.name}: <i>({item.value})</i></span>)
      })
    }
    return list;
  }
  render() {
    let { trackList } = this.state;
    // console.log(trackList)
    return (
      <div className="part-same part-process info review-detail" id='流程轨迹'>

        <div className="process-action">
          {

            trackList.map((item,index)=>{
              var status = classNames({
                'circle status-red'    : item.choose == 'REJECT',
                'circle status-orange' : item.choose == undefined ,
                'circle status-green'  : item.choose == 'PASS'  ,
                'circle status-gray'   : item.choose == 'BACK'|| item.choose == 'SUBMIT',
              });

              return (
                <div className="item" key={index}>
                  <div className={status}>{item.chooseLable}</div>
                  <div className="status-title"><b>{item.taskName}</b></div>
                  <div className="status-desc">
                    {
                      item.changeFieldsLabel ?
                        item.changeFieldsLabel.split('|').map(el=>{
                            return (<span>{el}</span>)
                          }
                        ) : (<span></span>)
                    }
                    {
                      item.approveMsg ? (<span>审查意见:{item.approveMsg}</span>) :(<span></span>)
                    }
                    {
                      item.loanLabel ? (<span>{item.loanLabel}</span>) :(<span></span>)
                    }

                  </div>

                  <div className="content">
                    <p>办理人:<b>&nbsp;&nbsp;{item.operatorName}</b>（{item.operatorNum}）</p>
                  </div>

                  <div className="content">
                    <p className='time'>时间：{item.approveDate}</p>
                  </div>

                </div>)
            })
          }
        </div>
      </div>

    );
  }
}
