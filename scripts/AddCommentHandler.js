class AddCommentHandler {
  /**
   *
   * @param {string} username
   * @returns {string}
   */
  validateUsername(username) {
    if (/[^a-zа-я]/gi.test(username)) {
      return "Имя должно состоять только из букв";
    }

    if (!username.length) {
      return "Обязательное к заполнению поле";
    }

    if (username.length > 16) {
      return "Максимально допустимая длина имени 16 символов";
    }
  }

  /**
   *
   * @param {string} comment
   * @returns {string}
   */
  validateComment(comment) {
    if (!comment.length) {
      return "Обязательное к заполнению поле";
    }

    if (comment.length > 150) {
      return "Максимально допустимая длина комментария 150 символов";
    }
  }

  /**
   *
   * @param {HTMLFormElement} form
   */
  resetForm(form) {
    const inputs = form.querySelectorAll("input, textarea");
    for (const input of inputs) {
      input.value = "";
      input.dataset.state = "";
    }
  }

  /**
   *
   * @param {Event} event
   */
  onChange(event) {
    const target = event.target;

    let error;
    switch (target.name) {
      case "username":
        error = this.validateUsername(target.value);
        break;
      case "comment":
        error = this.validateComment(target.value);
        break;
    }

    if (error) {
      printError(error, target);
    } else {
      removeError(target);
    }

    if (!error && event.type === "change") {
      isValid(target);
    }
  }

  /**
   *
   * @param {Event} event
   */
  onSubmit(event) {
    event.preventDefault();
    const form = event.target;

    let error;

    let username = form.username;
    error = this.validateUsername(username.value);
    if (error) {
      username.focus();
      printError(error, username);
    }
    username = username.value;

    let comment = form.comment;
    error = this.validateComment(comment.value);
    if (error) {
      if (document.activeElement !== username) comment.focus();
      printError(error, comment);
    }
    comment = comment.value;

    let datetime = form.datetime;
    if (datetime.value) {
      datetime = new Date(datetime.value);
    } else {
      datetime = new Date();
    }

    if (!error) {
      const newComment = Comment.createComment(username, comment, datetime);

      let commentsList = CommentsList.object;
      if (!commentsList) {
        commentsList = new CommentsList();
      }

      this.resetForm(form);
      commentsList.append(newComment);
      window.scrollTo(0, 0);
    }
  }

  /**
   *
   * @param {Event} event
   */
  handleEvent(event) {
    switch (event.type) {
      case "input":
      case "change":
        this.onChange(event);
        break;
      case "submit":
        this.onSubmit(event);
        break;
    }
  }
}
