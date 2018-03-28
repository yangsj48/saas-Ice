import axios from 'axios';
import BaseConfig from '../../config/BaseConfig'
import Cookie from '../utils/Cookie'
import Storage from '../utils/Storage'
import Tools from '../utils/Tools'

class BaseReq {

  constructor() {
    this._host = BaseConfig.HOST; //接口地址
    this._pageSize = BaseConfig.PAGESIZE; //分页大小
  }

  fetchData(options) {
    var header = {};

    if (Cookie.get('SID')) {
      header['userToken'] = Cookie.get('SID');
    } else {
      let token = Tools._GET('SID');
      if (token) {
        header['userToken'] = token.SID;
        Cookie.set('SID', token.SID);
      }
    }

    if (typeof options.processData == 'undefined') {
      options.processData = true;
    }

    if ('contentType' in options) {
      if (options.contentType != 'multipart/form-data') {
        header['Content-type'] = options.contentType
      }
    } else {
      header['Content-type'] = 'application/json';
    }

    return axios(options.url, {
        method: options.method || 'GET',
        headers: header,
        data: options.data,
        params: options.params,
      })
      .then(this._processResponse)
      // .then(this._processData)
      .catch((error) => {
        console.error('request failed', error)
        this._processError(error);
      })
  }

  _processHost(url, isJava) {
    return (isJava ? Config.JAVA_HOST : Config.PHP_HOST) + url;
  }

  _processOptions(options) {
    if (typeof options == 'string') {
      let url = options;
      options = {};
      options.url = url;
    }
    return options;
  }

  /**
   * 处理接口响应，当接口响应错误只记录日志不继续处理
   */
  _processResponse2(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      var error = new Error('接口异常')
      error.response = response
      throw error;
    }
  }

  /**
   * 处理数据正确性，数据验证错误抛出异常
   */
  _processData(data) {
    if (data.code == 200) {
      return data;
    } else if (data.status == 401) {
      return;
    } else {
      var error = new Error(data.message || '接口逻辑错误');
      error.data = data;
      throw error;
    }
  }

  /**
   * 约定接口统一返回格式，约定只有200正确
   * {
   *   code: 200|400|...,
   *   data: {},
   *   msg: ''
   * }
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  _processResponse(res) {
    console.log('_processResponse', res);

    if (!res.data) {
      return {
        code: 400,
        msg: '响应格式数据不正确'
      };
    }

    if (res.data.code == 200) {
      // 请求成功响应格式
      // res.data = {
      //   code: 200,
      //   data: {},
      //   msg: ''
      // }
      return res.data;
    } else {
      // 请求成功响应，但响应数据格式不正确，直接提示响应的消息
      // Message({
      //   message: res.data.msg || '未知错误',
      //   type: 'error',
      //   duration: 5 * 1000
      // });
      alert(res.data.msg || res.data.message || '未知错误');
      return res.data;
    }

  }

  _processError(error) {
    console.log('_processError', error);

    let res = error.response;

    if (res.status == 401) {
      // TODO 跳转到登录页
      Message({
        message: 'Unauthorized未登录',
        type: 'error',
        duration: 5 * 1000
      });
      location.href = '/account';
      return { status: 401, msg: 'Unauthorized未登录', data: { code: 401 } };
    }

    let msg = 'RES_MESSAGE';

    if (res.data && res.data.message) {
      //接口返回错误格式
      // {
      //   error: "Internal Server Error",
      //   exception: "org.apache.shiro.UnavailableSecurityManagerException",
      //   message: "No SecurityManager accessible to the calling code, either bound to the org.apache.shiro.util.ThreadContext or as a vm static singleton.  This is an invalid application configuration.",
      //   path: "/crm/login",
      //   status: 500,
      //   timestamp: 1521861550469
      // }
      msg = res.data.status + ' ' + res.data.message;
    }

    if (res.status == 0) {
      // 接口发起成功但没收到响应，一般请求超时
      msg = '请求超时，请重试';
    }

    // 异常状态下，把错误信息返回去
    return {
      code: -404,
      msg: msg
    }
  }
}

export default BaseReq;
