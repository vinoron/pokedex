import React, { useCallback, useState } from 'react'
import { Image } from 'react-native'
import { withRouter } from 'react-router'
import { Div, Span, H4, Tag, Hr, TextInput, Link, Button, Card } from '@startupjs/ui'
import { useValue, useDoc, observer } from '@startupjs/react-sharedb'
import Title from 'components/Title'
import { POKEMON_TYPES } from '../../const/default'
import './index.styl'

const PokemonDetail = ({ item, history, onDelete }) => {
  const gotoLibrary = () => {
    history.push('/')
  }
  const gotoEdit = () => {
    history.push(`/edit-${item.id}`)
  }
  const gotoCreate = () => {
    history.push('/create')
  }
  const doDelete = async () => {
    gotoLibrary()
    await onDelete()
  }
  return pug`
    Div.root
      Card.pokemon
        Image.image(source={ uri: item.imageUrl })
        H4 #{item.order}) #{item.name}
        Span #{item.abilities}
        Hr
        Div.tags
          each type,index in item.types
            Tag.tag(key=index style=({ backgroundColor: (POKEMON_TYPES.find(t=> t.name === type) || []).color })) #{type.toUpperCase()}
        Div.controls
          Button(onClick=gotoLibrary) Go to library
          Button.editButton(onClick=gotoEdit) Edit
          Button.deleteButton(onClick=doDelete) Delete
          Button.createButton(onClick=gotoCreate) Create new
  `
}
export default withRouter(PokemonDetail)
