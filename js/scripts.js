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
    const stepNext = document.querySelectorAll(".btn-step-next");
})