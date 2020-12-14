import PPokemonList from './pages/PPokemonList'
import PPokemon from './pages/PPokemon'
import PPokemonForm from './pages/PPokemonForm'
import getRoutes from './routes'

export { default as Layout } from './Layout'
export const routes = getRoutes({ PPokemonList, PPokemonForm, PPokemon })
