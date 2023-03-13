/**
 * 
 * @param {Event} event 
 */
const addCommentHandler = (event) => {
  const target = event.target;
  const handler = new AddCommentHandler();

  const addCommentForm = target.closest("[data-type='add-comment-form']");
  if (addCommentForm) {
    handler.handleEvent(event);
  }
};

/**
 * 
 * @param {Event} event 
 */
const commentHandler = (event) => {
  const target = event.target;
  const handler = new Comment();

  const comment = target.closest("[data-type='comment-item']");
  if (comment) {
    handler.handleEvent(event);
  }
};

document.addEventListener("input", addCommentHandler);
document.addEventListener("change", addCommentHandler);
document.addEventListener("submit", addCommentHandler);

document.addEventListener("click", commentHandler);
