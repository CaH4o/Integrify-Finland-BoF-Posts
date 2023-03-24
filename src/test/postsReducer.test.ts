import postsReducer, {
  postsFetch,
  postPost,
  postsReset,
} from "../redux/reducers/posts";
import { Post } from "../types/Posts";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of Post reducer", function () {
  test("Post reducer / initial state", function () {
    expect(store.getState().postsReducer.data.length).toBe(0);
  });

  test("Post reducer / fatch all", async function () {
    await store.dispatch(postsFetch(""));
    expect(store.getState().postsReducer.data.length).toBeGreaterThan(0);
  });

  test("Post reducer / reset", async function () {
    await store.dispatch(postsFetch(""));
    store.dispatch(postsReset());
    expect(store.getState().postsReducer.data.length).toBe(0);
  });

  test("Post reducer / post", async function () {
    await store.dispatch(postsFetch(""));
    const postsLengthBefor = store.getState().postsReducer.data.length;
    const post: Post = { userId: 1, id: 0, title: "", body: "" };
    await store.dispatch(postPost(post));
    const postsLengthfter = store.getState().postsReducer.data.length;
    expect(postsLengthfter).toBe(postsLengthBefor + 1);
  });
});
