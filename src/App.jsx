import React from 'react';
import './App.scss';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Swal from 'sweetalert2';
import HeaderLib from './components/header/HeaderLib';
import HeaderSugg from './components/header/HeaderSugg';
import MyGames from './components/contents/MyGames';
import NewGames from './components/contents/NewGames';
import Footer from './components/footer/Footer';
import MobileNav from './components/mobile-nav/MobileNav';
import GetGames from './components/data/GetGames';
import NavDesktop from './components/nav-desktop/NavDesktop';
import DisplayWishlist from './components/contents/my-games/DisplayWishlist';

/* axios.defaults.headers.common['user-key'] = 'e98a7b482e71cbb9d2b90309b365e3b4'; */
axios.defaults.headers.common['user-key'] = '75f9926369d4142ff35731792bb25f29';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mygameInputValue: null,
      newgameInputValue: null,
      idNewGameDelete: null,
      prevListGamesLib: [],
      listGamesLib: [],
      wishlist: [],
      show: false,
      allGames: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.gameToRemove = this.gameToRemove.bind(this);
    this.handleAllGames = this.handleAllGames.bind(this);
    this.handleGamesList = this.handleGamesList.bind(this);
    this.handleWishlistGame = this.handleWishlistGame.bind(this);
    this.handleRemoveWishlistGame = this.handleRemoveWishlistGame.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.getItem('gamesList')) {
      let gamesList = window.localStorage.getItem('gamesList');
      gamesList = JSON.parse(gamesList);
      gamesList = gamesList.sort((a, b) => new Date(b.addingDate) - new Date(a.addingDate));
      this.setState({ listGamesLib: gamesList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { listGamesLib } = this.state;
    const listGamesLibReverse = listGamesLib.sort(
      (a, b) => new Date(b.addingDate) - new Date(a.addingDate)
    );
    window.localStorage.setItem('gamesList', JSON.stringify(listGamesLibReverse));
    if (
      this.state.prevListGamesLib.length !== listGamesLibReverse.length ||
      this.state.prevListGamesLib === []
    ) {
      this.setState(prevState => {
        return {
          ...prevState,
          listGamesLib: listGamesLibReverse,
          prevListGamesLib: listGamesLibReverse
        };
      });
    }
  }

  handleGamesList(values) {
    this.setState(prevState => {
      return {
        ...prevState,
        listGamesLib: [...prevState.listGamesLib, values]
      };
    });
  }

  handleWishlistGame(values) {
    const { listGamesLib } = this.state;
    this.setState({
      listGamesLib: [...listGamesLib, values]
    });
    // window.localStorage.setItem(title, JSON.stringify(values));
  }

  handleRemoveWishlistGame(values) {
    /* console.log(values); */
  }

  gameToRemove(gameToRemove) {
    Swal.fire({
      title: 'Etes-vous sûr?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary-color)',
      cancelButtonColor: 'var(--alert-color)',
      confirmButtonText: 'Oui, je supprime!',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Supprimé!',
          text: 'Votre jeu a été supprimé.',
          icon: 'success',
          showConfirmButton: false,
          timer: 900
        });
        const { listGamesLib } = this.state;
        const newTab = listGamesLib;
        let index = newTab.map(game => {
          if (gameToRemove === game.title) {
            return newTab.indexOf(game);
          }
          return undefined;
        });
        index = index.filter(el => el !== undefined);
        newTab.splice(index[0], 1);
        this.setState({ listGamesLib: newTab });
      }
    });
  }

  handleAllGames(games) {
    this.setState({ allGames: [...games] });
  }

  handleChange(event) {
    const valueToChange = event.target.value;
    const inputSearchInputValue = event.target.name;
    this.setState({ [inputSearchInputValue]: valueToChange });
  }

  render() {
    const { mygameInputValue, idNewGameAdded, wishlist } = this.state;
    const { newgameInputValue } = this.state;
    const { handleChange, handleAllGames } = this;

    return (
      <div className="App">
        <Router>
          <section id="content">
            <NavDesktop
              wishlist={wishlist}
              listGamesLib={this.state.listGamesLib}
              handleRemoveWishlistGame={this.handleRemoveWishlistGame}
            />

            <Switch>
              <Route exact path="/">
                <HeaderLib idNewGameAdded={idNewGameAdded} gameToRemove={this.gameToRemove} />
                <MyGames
                  value={mygameInputValue}
                  gameToRemove={this.gameToRemove}
                  handleChange={handleChange}
                  listGamesLib={this.state.listGamesLib}
                />
              </Route>
              <Route exact path="/ajouter-un-jeu">
                <GetGames games={this.state.allGames} handleAllGames={handleAllGames} />
                <HeaderSugg handleGameAdded={this.handleGameAdded} />
                <NewGames
                  value={newgameInputValue}
                  handleWishlistGame={this.handleWishlistGame}
                  handleRemoveWishlistGame={this.handleRemoveWishlistGame}
                  handleGamesList={this.handleGamesList}
                  handleChange={handleChange}
                  games={this.state.allGames}
                  listGamesLib={this.state.listGamesLib}
                />
              </Route>
            </Switch>
          </section>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
