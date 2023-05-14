export default function renderLoading(buttonSubmit, isLoading) {

	if (isLoading) {
		if (buttonSubmit.classList.contains('popup__submit_create')) {
			buttonSubmit.textContent = 'Создание...';
		}
		else {
			buttonSubmit.textContent = 'Сохранение...'
		}
	}
	else {
		if (buttonSubmit.classList.contains('popup__submit_create')) {
			buttonSubmit.textContent = 'Создать';
		}
		else {
			buttonSubmit.textContent = 'Сохранить'
		}
	}
}