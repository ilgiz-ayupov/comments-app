class Comment {
  static createComment(username, comment, date) {
    return `
        <div class="comment" data-type="comment-item">
            <div class="comment__header">
            <h3 class="comment__username">${username}</h3>
            <div class="comment__header-left">
                <time datetime="${date.toISOString()}">
                    ${formatDate(date)}
                </time>
                <button class="comment__delete" data-type="comment-delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            </div>
            <div class="comment-item__body">
            <p class="comment__comment">
                ${comment}
            </p>
            <button class="comment__like" data-type="comment-like-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            </button>
            </div>      
        </div>
    `.trim();
  }

  onDeleteComment(target) {
    const comment = target.closest("[data-type='comment-item']");
    comment.dataset.state = "deleted";

    comment.addEventListener("transitionend", () => {
      setTimeout(() => {
        comment.remove();
      }, 300);
    });
  }

  onLikedComment(target) {
    const comment = target.closest("[data-type='comment-item']");
    if (comment.dataset.state === "liked") {
      comment.dataset.state = "";
    } else {
      comment.dataset.state = "liked";
    }
  }

  onClick(event) {
    const target = event.target;
    const btn = target.closest("button");

    switch (btn.dataset.type) {
      case "comment-delete-btn":
        this.onDeleteComment(target);
        break;
      case "comment-like-btn":
        this.onLikedComment(target);
        break;
    }
  }

  handleEvent(event) {
    switch (event.type) {
      case "click":
        this.onClick(event);
    }
  }
}
