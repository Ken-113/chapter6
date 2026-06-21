import { posts } from "../../data/posts";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <ul className={classes.container}>
        {posts.map((post) => {
          return (
            <li key={post.id} className={classes.list}>
              {/*Link= HTMLのaタグ。to=""で飛ばすパスを設定するコンポーネント。 */}
              <Link to={`/posts/${post.id}`} className={classes.link}>
                <div className={classes.post}>
                  <div className={classes.postContent}>
                    <div className={classes.postInfo}>
                      <div className={classes.postDate}>
                        {/* new Dateは文字列や数値をDateオブジェクトに変換、toDateStringはyyyy/mm/ddに変換 */}
                        {new Date(post.createdAt).toDateString()}
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
                    ></div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
