document.addEventListener("DOMContentLoaded", function () {
    // перемешивание подсказок в начале
    const suggestionsWrap = document.querySelector(".form-helper-wrap");
    const suggestions = document.querySelectorAll(".form-helper-btn");

    function shuffle() {
        const shuffledSuggestions = Array.from(suggestions);
        shuffledSuggestions.sort(() => Math.random() - 0.5);
        suggestionsWrap.innerHTML = '';
        shuffledSuggestions.forEach(item => suggestionsWrap.appendChild(item));
    }
    shuffle();

    // кнопка перехода на следующий шаг
    btnStepNext = document.querySelectorAll(".btn-step-next");

    // поле ввода
    const mainInput = document.querySelector(".form-input")

    // увеличение инпута в зависимости от текста
    function commentResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
    function checkValue(textarea) {
        if (textarea.value.length >= 2) {
            return (btnStepNext[0].disabled = false);
        } else {
            return (btnStepNext[0].disabled = true);
        }
    }

    mainInput.addEventListener('input', function () {
        commentResize(this);
        checkValue(this);
    });

    // кнопки для инпута
    suggestions.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            let content = item.innerHTML;
            mainInput.value += content + " ";
            commentResize(mainInput);
            checkValue(mainInput);
            item.remove();
        });
    });

    // шаги
    const steps = document.querySelectorAll(".step");
    function handleStep() {
        const currentStep = document.querySelector('.step.is-active');
        const nextStep = currentStep.nextElementSibling;

        if (nextStep) {
            currentStep.classList.remove('is-active');
            nextStep.classList.add('is-active');

            const loader = nextStep.querySelector('.generate-loader');

            if (loader) {
                // проценты
                document.body.classList.add("bg-load");
                const percentage = document.querySelector('.generate-percent span');
                let currentNumber = 0;
                const duration = 25000; // 25 секунд
                const increment = 100 / (duration / 100); // 100ms interval

                const interval = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= 100) {
                        currentNumber = 100;
                        clearInterval(interval);
                    }
                    percentage.textContent = Math.floor(currentNumber);
                }, 100);
                setTimeout(() => {
                    const thirdStep = nextStep.nextElementSibling;
                    if (thirdStep) {
                        nextStep.classList.remove('is-active');
                        thirdStep.classList.add('is-active');
                    }
                }, 25000); // 10 секунд на шаг
            } else if ((Array.from(steps).indexOf(nextStep) === 1) || (Array.from(steps).indexOf(nextStep) === 2)) {
                document.body.classList.add("bg-load");
            } else {
                document.body.classList.remove("bg-load");
            }
        }
    }

    btnStepNext.forEach(button => {
        button.addEventListener('click', function (e) {
            handleStep();
        });
    });

    document.querySelectorAll('.btn-step-first').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            location.reload();
            // steps.forEach(element => {
            //     element.classList.remove('is-active')
            // });
            // steps[0].classList.add('is-active')
        })
    })

    // отправка данных в форме
    document.querySelector('.form').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            user_request: document.getElementById('user_request').value
        };

        console.log(formData);

        fetch('https://install-led-photozone.onrender.com/generate_prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
})