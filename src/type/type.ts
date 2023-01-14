
export type RegistrationDate = {
   user: {
      username: string | number,
      email: string,
      password: string | number,
    }
}

export type RegistrationFormDate = {
   username: string | number,
   email: string,
   password: string | number,
   repeatPassword?: string | number,
   checkbox: boolean,
}

export type useCreateArticleFormType = {
   title: string | number,
   description: string | number,
   body: string | number,
   [key: string]: string | number;
 }

export type useAuthorizationFormType = {
   login: string,
   password: string | number,
 }

export type AuthorizationFormType = {
   user: {
      email: string,
      
    },
}

export type UserSessionStorageType = {
   email: string,
   token: string,
   username: string,
   bio?: string,
   image?: string
}

export type AuthorizationType = {
   user: {
      email: string,
      token?: string,
      username?: string | number,
      password?: string | number,
      bio?: string,
      image?: string
   }
}

export type ArticleEditingType = {
   article: {
      title: string | number,
      description: string | number,
      body: string | number,
      tagList: Array<string | number>,
    },
}

export type ReplaceUserDataFormType = {
      email: string,
      password: string | number,
      photo: string,
      login: string | number,
      repeatPassword?: string | number,
}

export type TagsInput = {
  [key in string] : string | number
}

export type ArticleListSummaryType = {
        slug: string,
        title: string,
        description: string,
        body: string,
        tagList: [
          string
        ],
        createdAt: string,
        updatedAt: string,
        favorited: boolean,
        favoritesCount: number,
        author: {
          username: string,
          bio: string,
          image: string,
          following: boolean
        }
      ,
    articlesCount?: number 
}

export type InitialStateType = {
   authorizationData: UserSessionStorageType | '',
   slugs: string,
   errors: boolean,
   loading: boolean,
   detailsSelectedArticle: ArticleListSummaryType,
   page: number,
   articleListSummary: ArticleListSummaryType[],
   errorAuthorization: boolean,
   tagsInput: TagsInput[],
   keyTagsNewArticle: number,
 }

 export enum userActionType { 
   authorizationData = 'authorizationData',
   detailsSelectedArticle = 'detailsSelectedArticle',
   dataLoading = 'dataLoading',
   loadingArticle = 'loadingArticle',
   changeFavoritedOfArticles = 'changeFavoritedOfArticles',
   pageNum = 'pageNum',
   slugs = 'slugs',
   successfulAuthorization = 'successfulAuthorization',
   generatedTagsForNewPost = 'generatedTagsForNewPost',
 }

 export type DataLoadingAction = {
   type: userActionType.dataLoading,
   payload: boolean
 }

export type LoadingArticleAction = {
   type: userActionType.loadingArticle,
   payload: ArticleListSummaryType[]
}
export type ChangeFavoritedOfArticlesAction = {
   type: userActionType.changeFavoritedOfArticles,
   payload: ArticleListSummaryType[]
}
export type PageNumAction = {
   type: userActionType.pageNum,
   payload: number
}
export type SlugsAction = {
   type: userActionType.slugs,
   payload: string
}
export type SuccessfulAuthorizationAction = {
   type: userActionType.successfulAuthorization,
   payload: boolean
   
}
export type GeneratedTagsForNewPostAction = {
   type: userActionType.generatedTagsForNewPost,
   payload: TagsInput[]
}
export type DetailsSelectedArticle = {
   type: userActionType.detailsSelectedArticle,
   payload: ArticleListSummaryType
}
export type AuthorizationDataAction = {
   type: userActionType.authorizationData,
   payload: UserSessionStorageType | ''
}

export type ActionType = AuthorizationDataAction | DetailsSelectedArticle | LoadingArticleAction | ChangeFavoritedOfArticlesAction | PageNumAction | SlugsAction | SuccessfulAuthorizationAction | GeneratedTagsForNewPostAction | DataLoadingAction;