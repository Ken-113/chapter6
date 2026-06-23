import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Header } from "./components/Header/index";
import { Detail } from "./components/Detail/index";
import { Contact } from "./components/Contact/index";

export const App = () => {
  return (
    <div>
      {/* <Header/>コンポーネントは常に表示させたいためRoutesの外に */}
      <Header />

      {/* Linkで設定したパスごとに表示するルーティングの出しわけを行うためのコンポーネント。 */}
      <Routes>
        {/* ルーティングで表示したいコンポーネントとそのパスを設定するコンポーネント。 */}
        <Route path="/" element={<Home />} />

        <Route path="/posts/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};
// React Router 流れ
// ①Linkタグでパスを飛ばす
// ②Routesが選別
// ②Routeで設定したパスに該当するコンポーネントが表示される
