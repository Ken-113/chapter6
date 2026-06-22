// import { posts } from "../../data/posts";importはローカルでの使用のため不要になって→で定義するconst [posts, setPosts] = useState([]);
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
// useEffect副作用を扱うフック 主にAPI通信、タイマー、イベント登録など
import  { useEffect, useState } from "react";

export const Home = () => {
  // const [値, 更新関数] = useState(初期値);空の配列を入れる、API取得後posts = data.postsになる
  const [posts, setPosts] = useState([]);
  // loading用State 読み込み中かどうか管理
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // API取得には時間がかかる、サーバーへ送信→待つ結果が返る なのでasyncが必要
    const fetcher = async () => {
      // trueのため読み込み中の画面になる、API取得開始
      setLoading(true);
      // API取得 fetchはAPIへリクエストを送る関数 awaitは通信完了まで待機
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts",
      );
      // 返ってきたJSONをJSのオブジェクトに変換
      const data = await res.json();
      // 取得した記事一覧をstateに保存、API取得完了
      setPosts(data.posts);
      // falseのため読み込みが終了
      setLoading(false);
    };
    // 実行
    fetcher();
    // 依存配列[]を空にすることで初回表示のみ実行となる、もし[posts]の場合postsが変わるたびに実行
  }, []);
  // loading trueの場合実行される
  if (loading) return <div className={classes.postLoading}>読み込み中...</div>;

  // 全体の流れ  Home表示→useEffect実行→fetcher実行→loading=true→API通信→JSON変換 postsに保存→loading=false→再レンダリング→記事一覧表示

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
