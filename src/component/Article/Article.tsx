import "./article.scss";
import ServesServer from "../../serves_server";
import Loader from "../Loader/Loader";
import ReactMarkdown from "react-markdown";
import { userActionType, UserSessionStorageType, TagsInput } from "../../type/type";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom";
import { message, Popconfirm } from "antd";
import { useAppSelector } from "../../hook/hook";

const serves = new ServesServer();

const Article: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { detailsSelectedArticle } = useAppSelector(state => state);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: userActionType.slugs, payload: ''});
    try {
      if (id) {
        serves.gettingOneArticles(id).then(
        (el) => {
          dispatch({type: userActionType.detailsSelectedArticle, payload: el.article});
        },
        (error) => {
          message.error(error);
        }
      );
      }
      
    } catch (e) {
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!detailsSelectedArticle.author.username) {
    return <Loader />;
  }

  const userJson = sessionStorage.getItem("user");
  let arrFavoriteArticles:Array<string> = [];
  let user: UserSessionStorageType;
  let articleOwnershipCheck = "none";

  const favoriteArticle = () => {
    if (!userJson) {
      navigate("/sign-in");
      return;
    }

    const { token, username } = JSON.parse(userJson);

    if (favorited) {
      serves.favoriteDeleting(slug, token).then(
        (el) => {
          dispatch({type: userActionType.slugs, payload: el.article});
        },
        (error) => {
          message.error(error);
        }
      );
      const newArr = arrFavoriteArticles.filter((el) => el !== slug);
      localStorage.setItem(JSON.stringify(username), JSON.stringify(newArr));
    } else {
      serves.articleFavorite(slug, token).then(
        (el) => {
          dispatch({type: userActionType.slugs, payload: el.article});
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

  if (userJson) {
    user = JSON.parse(userJson);
    articleOwnershipCheck = detailsSelectedArticle.author.username === user.username? "" :  "none";
    const { username } = JSON.parse(userJson);
    const nameAuthorizationUser = localStorage.getItem(JSON.stringify(username))
    if (nameAuthorizationUser) {
      arrFavoriteArticles = JSON.parse(nameAuthorizationUser);
    }
  }
    
    const { slug } = detailsSelectedArticle;
  const favorited = arrFavoriteArticles
    ? arrFavoriteArticles.includes(slug)
    : false;
  const styleLaic = favorited ? "laik" : "notLaik";

  const confirmDeletionArticle = () => {
    message.success("Click on Yes");
    if (id) {
      serves.articleDeleting(id, user.token).then(
      () => {
        message.success("article deleted successfully!!!");
      },
      (error) => {
        message.error(error);
        navigate("/error");
      }
    );
    navigate("/articl");
    }
  };

  const { favoritesCount } = detailsSelectedArticle;

  const defaultAvatar: React.ReactEventHandler<HTMLImageElement>  = (e) => {
    console.log(e)
    e.currentTarget.src =
      "https://static.productionready.io/images/smiley-cyrus.jpg";
  }

  const arrayTagsLoadedArticle = () => {
    const newArr: TagsInput[]  = [];
    detailsSelectedArticle.tagList.forEach((tag: string, index: number) => {
      newArr.push({ [index]: tag });
    });
    dispatch({type: userActionType.generatedTagsForNewPost, payload: newArr});
  };

  const tags = detailsSelectedArticle.tagList.map((oneTag, index) => {
    return (
      <div key={`${oneTag}${index + 1}`} className={"teg_list"}>
        {oneTag}
      </div>
    );
  });

  const date = format(
    new Date(detailsSelectedArticle.createdAt),
    "MMMM d, yyyy"
  );

  return (
    <div className={"article-detail"}>
      <div className={"content-list_header"}>
        <div className={"article-list_left_header"}>
          <div className={"article-title_container"}>
            <h5 className={"article-title"}>{detailsSelectedArticle.title}</h5>
            <input
              value=""
              onClick={favoriteArticle}
              type="submit"
              className={`${styleLaic}`}
            />
            <span>{favoritesCount}</span>
          </div>
          <div className={"content-list_teg"}>{tags}</div>
        </div>
        <div className={"article-list_right_header"}>
          <div className={"author-name"}>
            <h5>{detailsSelectedArticle.author.username}</h5>
            <div className={"publication-date"}>{date}</div>
          </div>
          <div className={"authors_profile_picture-container"}>
            <img
              src={detailsSelectedArticle.author.image}
              onError={defaultAvatar}
              alt="author"
            />
          </div>
        </div>
      </div>
      <div className={"content-list_main"}>
        <div className={"slug-article"}>
          <p>{detailsSelectedArticle.slug}</p>
        </div>
        <div
          style={{display: articleOwnershipCheck}}
          className={"button-article"}
        >
          <Popconfirm
            title="Are you sure to delete this task?"
            placement="rightTop"
            onConfirm={confirmDeletionArticle}
            okText="Yes"
            cancelText="No"
          >
            <button className={"button-delete-article"} type="button">
              Delete
            </button>
          </Popconfirm>
          <Link
            onClick={arrayTagsLoadedArticle}
            to={`/articl/${detailsSelectedArticle.slug}/edit`}
            className={"link-edit-article"}
          >
            Edit
          </Link>
        </div>
      </div>
      <div className={"article-detail-content"}>
        <ReactMarkdown>{detailsSelectedArticle.body}</ReactMarkdown>
      </div>
    </div>
  );
  }


export default Article;
