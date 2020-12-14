import React, { useEffect, useState } from 'react'
import { Div } from '@startupjs/ui'
import { useValue, usePage, useDoc, useQuery, observer, useSession } from '@startupjs/react-sharedb'
import PageSlogan from 'components/PageSlogan'
import PokemonList from 'components/PokemonList'
import { POKEMONS_COLLECTION, PAGE_LIMITS } from '../../../const/default'

import './index.styl'

const PSuggestions = () => {
  let [skip, $skip] = useValue(0)
  let [limit, $limit] = useValue(PAGE_LIMITS[0])
  let [search, $search] = useValue('')
  let [types, $types] = useValue([])

  const query = { $skip: skip, $limit: limit }
  if (search) {
    query.name = search
  }
  if (types.length > 0) {
    query.types = { $in: types }
  }

  let [pokemons] = useQuery(POKEMONS_COLLECTION, query)
  let [count] = useQuery(POKEMONS_COLLECTION, { $count: 1 })
  const pages = Math.ceil(count / limit)

  return pug`
    Div.root
      PageSlogan(text='LIBRARY')
      PokemonList(items=pokemons pages=pages $limit=$limit $skip=$skip $search=$search $types=$types)
  `
}
export default observer(PSuggestions)
