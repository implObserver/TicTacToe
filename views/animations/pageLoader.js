const Loader = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        document.body.classList.add('body_visible');
    });

    window.addEventListener("unload", function () {
        document.body.classList.remove('body_visible');
    });
})();

export { Loader }