/* useParamsという関数を利用することで、パラメータを取得することが可能になる。 */
import { useParams } from "react-router-dom";
import classes from "./Detail.module.css";
import { posts } from "../../data/posts";

export const Detail = () => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === Number(id));
  if (!post) return <div>記事が見つかりませんでした。</div>;

  return (
    <div className={classes.container}>
      <div className={classes.post}>
        <div className={classes.postImage}>
          <img src={post.thumbnailUrl} />
        </div>
        <div className={post.postContent}>
          <div className={classes.postInfo}>
            <div className={classes.postDate}>
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className={classes.postCategories}>
              {post.categories.map((category, id) => {
                return (
                  <p key={id} className={classes.postCategory}>
                    {category}
                  </p>
                );
              })}
            </div>
          </div>
          <p className={classes.postTitle}>{post.title}</p>
          <div
            className={classes.postBody}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};
