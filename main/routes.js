export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PPokemonList
  },
  {
    path: '/card-:id',
    exact: true,
    component: components.PPokemon
  },
  {
    path: '/edit-:id',
    exact: true,
    component: components.PPokemonForm
  },
  {
    path: '/create',
    exact: true,
    component: components.PPokemonForm
  }
]
