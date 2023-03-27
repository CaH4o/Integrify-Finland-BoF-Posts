import commentsReducer, {
  commentsReset,
  commentDelete,
  commentsFetch,
  commentPost,
  commentDeleteThunk,
} from "../redux/reducers/comments";
import { Comment } from "../types/Comments";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of Comment reducer", function () {
  test("Comment reducer / initial state", function () {
    expect(store.getState().commentsReducer.data.length).toBe(0);
  });

  test("Comment reducer / fatch all", async function () {
    await store.dispatch(commentsFetch(""));
    expect(store.getState().commentsReducer.data.length).toBeGreaterThan(0);
  });

  test("Comment reducer / reset", async function () {
    await store.dispatch(commentsFetch(""));
    store.dispatch(commentsReset());
    expect(store.getState().commentsReducer.data.length).toBe(0);
  });

   test("Comment reducer / post", async function () {
    await store.dispatch(commentsFetch(""));
    const commentsLengthBefor = store.getState().commentsReducer.data.length;
    const comment: Comment = { 
      id: 0,
      postId: 0,
      body: "",
      email: "",
      name: "", };
    await store.dispatch(commentPost(comment));
    const commentsLengthfter = store.getState().commentsReducer.data.length;
    expect(commentsLengthfter).toBe(commentsLengthBefor + 1);
  });

  test("Comment reducer / delete", async function () {
    // 
    await store.dispatch(commentsFetch(""));
    const commentsLengthBefor = store.getState().commentsReducer.data.length;
    const comment: Comment = store.getState().commentsReducer.data[0];   
    await store.dispatch(commentDeleteThunk(comment.id.toString()));
    store.dispatch(commentDelete(comment));
    const commentsLengthfter = store.getState().commentsReducer.data.length;
    expect(commentsLengthfter).toBe(commentsLengthBefor - 1);
  });
});
