import commentsReducer, {
    commentsReset, commentDelete, commentsFetch, commentPost, commentDeleteThunk
} from "../redux/reducers/comments";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of Comment reducer", function () {
  test("Comment reducer / initial state", function () {
    expect(store.getState().commentsReducer.data.length).toBe(0);
  });

  test("Comment reducer / fatchAll", function () {
    store.dispatch(commentsFetch(""));
    expect(store.getState().commentsReducer.data.length).toBeGreaterThan(0);
  });
});
