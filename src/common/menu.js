import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '用户管理',
    path: 'user',
    hideChildren: true,
    children: [
      {
        name: '我的',
        path: 'mine',
      },
      {
        name: '登录',
        path: 'signin',
      },
      {
        name: '注册',
        path: 'signup',
      },
    ],
  },
  {
    name: '笔记分类',
    path: 'category',
    index: 'categoryList',
    children: [
      {
        name: '分类列表',
        path: 'categoryList',
      },
      {
        name: '笔记列表',
        path: 'logList/:categoryId',
      },
      {
        name: '笔记详情',
        path: 'logDetail/:logId',
      },
    ],
  },
  {
    name: '异常页',
    path: 'exception',
    hideInMenu: true,
    children: [
      {
        name: '401',
        path: '401',
      },
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);

export function getFlatMenuData(menuList) {
  const menus = menuList || getMenuData();
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}
