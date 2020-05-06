const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
   }
];

// Декларация переменных
const placesContainer = document.querySelector('.places-list');
const formPlace = document.forms.place;
const formPerson = document.forms.profile;
const inputPlaceName = formPlace.elements.name;
const inputPlaceLink = formPlace.elements.link;
const inputPersonName = formPerson.elements.name;
const inputPersonAbout = formPerson.elements.about;
const inputButton = document.querySelector('.popup__button');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
inputPlaceName.setAttribute('required', true);
inputPlaceLink.setAttribute('required', true);
inputPersonName.setAttribute('required', true);
inputPersonAbout.setAttribute('required', true);

const customCard = {
  name: '',
  link: ''
};

const personInfo = {
  name: '',
  about: ''
};


// Функции
//Создание карточки
const createPlaceCard = function() {
  const markup = `
    <div class="place-card">
      <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>
      </div>
    </div>
  `;

  const placeCard = document.createElement('div');
  placeCard.insertAdjacentHTML('afterbegin', markup);

  return placeCard.firstElementChild;
};



// Удаление карточки
const removeCardHandler = function(event) {
  event.target.closest('.place-card').remove();
};


//popup для изображений
const imagePopup = function(image) {
  const backgroundImage = image.style.backgroundImage.replace('url(','').replace(')','').replace(/\"/gi, "");
  document.querySelector('.popup__image-open').setAttribute('src', backgroundImage);
  showImageForm();
}


// Отрисовка карточки и определение её элементов 
const renderPlaceCard = function(item) {
  const newPlaceCard = createPlaceCard();
  newPlaceCard.querySelector('.place-card__image').setAttribute('style', `background-image: url(${item['link']})`);
  newPlaceCard.querySelector('.place-card__name').textContent = item['name'];

  const likeButton = newPlaceCard.querySelector('.place-card__like-icon');
  const deleteButton = newPlaceCard.querySelector('.place-card__delete-icon');

  deleteButton.addEventListener('click', function(event) {
    removeCardHandler(event);
    event.stopPropagation();
  });

  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  })

  newPlaceCard.querySelector('.place-card__image').addEventListener('click', function(event) {
    imagePopup(event.target);
  })

  placesContainer.appendChild(newPlaceCard);
};

// Активность кнопок


// Управление отображением форм
const showPlaceForm = function() {
  document.querySelector('.popup_place').classList.toggle('popup_is-opened');
};
const showPersonForm = function() {
  document.querySelector('.popup_person').classList.toggle('popup_is-opened');
};
const showImageForm = function() {
  document.querySelector('.popup_image').classList.toggle('popup_is-opened');
};
// Активность конопок



//Добавление кастомной карточки
const userPlaceCard = function() {
  customCard.name = inputPlaceName.value;
  customCard.link = inputPlaceLink.value;
  initialCards.push(customCard);
  formPlace.reset();
  renderPlaceCard(initialCards[initialCards.length-1]);
};


//Инициализация пользователя
const changeUserInfo = function() {
  document.querySelector('.popup__input_type_person-name').setAttribute('value', userInfoName.textContent);
  document.querySelector('.popup__input_type_about').setAttribute('value', userInfoJob.textContent);
};


//Изменение пользователя
const person = function() {
  personInfo.name = inputPersonName.value;
  personInfo.about = inputPersonAbout.value;
  formPerson.reset();
  userInfoName.textContent = personInfo.name;
  userInfoJob.textContent = personInfo.about;
  changeUserInfo();
};

// Слушатели
document.querySelector('.user-info__button').addEventListener('click', showPlaceForm);
document.querySelector('.popup__close_place').addEventListener('click', showPlaceForm);
document.querySelector('.user-info__edit-button').addEventListener('click', showPersonForm);
document.querySelector('.popup__close_person').addEventListener('click', showPersonForm);
document.querySelector('.popup__close_image').addEventListener('click', showImageForm);


// Вызовы функций и методов
changeUserInfo();

initialCards.forEach(function(item) {
  renderPlaceCard(item);
});

formPlace.addEventListener('submit', function(event) {
  userPlaceCard();
  event.preventDefault();
  showPlaceForm();
})

formPerson.addEventListener('submit', function(event) {
  event.preventDefault();
  showPersonForm();
  person();
})





// .popup__button_active