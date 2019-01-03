import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /elog-ctrl/admin/checkLogin': (req, res) => {
    res.send({
      succ: 'ok',
      result: {
        userName: '80002790',
      },
    });
  },
    'GET /elog-ctrl/admin/getNotice': (req, res) => {
      const noticeList = [];
      const randListLen = Math.floor(Math.random()*20);
      for(let i = 0; i < randListLen; i += 1) {
        noticeList.push({
          modelId:i+1,
          moduleStatus:Math.random > 0.3 ? 'error':'success',
        });
      }
      res.send({
        succ: 'ok',
        result: {
           noticeList,
        },
      });
    // res.send({
    //   "msg": "to login",
    //   "result": {
    //     "redirect": "http://cas.sit.sf-express.com/cas/login?service=http%3A%2F%2F10.118.40.8%3A8080%2Fadmin%2Flogin"
    //   },
    //   "succ": "jump"
    // });
  },

  'GET /elog-ctrl/admin/logout': (req, res) => {
    // res.send({
    //   succ: 'ok',
    //   result: {
    //     userName: '80002790',
    //   },
    // });
    res.send({
      "msg": "to login",
      "result": {
        "logout": "http://cas.sit.sf-express.com/cas/logout?service=http%3A%2F%2F10.118.40.8%3A8080%2Fadmin%2Flogin",
        "login": "http://cas.sit.sf-express.com/cas/login?service=http%3A%2F%2F10.118.40.8%3A8080%2Fadmin%2Flogin"
      },
      "succ": "logout"
    });
  },

  'GET /elog-ctrl/model/copy': (req, res) => {
    res.send({
      succ: 'ok',
      result: 'ok',
    });
  },

  'POST /elog-ctrl/model': (req, res) => {
    res.send({
      succ: 'ok',
    });
  },
  'POST /elog-ctrl/model/remove': (req, res) => {
    res.send({
      succ: 'ok',
    });
  },

  'GET /elog-ctrl/model/checkName': (req, res) => {
    res.send({ succ: 'ok', result: 'ok', errMsg: '模型名称重复' });
  },

  'GET /elog-ctrl/model/list': (req, res) => {
    const list = [];
    for (let i = 0; i < 50; i += 1) {
      list.push({
        "completeTm": "2018-06-26 15:08:06",
        "duration": Math.floor(Math.random() * 5000),
        "errMsg": "测试内容44v6",
        "startTm": "2018-06-26 15:08:06",
        "createBy": "test",
        "createTm": "2018-06-26 15:08:06",
        "id": i + 1,
        "modelName": "模型" + i,
        "modelStatus": [10, 30, 31, 40][Math.floor(Math.random() * 4)],
        "modelType": Math.random() > 0.2 ? 1 : 2,
        "mark": Math.random() > 0.2 ? 1 : 2,
        "projectId": 3,
        "updateBy": "test",
        "updateTm": "2018-09-26 15:08:06"
      });
    }
    res.send({
      "msg": "",
      "result": {
        list,
        "nextPage": 0,
        "pageNum": 1,
        "pageSize": 2,
        "pages": 1,
        "prePage": 0,
        "size": 2,
        "startRow": 0,
        "total": 200
      },
      "succ": "ok"
    })
  },

  // 支持值为 Object 和 Array
  'GET /elog-ctrl/project/list': (req, res) => {
    const list = [];
    for (let i = 0; i < 50; i += 1) {
      list.push(
        {
          "mark": Math.random() > 0.2 ? 1 : 2,
          "createBy": "test",
          "createTm": "2018-09-26 14:07:37",
          "id": i + 1,
          "modelCount": Math.floor(Math.random() * 100),
          "projectName": "project10" + i,
          "updateBy": "test",
          "updateTm": "2018-09-26 14:07:37"
        },
      );
    }
    res.send({
      "msg": "",
      "result": {
        list,
        "pageNum": 1,
        "pageSize": 2,
        "pages": 1,
        "prePage": 0,
        "size": 2,
        "startRow": 0,
        "total": 200
      },
      "succ": "ok"
    });
  },
  'POST /elog-ctrl/project/add': (req, res) => {
    res.send({
      "msg": '项目重名',
      "result": {
        "id": 10
      },
      "succ": "fail"
    });
  },
  'POST /elog-ctrl/project/delete': (req, res) => {
    res.send({
      succ: 'ok',
    });
  },
  'GET /elog-ctrl/project/update': (req, res) => {
    res.send({
      "msg": '项目重名',
      "result": '',
      "succ": "ok"
    });
  },
};
export default (noProxy ? {} : delay(proxy, 1000));
