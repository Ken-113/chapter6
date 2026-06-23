// useFormを使える
import { useForm } from "react-hook-form";
import classes from "./Contact.module.css";

export const Contact = () => {
  const {
    // 入力欄をfromに登録する関数
    register,
    // 送信時にバリデーションを行う関数
    handleSubmit,
    // errors=バリデーションエラー情報 isSubmitting=送信中かどうかを切り替える
    formState: { errors, isSubmitting },
    // フォームを初期状態に戻す reset()を実行すると名前、メール、本文が空になる
    reset,
    // 入力値管理、バリデーション、エラー表示送信処理、リセットなどをまとめて管理できる
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        // 問い合わせ送信用API
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        // サーバーに送る設定
        {
          //   データ送信
          method: "POST",
          //   サーバーにjson形式で送る
          headers: { "Content-Type": "application/json" },
          //   入力データをjsonに変換
          body: JSON.stringify(data),
        },
      );
      //   サーバーから帰ってきたデータをJSのオブジェクトに変換
      const result = await res.json();
      //   開発者ツールに表示
      console.log("送信できました！", result);
      //   ブラウザに表示
      alert("送信しました！");
      //   入力内容を空にする
      reset();
      //   通信失敗時に実行される ネット接続なし、サーバーダウンなど
    } catch (err) {
      console.log("送信エラー", err);
      alert("送信エラー");
    }
  };

  const handleReset = () => reset();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>問合わせフォーム</h1>
      {/* 送信ボタンを押下→バリデーション→成功→→onSubmit実行 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formRow}>
          <label htmlFor="name" className={classes.label}>
            お名前
          </label>
          <div className={classes.inputWrapper}>
            <input
              id="name"
              name="name"
              type="text"
              className={classes.input}
              //   この入力欄はnameとreact-hook-fromに伝える
              {...register("name", {
                // 必須入力 未入力の場合お名前は必須ですと表示
                required: "お名前は必須です。",
                // 最大文字数が30文字まで
                maxLength: {
                  value: 30,
                  //   31文字以上なら下記を表示
                  message: "名前は30文字以内にしてください。",
                },
              })}
            />
            {/* ?.(オプショナルチェーン)nameがあればmassage取得、なければundefinedでお名前は必須ですの表示 */}
            <p className={classes.error}>{errors.name?.message}</p>
          </div>
        </div>
        <div className={classes.formRow}>
          <label htmlFor="email" className={classes.label}>
            メールアドレス
          </label>
          <div className={classes.inputWrapper}>
            <input
              id="email"
              name="email"
              type="email"
              className={classes.input}
              {...register("email", {
                required: "メールアドレスは必須です。",
                pattern: {
                  value:
                //   入力された文字がメールアドレスの形式かチェック
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                  message: "正しいメールアドレスを入力してください。",
                },
              })}
            />
            <p className={classes.error}>{errors.email?.message}</p>
          </div>
        </div>

        <div className={classes.formRow}>
          <label htmlFor="message" className={classes.label}>
            本文
          </label>
          <div className={classes.inputWrapper}>
            <input
              id="message"
              name="message"
              type="text"
              className={classes.textarea}
              {...register("message", {
                required: "本文は必須です。",
                maxLength: {
                  value: 500,
                  message: "本文は500文字以内にしてください。",
                },
              })}
            />
            <p className={classes.error}>{errors.message?.message}</p>
          </div>
        </div>

        <div className={classes.buttonArea}>
          <button type="submit" className={classes.submitButton}>
            {/* if文の代わり 条件 ? 真の場合 : 偽の場合 */}
            {isSubmitting ? "送信中..." : "送信"}
          </button>
          <button
            //   クリックするとhandleReset実行、reset()と同じで名前、メール、本文を空にする
            onClick={handleReset}
            className={classes.clearButton}
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
};
