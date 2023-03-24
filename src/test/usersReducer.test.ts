import usersReducer, { usersReset, usersFetch } from "../redux/reducers/users";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of User reducer", function () {
  test("User reducer / initial state", function () {
    expect(store.getState().usersReducer.data.length).toBe(0);
  });

  test("User reducer / fatch all", async function () {
    await store.dispatch(usersFetch(""));
    expect(store.getState().usersReducer.data.length).toBeGreaterThan(0);
  });

  test("User reducer / reset", async function () {
    await store.dispatch(usersFetch(""));
    store.dispatch(usersReset());
    expect(store.getState().usersReducer.data.length).toBe(0);
  });
});
