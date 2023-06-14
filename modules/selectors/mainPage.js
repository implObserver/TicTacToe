const MainPage = (() => {
    const play = document.querySelector('.play');
    
    const linkToGamePage = play.querySelector('a');
    console.log(document.children);
    return { play, linkToGamePage };
})();

export { MainPage };