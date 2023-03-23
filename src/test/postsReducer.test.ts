import postsReducer, {
  postsFetch, postPost, postsReset
} from "../redux/reducers/posts";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of Post reducer", function () {
  test("Post reducer / initial state", function () {
    expect(store.getState().postsReducer.data.length).toBe(0);
  });

  test("Post reducer / fatch all", function () {
    store.dispatch(postsFetch(""));
    expect(store.getState().postsReducer.data.length).toBeGreaterThan(0);
  });

  test("Post reducer / reset", function () {
    store.dispatch(postsFetch(""));
    store.dispatch(postsReset());
    expect(store.getState().postsReducer.data.length).toBe(0);
  });
});
