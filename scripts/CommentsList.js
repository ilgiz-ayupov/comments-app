class CommentsList {
  static object;

  constructor() {
    this.container = createElement("div", { className: "comments" });
    this.list = createElement("div", { className: "comments__list" });
    this.list.dataset.type = "comment-list";

    const commentsTitle = createElement("h2", {
      className: "comments__title",
      text: "Список комментариев",
    });

    this.container.append(commentsTitle, this.list);
    document.body.prepend(this.container);

    CommentsList.object = this;
  }

  append(newComment) {
    this.list.insertAdjacentHTML("afterbegin", newComment);
  }
}
