import React from 'react';
import PropTypes from 'prop-types';
import ListNewGameCards from './my-games/ListNewGameCards';
import ListTopThreeGames from './my-games/ListTopThreeGames';
import Filters from './filter/Filters';
import Title from './title/Title';
import './newgames.scss';

function NewGames({
  value,
  handleChange,
  handleWishlistGame,
  games,
  handleGamesList,
  listGamesLib
}) {
  return (
    <div className="new-games">
      <div className="container-box">
        <Title title="Ajouter des " span="jeux" />
        <Filters value={value} handleChange={handleChange} location="newgameInputValue" />
        <ListNewGameCards
          value={value}
          games={games}
          handleWishlistGame={handleWishlistGame}
          handleGamesList={handleGamesList}
          listGamesLib={listGamesLib}
        />
      </div>
      <div className="container-top-five">
        <div className="container-box">
          <Title title="Les jeux " span="du moment" />
          <ListTopThreeGames />
        </div>
      </div>
    </div>
  );
}

NewGames.propTypes = {
  value: PropTypes.string.isRequired,
  games: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleWishlistGame: PropTypes.func.isRequired,
  handleGamesList: PropTypes.func.isRequired,
  listGamesLib: PropTypes.func.isRequired
};
export default NewGames;
