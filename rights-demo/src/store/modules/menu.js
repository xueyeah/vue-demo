import Vue from "vue";

const menu = {
  state : {
    routes: [],
    sessions: {},
    hrs: [],
    currentSession: null,
    currentHr: JSON.parse(window.sessionStorage.getItem("user")),
    filterKey: '',
    stomp: null,
    isDot: {}
  },

  mutations : {
    INIT_CURRENTHR(state, hr) {
      state.currentHr = hr;
    },
    initRoutes(state, data) {
      state.routes = data;
    },
    changeCurrentSession(state, currentSession) {
      Vue.set(state.isDot, state.currentHr.username + '#' + currentSession.username, false);
      state.currentSession = currentSession;
    },
    addMessage(state, msg) {
      let mss = state.sessions[state.currentHr.username + '#' + msg.to];
      if (!mss) {
        // state.sessions[state.currentHr.username+'#'+msg.to] = [];
        Vue.set(state.sessions, state.currentHr.username + '#' + msg.to, []);
      }
      state.sessions[state.currentHr.username + '#' + msg.to].push({
        content: msg.content,
        date: new Date(),
        self: !msg.notSelf
      })
    },
    INIT_DATA(state) {
      //浏览器本地的历史聊天记录可以在这里完成
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    INIT_HR(state, data) {
      state.hrs = data;
    }
  }
}
export default menu

