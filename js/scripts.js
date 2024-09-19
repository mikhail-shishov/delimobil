document.addEventListener("DOMContentLoaded", function () {
    // увеличение инпута в зависимости от текста
    function commentResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
    const mainInput = document.querySelector(".form-input")
    mainInput.addEventListener('input', function () {
        commentResize(this);
    });

    // кнопки для инпута
    const suggestions = document.querySelectorAll(".form-helper-btn")
    suggestions.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            let content = item.innerHTML;
            mainInput.innerHTML += content + "&nbsp;";
            commentResize(mainInput);
            item.remove()
        })
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
                const duration = 10000; // 10 секунд
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
                }, 10000); // 10 секунд на шаг
            } else if ((Array.from(steps).indexOf(nextStep) === 1) || (Array.from(steps).indexOf(nextStep) === 2)) {
                document.body.classList.add("bg-load");
            } else {
                document.body.classList.remove("bg-load");
            }
        }
    }

    document.querySelectorAll('.btn-step-next').forEach(button => {
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