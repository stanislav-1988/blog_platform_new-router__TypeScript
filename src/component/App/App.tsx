import { Routes, Route } from "react-router-dom";

import Header from "../Header";
import Authorization from "../Authorization";
import CreateNewArticle from "../CreateNewArticle";
import Registration from "../Registration";
import EditProfile from "../EitProfile";
import ArticleList from "../ArticleList";
import Article from "../Article";
import OfError from "../Error/Error";


import "./app.scss";

const App: React.FC = () => {
  return (
    <div className={"body"}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ArticleList />} />
          <Route path="sign-in" element={<Authorization />} />
          <Route path="sign-up" element={<Registration />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="new-article" element={<CreateNewArticle />} />
          <Route path="articl" element={<ArticleList />} />
          <Route path="articl/:id" element={<Article />}/>
          <Route path="articl/:id/edit" element={<CreateNewArticle />}/>
          <Route path="error" element={<OfError />} />
          <Route path="*" element={<ArticleList />} />
        </Route>       
      </Routes>
    </div>
  );
}

export default App;
