import {getCarPoolingInfo} from './service'

export default {

  namespace: 'carPoolingInfo',

  state: {
    carpoolinformationList:[]
  },

  reducers: {
    updateState(state, action) {
      return {  ...state,...action.payload };
    },
  },

  effects: {
    *fetchCarPoolingInfo(action, { call, put }) {
      const result = yield call(getCarPoolingInfo)
      yield put({type:"updateState", payload: result})
    },
  }

};