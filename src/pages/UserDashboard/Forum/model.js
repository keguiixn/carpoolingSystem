import {getForumInfo,getCommentInfo} from './service'

export default {

  namespace: 'forumInfo',

  state: {
    forumList:[],
    commentsList:[]
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
    *fetchcommentInfo(action, { call, put }) {
      const result = yield call(getCommentInfo,action.payload)
      yield put({type:"updateState", payload: result})
    },
  }

};