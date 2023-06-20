const gamePage = (() => {
    let players = [];
    let gameBoard;
    const addPlayer = (player) => {
        players.push(player);
    }

    const getPlayers = () => {
        return players;
    }
    return { addPlayer, getPlayers };
})();

export { gamePage };