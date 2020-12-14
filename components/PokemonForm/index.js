import React, { useCallback, useState } from 'react'
import uuid from 'uuid'
import { Div, Span, Tag, TextInput, Multiselect, Link, Button } from '@startupjs/ui'
import { withRouter } from 'react-router'
import { useValue, useDoc, useQuery, observer } from '@startupjs/react-sharedb'
import Title from 'components/Title'
import { POKEMONS_COLLECTION, POKEMON_TYPES } from '../../const/default'
import './index.styl'

const PokemonForm = ({ id, history }) => {
  const [pokemon, $pokemon] = useDoc(POKEMONS_COLLECTION, id)
  const [lastPokemons] = useQuery(POKEMONS_COLLECTION, { $sort: { order: -1 }, $limit: 1 })
  const [formData, $formData] = useValue(id ? { ...pokemon } : { types: [] })
  console.debug('ososos=', lastPokemons[0])
  const onSetFormValue = useCallback(
    (key) => (value) => {
      $formData.setEach({ [key]: value })
    }, [])

  const onSave = async () => {
    if (id) {
      $pokemon.setEach(formData)
      history.push(`/card-${id}`)
    } else {
      const newId = uuid()
      const obj = $pokemon.scope(`${POKEMONS_COLLECTION}.${newId}`)
      await obj.createAsync({ ...formData, order: lastPokemons[0] ? lastPokemons[0].order + 1 : 1 })
      history.push(`/card-${newId}`)
    }
  }

  const getTag = ({ record }) => {
    return pug`
      Tag(style=({backgroundColor: record.color})) #{record.label}
    `
  }

  return pug`
    Div.root
      Title Add a pokemon
      TextInput.input(placeholder='Name' onChangeText=onSetFormValue('name') value=formData.name)
      TextInput.input(placeholder='Image URL' onChangeText=onSetFormValue('imageUrl') value=formData.imageUrl)
      Div.multi
        Multiselect(
          placeholder='Select type(s)'
          value=formData.types
          onChange=onSetFormValue('types')
          options=POKEMON_TYPES.map(l => ({ label: l.name.toUpperCase(), value: l.name, color: l.color }))
          TagComponent=getTag
        )
      TextInput.textarea(placeholder='Abilities' value=formData.abilities multiline=true numberOfLines=8 onChangeText=onSetFormValue('abilities'))
      Div.footer
        Button.button(onClick=onSave) #{id ? 'UPDATE' : 'CREATE'}
  `
}
export default withRouter(observer(PokemonForm))
