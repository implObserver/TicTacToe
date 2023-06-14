const MainPage = (() => {
    const play = document.querySelector('.play');
    const linkToGamePage = document.querySelector('play+a');
    return { play, linkToGamePage };
})();

export { MainPage };