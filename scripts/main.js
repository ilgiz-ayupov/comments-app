const addCommentForm = document.getElementById("add-comment");
const addCommentHandler = new AddCommentHandler();
const commentHandler = new Comment();

addCommentForm.addEventListener("input", addCommentHandler);
addCommentForm.addEventListener("change", addCommentHandler);
addCommentForm.addEventListener("submit", addCommentHandler);

document.addEventListener("click", (event) => {
  const target = event.target;

  const comment = target.closest("[data-type='comment-item']");
  if (comment) {
    commentHandler.handleEvent(event);
  }
});
