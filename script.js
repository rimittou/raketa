// Эффект появления элементов при прокрутке
document.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-in").forEach(el => {
    const rect = el.getBoundingClientRect();
    // Элемент появляется, когда его верхняя граница попадает в область просмотра
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

// Плавная прокрутка по якорям (ссылки вида a[href^="#"])
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Плавный скролл к элементу с отступом (60px для фиксированного меню)
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth"
      });
    }
  });
});

// --- ЛОГИКА ФОРМЫ БРОНИРОВАНИЯ ---

const form = document.querySelector("#contact form");
const dateInput = document.getElementById("book-date");
const timeInput = document.getElementById("book-time");

// Устанавливаем минимальную дату в календаре на "сегодня"
if(dateInput) {
  const today = new Date().toISOString().split('T')[0]; // Формат YYYY-MM-DD
  dateInput.setAttribute("min", today);
}

// Обработчик отправки формы с проверкой времени
if (form && dateInput && timeInput) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const selectedDateStr = dateInput.value;
    const selectedTimeStr = timeInput.value;

    // Объект Date для выбранного времени
    const selectedDateTime = new Date(`${selectedDateStr}T${selectedTimeStr}`);

    // Минимально допустимое время: текущее время + 30 минут
    const minAllowedTime = new Date(new Date().getTime() + 30 * 60000);

    if (selectedDateTime < minAllowedTime) {
      alert("Бронирование возможно только минимум за 30 минут от текущего времени. Пожалуйста, выберите другое время.");
    } else {
      alert("Спасибо за бронирование! Мы свяжемся с вами в ближайшее время.");
      form.reset();
    }
  });
}