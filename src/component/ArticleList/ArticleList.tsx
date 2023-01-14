import "./articleList.scss";
import OfError from "../Error/Error";
import ServesServer from "../../serves_server";
import Loader from "../Loader/Loader";
import { userActionType } from "../../type/type";
import { format } from "date-fns";
import { useEffect } from "react";
import { useAppSelector } from "../../hook/hook";
import { useDispatch } from "react-redux";
import { Pagination, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const serves = new ServesServer();

const ArticleList: React.FC = () => {
  const navigate = useNavigate();
  const { articleListSummary, page, errors, loading } = useAppSelector(state => state);
  let arrFavoriteArticles: Array<string>;

  const dispatch = useDispatch();
  const userJson = sessionStorage.getItem("user")


  if (userJson) {
    const { username } = JSON.parse(userJson);
    const arrFavoriteArticlesJson = localStorage.getItem(JSON.stringify(username));
    if (arrFavoriteArticlesJson) {
      arrFavoriteArticles = JSON.parse(arrFavoriteArticlesJson);
    }
  }

  const pageJson = sessionStorage.getItem("page")


  if ( pageJson && JSON.parse(pageJson) !== page) {
    dispatch({type: userActionType.pageNum, payload: JSON.parse(pageJson)});
  }
  useEffect(() => {
    dispatch({type: userActionType.dataLoading, payload: true});
    try {
      serves.gettingArticles(page).then((el) => {
        const key = Object.keys(el);
        if (key[0] === "articles") {
          dispatch({type: userActionType.loadingArticle, payload: el.articles});
          dispatch({type: userActionType.dataLoading, payload: false});
        } else {
          message.error(el.body);
        }
      });
    } catch (e) {
      navigate("/error");
    }
  }, [dispatch, navigate, page]);

  const pagination = (val: number): void => {
    dispatch({type: userActionType.pageNum, payload: val});
    sessionStorage.setItem("page", JSON.stringify(val));
  };

  if (errors) {
    return <OfError />;
  }

  if (loading) {
    return <Loader />;
  }

  const favoriteArticle = (favorited: boolean, slug: string, index: number) => {
    if (!userJson) {
      navigate("/sign-in");
      return;
    }
    const { token, username } = JSON.parse(userJson);

    if (favorited) {
      serves.favoriteDeleting(slug, token).then(
        (el) => {
          const newArr = [
            ...articleListSummary.slice(0, index),
            el.article,
            ...articleListSummary.slice(index + 1),
          ];
          dispatch({type: userActionType.changeFavoritedOfArticles, payload: newArr});
        },
        (error) => {
          message.error(error);
        }
      );
      const newArr = arrFavoriteArticles.filter((el: string) => el !== slug);
      localStorage.setItem(JSON.stringify(username), JSON.stringify(newArr));
    } else {
      serves.articleFavorite(slug, token).then(
        (el) => {
          const newArr = [
            ...articleListSummary.slice(0, index),
            el.article,
            ...articleListSummary.slice(index + 1),
          ];
          dispatch({type: userActionType.changeFavoritedOfArticles, payload: newArr});
        },
        (error) => {
          message.error(error);
        }
      );
      arrFavoriteArticles.push(slug);
      localStorage.setItem(
        JSON.stringify(username),
        JSON.stringify(arrFavoriteArticles)
      );
    }
  };
  const item = articleListSummary.map((el, index) => {
    const { title, author, createdAt, favoritesCount, tagList, slug } = el;
    const favorited = arrFavoriteArticles
      ? arrFavoriteArticles.includes(slug)
      : false;
    const styleLaik: string = favorited ? "notLaik" : "laik";
    const avatar = author.image
      ? author.image
      : "https://static.productionready.io/images/smiley-cyrus.jpg";

    const tags = tagList.map((oneTag: string, i: number) => {
      return (
        <div key={`${oneTag}${i + 1}`} className={'teg_list'}>
          {oneTag}
        </div>
      );
    });
    const date = format(new Date(createdAt), "MMMM d, yyyy");

    return (
      <div key={`${slug}${index + 1}`} className={"article-list"}>
        <div className={"content-list_header"}>
          <div className={"article-list_left_header"}>
            <div className={"article-title_container"}>
              <Link to={`/articl/${slug}`} className={"article-title"}>
                {title}
              </Link>
              <input
                value=""
                onClick={() => favoriteArticle(favorited, slug, index)}
                type="submit"
                className={`${styleLaik}`}
              />
              <span>{favoritesCount}</span>
            </div>
            <div className={"content-list_teg"}>{tags}</div>
          </div>
          <div className={"article-list_right_header"}>
            <div className={"author-name"}>
              <h5>{author.username}</h5>
              <div className={"publication-date"}>{date}</div>
            </div>
            <div className={"authors_profile_picture-container"}>
              <img
                src={avatar}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://static.productionready.io/images/smiley-cyrus.jpg";
                }}
                alt="author"
              />
            </div>
          </div>
        </div>
        <div className={"content-list_main"}>
          <div>
            <p>{slug}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>{item}</div>
      <div className={"pagination-container"}>
        <Pagination
          onChange={pagination}
          showSizeChanger={false}
          defaultCurrent={page}
          total={1750}
        />
      </div>
    </div>
  );
}

export default ArticleList;
