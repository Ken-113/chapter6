/* useParamsという関数を利用することで、パラメータを取得することが可能になる。React Routerの機能 idの部分 */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Detail.module.css";

export const Detail = () => {
  const { id } = useParams();
  // なぜ[]ではなくnullなのか
  // Homeでは複数あるから配列[]Detailは記事が1件のためnull
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      // ${id}によってhttps://.../posts/3などになる
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`,
      );
      const { post } = await res.json();
      setPost(post);
      setLoading(false);
    };

    fetcher();
  }, [id]);

  if (loading) return <div className={classes.postLoading}>読み込み中...</div>;
  // 記事が存在しない場合、postがnullまたはundefinedの場合
  if (!post) <div className={classes.postError}>記事が見つかりませんでした。</div>;

  // ローカルでの場合
  // const post = posts.find((post) => post.id === Number(id));
  // if (!post) return <div>記事が見つかりませんでした。</div>;

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
