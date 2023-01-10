import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputValue, 500));

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

getSavedFormData();

function onInputValue(e) {
  if (input.value || textarea.value) {
    formData.email = input.value;
    formData.message = textarea.value;
    formData[e.target.name] = e.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}

function getSavedFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  if (savedData) {
    input.value = parsedData.email;
    textarea.value = parsedData.message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  if (!input.value || !textarea.value) {
    alert('Both fields of the form should be filled in');
  } else {
    formData.email = input.value;
    formData.message = textarea.value;
    console.log(formData);

    e.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
  }
}
