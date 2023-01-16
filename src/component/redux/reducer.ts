import { InitialStateType, userActionType, ActionType } from "../../type/type";

const initState: InitialStateType = {
  authorizationData: '',
  slugs: '',
  errors: false,
  loading: true,
  detailsSelectedArticle: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [
      ''
    ],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false
    }
  },
  page: 1,
  articleListSummary: [{
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [
      ''
    ],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false
    }
  }],
  errorAuthorization: false,
  tagsInput: [{ 0: '' }],
  keyTagsNewArticle: 10,
};

const reducer = (state = initState, action: ActionType ): InitialStateType => {
  switch (action.type) {
    case userActionType.authorizationData:
      return {...state, authorizationData: action.payload}
    case userActionType.detailsSelectedArticle:
      return {...state, detailsSelectedArticle: action.payload}
    case userActionType.dataLoading:
      return {...state, loading: action.payload}
    case userActionType.loadingArticle:
      return { ...state, articleListSummary: action.payload };
    case userActionType.changeFavoritedOfArticles:
      return { ...state, articleListSummary: action.payload };
    case userActionType.pageNum:
      return { ...state, page: action.payload };
    case userActionType.slugs:
      return { ...state, slugs: action.payload };
    case userActionType.successfulAuthorization:
      return { ...state, errorAuthorization: action.payload };
    case userActionType.generatedTagsForNewPost:
      return { ...state, keyTagsNewArticle: state.keyTagsNewArticle + 1, tagsInput: action.payload };
    default:
      return state;
  }
}

export default reducer;
