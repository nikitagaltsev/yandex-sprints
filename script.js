const initialCards = [
  {
    name: 'Barcelona',
    link: 'https://images.unsplash.com/photo-1587789202069-f57c846b85db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'
  },
  {
    name: 'Maldives',
    link: 'https://images.unsplash.com/photo-1587578075208-f206676d9860?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80'
  },
  {
    name: 'Shanghai',
    link: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Langjokull',
    link: 'https://images.unsplash.com/photo-1482778090591-caf9a0149412?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Cambodia',
    link: 'https://images.unsplash.com/photo-1540525080980-b97c4be3c779?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'London',
    link: 'https://images.unsplash.com/photo-1472725485116-45d54945b877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1142&q=80'
  },
  {
    name: 'Moulton Falls',
    link: 'https://images.unsplash.com/photo-1465021696408-57e53e164d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
  },
  {
    name: 'Sri Lanka',
    link: 'https://images.unsplash.com/photo-1586870336143-d652f69d44c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Rheinland-Pfalz',
    link: 'https://images.unsplash.com/photo-1574013573452-2d89828155a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Kyoto',
    link: 'https://images.unsplash.com/photo-1558159857-6282096da77b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
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
}


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


// Отрисовка карточки и определение её элементов 
const renderPlaceCard = function(item) {
  const newPlaceCard = createPlaceCard();
  newPlaceCard.querySelector('.place-card__image').setAttribute('style', `background-image: url(${item['link']})`);
  newPlaceCard.querySelector('.place-card__name').textContent = item['name'];

  const likeButton = newPlaceCard.querySelector('.place-card__like-icon');
  const deleteButton = newPlaceCard.querySelector('.place-card__delete-icon');

  deleteButton.addEventListener('click', function(event) {
    removeCardHandler(event);
  });

  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  })

  placesContainer.appendChild(newPlaceCard);
};

// Управление отображением форм
const showPlaceForm = function() {
  document.querySelector('.popup_place').classList.toggle('popup_is-opened');
};
const showPersonForm = function() {
  document.querySelector('.popup_person').classList.toggle('popup_is-opened');
}


//Добавление кастомной карточки
const userPlaceCard = function() {
  customCard.name = inputPlaceName.value;
  customCard.link = inputPlaceLink.value;
  initialCards.push(customCard);
  formPlace.reset();
  renderPlaceCard(initialCards[initialCards.length-1]);
};

//Инициальизация пользователя
const changeUserInfo = function() {
  document.querySelector('.popup__input_type_person-name').setAttribute('value', userInfoName.textContent);
  document.querySelector('.popup__input_type_about').setAttribute('value', userInfoJob.textContent);
}



//Изменение пользователя
const person = function () {
  personInfo.name = inputPersonName.value;
  personInfo.about = inputPersonAbout.value;
  formPerson.reset();
  userInfoName.textContent = personInfo.name;
  userInfoJob.textContent = personInfo.about;
  changeUserInfo();
}

// Слушатели
document.querySelector('.user-info__button').addEventListener('click', showPlaceForm);
document.querySelector('.popup__close_place').addEventListener('click', showPlaceForm);
document.querySelector('.user-info__edit-button').addEventListener('click', showPersonForm);
document.querySelector('.popup__close_person').addEventListener('click', showPersonForm);


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