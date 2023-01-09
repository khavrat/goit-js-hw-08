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
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getSavedFormData(e) {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  if (savedData !== null) {
    input.value = parsedData.email;
    textarea.value = parsedData.message;
  }
}

function onFormSubmit(e) {
  formData.email = input.value;
  formData.message = textarea.value;
  console.log(formData);

  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
