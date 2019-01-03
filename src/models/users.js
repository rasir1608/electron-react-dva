export default {
  namespace: 'user',

  state: {
    currentUser: {
      userName: '未登录',
      role: 'admin',
      roleList: [],
    },
    noticeList: [],
  },

  effects: {},

  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    appendNotice(state, { payload }) {
      const { noticeList } = state;
      return {
        ...state,
        noticeList: [...noticeList, ...payload],
      };
    },
  },
};
