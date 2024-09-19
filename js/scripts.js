document.addEventListener("DOMContentLoaded", function () {
    function commentResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    document.querySelector(".form-input").addEventListener('input', function () {
        commentResize(this);
    });
})