import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Div, Span, Row, Pagination, Select, Button, H3, Tag, Link, Avatar, Hr, TextInput, Multiselect } from '@startupjs/ui'
import { observer, useValue } from '@startupjs/react-sharedb'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { BASE_URL } from '@env'
import PokemonCard from 'components/PokemonCard'
import { PAGE_LIMITS, POKEMON_TYPES } from '../../const/default'

import './index.styl'

const PokemonsList = ({ items, pages, $limit, $skip, $search, $types }) => {
  const [searchVal, $searchVal] = useValue('')
  const [selectedTypes, $selectedTypes] = useValue([])
  const limit = $limit.get()
  const onChangePage = val => {
    $skip.set(val * limit)
  }
  const onSetLimit = val => {
    $skip.set(0)
    $limit.set(val)
  }

  const onSetSearchVal = val => {
    $searchVal.set(val)
  }

  const onSearch = () => {
    $search.set(searchVal)
  }

  const onSetTypesVal = values => {
    $selectedTypes.set(values)
    $types.set(values)
  }

  const getTag = ({ record }) => {
    return pug`
      Tag(style=({backgroundColor: record.color})) #{record.label}
    `
  }

  return pug`
    Div.root
      Row.filter
        TextInput.searchInput(placeholder='Search by name' onChangeText=onSetSearchVal value=searchVal)
        Button.searchBtn(onClick=onSearch icon=faSearch variant='flat' iconPosition='center')
        Div.multi
          Multiselect.multiselect(
            placeholder='Select type(s)'
            value=selectedTypes
            onChange=onSetTypesVal
            options=POKEMON_TYPES.map(l => ({ label: l.name.toUpperCase(), value: l.name, color: l.color }))
            TagComponent=getTag
          )
      Row.pagination
        Pagination(pages=pages limit=limit $skip=$skip onChangePage=onChangePage)
        Select(
          value=limit
          showEmptyValue=false
          onChange=onSetLimit
          options=PAGE_LIMITS.map(l => ({ label: l, value: l }))
        )
      Row.deka
        each pokemon in items
          PokemonCard(data=pokemon key=pokemon.id)
  `
}
export default observer(PokemonsList)
