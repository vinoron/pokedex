import React from 'react'
import { withRouter } from 'react-router'
import { Div } from '@startupjs/ui'

import PageSlogan from 'components/PageSlogan'

import PokemonForm from 'components/PokemonForm'
import './index.styl'

const PSuggestions = ({ match: { params } }) => {
  return pug`
    Div.root
      PageSlogan(text='BUILD IT!')
      PokemonForm(id=params.id)

  `
}
export default withRouter(PSuggestions)
