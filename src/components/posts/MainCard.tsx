import React from "react";

import { QueryPost } from "../../types/Queries";

export default function MainCard(post: QueryPost): JSX.Element {
  return (
    <div>
      <p>{`Title:${post.title}; User:${post.user.username}; Comments:${post.countComments}.`}</p>
    </div>
  );
}
