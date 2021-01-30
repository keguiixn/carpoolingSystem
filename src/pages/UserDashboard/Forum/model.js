import {getForumInfo} from './service'

export default {

  namespace: 'forumInfo',

  state: {
    forumList:[]
  },

  reducers: {
    updateState(state, action) {
      return {  ...state,...action.payload };
    },
  },

  effects: {
    *fetchforumInfo(action, { call, put }) {
      const result = yield call(getForumInfo)
      yield put({type:"updateState", payload: result})
    },
  }

};