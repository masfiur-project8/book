const addBookModal = document.getElementById('add-modal');
// const addBookModal = document.querySelector('#add-modal');
// const addBookModal = document.body.children[1];
const startAddBookButton = document.querySelector('header button');
// const startAddBookButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild;
const cancelAddBookButton = addBookModal.querySelector('.btn--passive');
const confirmAddBookButton = cancelAddBookButton.nextElementSibling;
const userInputs = addBookModal.querySelectorAll('input');
// const userInputs = addBookModal.getElementsByTagName('input');
const entryTextSection = document.getElementById('entry-text');
const deleteBookModal = document.getElementById('delete-modal');

const books = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  if (books.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const closeBookDeletionModal = () => {
  toggleBackdrop();
  deleteBookModal.classList.remove('visible');
};

const deleteBookHandler = bookId => {
  let bookIndex = 0;
  for (const book of books) {
    if (book.id === bookId) {
      break;
    }
    bookIndex++;
  }
  books.splice(bookIndex, 1);
  const listRoot = document.getElementById('book-list');
  listRoot.children[bookIndex].remove();
  // listRoot.removeChild(listRoot.children[bookIndex]);
  closeBookDeletionModal();
  updateUI();
};

const startDeleteBookHandler = bookId => {
  deleteBookModal.classList.add('visible');
  toggleBackdrop();

  const cancelDeletionButton = deleteBookModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteBookModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteBookModal.querySelector('.btn--danger');

  // confirmDeletionButton.removeEventListener('click', deleteBookHandler.bind(null, bookId)); // will not work :(
    
  cancelDeletionButton.removeEventListener('click', closeBookDeletionModal);

  cancelDeletionButton.addEventListener('click', closeBookDeletionModal);
  confirmDeletionButton.addEventListener(
    'click',
    deleteBookHandler.bind(null, bookId)
  );
};

const renderNewBookElement = (id, title, imageUrl, rating) => {
  const newBookElement = document.createElement('li');
  newBookElement.className = 'book-element';
  newBookElement.innerHTML = `
    <div class="book-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="book-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newBookElement.addEventListener(
    'click',
    startDeleteBookHandler.bind(null, id)
  );
  const listRoot = document.getElementById('book-list');
  listRoot.append(newBookElement);
};

const closeBookModal = () => {
  addBookModal.classList.remove('visible');
};

const showBookModal = () => {
  // function() {}
  addBookModal.classList.add('visible');
  toggleBackdrop();
};

const clearBookInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const cancelAddBookHandler = () => {
  closeBookModal();
  toggleBackdrop();
  clearBookInput();
};

const addBookHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newBook = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  books.push(newBook);
  console.log(books);
  closeBookModal();
  toggleBackdrop();
  clearBookInput();
  renderNewBookElement(
    newBook.id,
    newBook.title,
    newBook.image,
    newBook.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeBookModal();
  closeBookDeletionModal();
  clearBookInput();
};

startAddBookButton.addEventListener('click', showBookModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddBookButton.addEventListener('click', cancelAddBookHandler);
confirmAddBookButton.addEventListener('click', addBookHandler);
