import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import ServesServer from "../../serves_server";
import { userActionType, useCreateArticleFormType, UserSessionStorageType } from "../../type/type";
import { useAppSelector } from "../../hook/hook";
import Authorization from "../Authorization";

import "./createNewArticle.scss";

const serves = new ServesServer();

const  CreateNewArticle: React.FC = () => {
  const navigate = useNavigate();
  const { tagsInput, keyTagsNewArticle, page, detailsSelectedArticle } =
    useAppSelector((state) => state);
  const dispatch = useDispatch();
  const { id: editingArticle } = useParams();

  const nameComponent = editingArticle ? "Edit article" : "Create new article";
  const title = editingArticle ? detailsSelectedArticle.title : "";
  const description = editingArticle ? detailsSelectedArticle.description : "";
  const body = editingArticle ? detailsSelectedArticle.body : "";
  const { slug } = detailsSelectedArticle;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<useCreateArticleFormType>({
    mode: "onBlur",
  });

  const userJson = sessionStorage.getItem("user");
  let user: UserSessionStorageType;
  if (!userJson) {
    return <Authorization />;
  } else {
    user = JSON.parse(userJson);
  }

  const submitArticle = handleSubmit((e) => {
    const { token } = user;
    const tags: Array<string |number> = [];
    tagsInput.map((el) => tags.push(Object.values(el)[0]));
    const date = {
      article: {
        title: e.title,
        description: e.description,
        body: e.body,
        tagList: tags,
      },
    };
    if (!editingArticle) {
      serves.articlePublication(date, token).then(() => message.success("article successfully publication!!!"))
      .catch(() => navigate('/error'));
    }
    if (editingArticle) {
      serves.articleEditing(date, token, slug).then(() => message.success("article successfully edited!!!"))
      .catch(() => navigate('/error'));
    }
    
    reset();
    dispatch({ type: userActionType.generatedTagsForNewPost, payload: [{ [keyTagsNewArticle]: "" }]});
    navigate('/articl');
    try {
      dispatch({ type: userActionType.loadingArticle, payload: 0 });
      serves.gettingArticles(page).then((el) => {
        dispatch({ type: userActionType.loadingArticle, payload: el.articles });
      });
    } catch (er) {
      navigate('/error');
    }
  })

  const deleteTeg = (key: number) => {
    const newArr = [...tagsInput.slice(0, key), ...tagsInput.slice(key + 1)];
    dispatch({ type: userActionType.generatedTagsForNewPost, payload: newArr});
  };

  const item = tagsInput.map((el, index) => {

    const key = Object.keys(el);
    const keyOfArr = key[0]

    return (
      <div key={`${index + 1}`} className={"form-one-tag"}>
        <input
           {...register(`teg ${key}`, {
            required: true,
          })}
          className={'form-one-tag_input-text'}
          type="text"
          defaultValue={el.key}
          onChange={(e) => {
            const newArr = [...tagsInput.slice(0, index), { [keyOfArr]: e.target.value }, ...tagsInput.slice(index + 1)];
            dispatch({ type: userActionType.generatedTagsForNewPost, payload: newArr});
          }}
        />
        <button
          onClick={() => deleteTeg(index)}
          className={"form-one-tag_delete"}
          type="button"
        >
          Delete
        </button>
      </div>
    );
  });

  const addTeg: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const newArr = [...tagsInput, { [keyTagsNewArticle]: "" }];
    dispatch({ type: userActionType.generatedTagsForNewPost, payload: newArr});
  };

  return (
    <main className={"createNewArticle-list"}>
      <div className={"title"}>
        <h3>{nameComponent}</h3>
      </div>
      <form onSubmit={submitArticle}>
        <label htmlFor="titleCreateArticl">Title</label>
        <input
          {...register("title", {
            required: "Введите заголовок",
            minLength: {
              value: 3,
              message: "минимальная длинна заголовка 3 символа",
            },
            maxLength: {
              value: 20,
              message: "максимальная длинна заголовка 20 символов",
            },
          })}
          id="titleCreateArticl"
          defaultValue={title}
          type="text"
          placeholder="Title"
        />
        <div>
          {errors?.title && <p>{errors?.title?.message || "Error!"}</p>}
        </div>
        <label htmlFor="shortDescriptionCreateArticl">Short description</label>
        <input
          {...register("description", {
            required: "Введите краткое описания",
            minLength: {
              value: 3,
              message: "минимальная длинна описания 3 символа",
            },
            maxLength: {
              value: 40,
              message: "максимальная длинна описания 40 символов",
            },
          })}
          id="shortDescriptionCreateArticl"
          defaultValue={description}
          type="text"
          placeholder="Short description"
        />
        <div>
          {errors?.description && (
            <p>{errors?.description?.message || "Error!"}</p>
          )}
        </div>
        <label htmlFor="textareaCreateArticle">Text</label>
        <textarea
          {...register("body", {
            required: "Введите текст",
            minLength: {
              value: 20,
              message: "минимальная длинна текста 20 символов",
            },
          })}
          id="textareaCreateArticle"
          defaultValue={body}
          placeholder="Text"
          rows={6}
        />
        <div>{errors?.body && <p>{errors?.body?.message || "Error!"}</p>}</div>
        <label>Tags</label>
        <div className={"tag-conteiner"}>
          <div>{item}</div>
          <button
            onClick={addTeg}
            className={"form-one-tag_add-teg"}
            type="submit"
          >
            Add teg
          </button>
        </div>
        <input
          className={"createNewArticle-list_send"}
          type="submit"
          value="Send"
        />
      </form>
    </main>
  );
}

export default CreateNewArticle;
