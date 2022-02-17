import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import feeds from "src/store/feeds";
import user from "src/store/user"

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      feeds,
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
