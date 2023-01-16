import {
  RegistrationDate,
  AuthorizationType,
  ArticleEditingType,
} from "../type/type";

export default class ServesServer {
  baseUrl = "https://blog.kata.academy/api";

  async gettingArticles(pageNumber: number) {
    const response = await fetch(
      `${this.baseUrl}/articles?limit=5&offset=${pageNumber}`
    );
    const result = await response.json();
    return result;
  }

  async gettingOneArticles(id: string) {
    const response = await fetch(`${this.baseUrl}/articles/${id}`);
    if (!response.ok) {
      throw new Error(`Could not fetch function sessionСreation
      ,received ${response.status}`);
    }
    const result = await response.json();
    return result;
  }

  async registration(date: RegistrationDate) {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "post",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(date),
    });

    const result = await response.json();
    return result;
  }

  async authorization(date: AuthorizationType) {
    const response = await fetch(`${this.baseUrl}/users/login`, {
      method: "post",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(date),
    });

    const result = await response.json();
    return result;
  }

  async replaceUserData(date: AuthorizationType, token: string) {
    const response = await fetch(`${this.baseUrl}/user`, {
      method: "put",
      headers: {
        accept: "application/json",
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    });

    const result = await response.json();
    return result;
  }

  async articlePublication(date: ArticleEditingType, token: string) {
    const response = await fetch(`${this.baseUrl}/articles`, {
      method: "post",
      headers: {
        accept: "application/json",
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    });

    const result = await response.json();
    return result;
  }

  async articleEditing(date: ArticleEditingType, token: string, slug: String) {
    const response = await fetch(`${this.baseUrl}/articles/${slug}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(date),
    });

    const result = await response.json();
    return result;
  }

  async articleDeleting(slug: string, token: string) {
    await fetch(`${this.baseUrl}/articles/${slug}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
  }

  async articleFavorite(slug: string, token: string) {
    const response = await fetch(`${this.baseUrl}/articles/${slug}/favorite`, {
      method: "post",
      headers: {
        accept: "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(""),
    });

    const result = await response.json();
    return result;
  }

  async favoriteDeleting(slug: string, token: string) {
    const response = await fetch(`${this.baseUrl}/articles/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });

    const result = await response.json();
    return result;
  }
}
