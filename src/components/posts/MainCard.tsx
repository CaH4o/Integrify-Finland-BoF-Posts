import { PropPostsCard } from "../../types/Props";

export default function MainCard(post: PropPostsCard): JSX.Element {
  return (
    <div>
      <p>{`Title:${post.title}; User:${post.user.username}; Comments:${post.countComments}.`}</p>
    </div>
  );
}
