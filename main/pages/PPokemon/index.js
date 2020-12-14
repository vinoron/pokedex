import React from 'react'
import { withRouter } from 'react-router'
import { observer, useDoc, useQueryIds } from '@startupjs/react-sharedb'
import { Div } from '@startupjs/ui'

import PageSlogan from 'components/PageSlogan'
import PokemonDetail from 'components/PokemonDetail'
import { POKEMONS_COLLECTION } from '../../../const/default'

import './index.styl'

const PSuggestions = ({ match: { params } }) => {
  const [pokemons, $pokemons] = useQueryIds(POKEMONS_COLLECTION, [params.id])
  const onDelete = async () => {
    await $pokemons.delAsync(params.id)
  }
  return pug`
    Div.root
      PageSlogan(text='POKEMON')
      PokemonDetail(item=pokemons[0] onDelete=onDelete)
  `
}
export default withRouter(observer(PSuggestions))
