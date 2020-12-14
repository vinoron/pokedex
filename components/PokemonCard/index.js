import React, { useCallback, useState } from 'react'
import { withRouter } from 'react-router'
import { Div, Span, H4, H5, Hr, Tag, TextInput, Link, Button, Card, Avatar } from '@startupjs/ui'
import { useValue, useDoc, observer } from '@startupjs/react-sharedb'
import Title from 'components/Title'
import { POKEMONS_COLLECTION, POKEMON_TYPES } from '../../const/default'
import './index.styl'

const PokemonCard = ({ data, history }) => {
  const onClick = () => {
    history.push(`/card-${data.id}`)
  }
  return pug`
    Card.root(onClick=onClick)
      H5.order #{data.order}
      H4.name #{data.name}
      Avatar.avtar(size='xxl' src=data.imageUrl)
      Hr
      each type,index in data.types
        Tag(key=index style=({ backgroundColor: (POKEMON_TYPES.find(t=> t.name === type) || []).color })) #{type.toUpperCase()}
  `
}
export default withRouter(PokemonCard)
