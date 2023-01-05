import { Dispatch, SetStateAction } from "react";

import { QueryPosts } from "../../types/Queries";

type Prop = { setPosts: Dispatch<SetStateAction<QueryPosts>> };

export default function MainSrearch(prop: Prop): JSX.Element {
  return <div>Srearch</div>;
}
