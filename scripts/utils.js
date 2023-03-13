function createElement(tagName, { html, text, className, id }) {
  const el = document.createElement(tagName);

  if (html) el.innerHTML = html;
  if (text) el.textContent = text;
  if (className) el.className = className;
  if (id) el.id = id;

  return el;
}

function createError(html) {
  const error = createElement("div", { html });
  error.dataset.type = "error";
  return error;
}

function printError(error, field) {
  const parent = field.parentElement;
  const foundError = Array.from(parent.children).find(
    (item) => item.dataset.type === "error"
  );

  const errorEl = createError(error);
  field.dataset.state = "invalid";

  if (foundError) {
    foundError.replaceWith(errorEl);
  } else {
    parent.append(errorEl);
  }
}

function removeError(field) {
  const parent = field.parentElement;
  const foundError = Array.from(parent.children).find(
    (item) => item.dataset.type === "error"
  );

  field.dataset.state = "";

  if (foundError) {
    foundError.remove();
  }
}

function isValid(field) {
  field.dataset.state = "success";
}

/**
 *
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  const today = new Date();

  const day = date.getDate();
  const monthName = date.toLocaleDateString("ru", { month: "long" });
  const year = date.getFullYear();
  
  const hours = prependZero(date.getHours());
  const minutes = prependZero(date.getMinutes());
  
  const formattedDate = `${day} ${monthName} ${year}`;
  const formattedTime = `${hours}:${minutes}`;

  if (
    today.getDate() === date.getDay() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    return `сегодня, ${formattedTime}`;
  }

  if (
    today.getDate() - 1 === date.getDay() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    return `вчера, ${formattedTime}`;
  }

  return `${formattedDate}, ${formattedTime}`;
}

function prependZero(number) {
  return number < 10 ? "0" + number : number;
}
