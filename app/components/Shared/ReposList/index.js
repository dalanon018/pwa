import React from 'react'
import PropTypes from 'prop-types'

import List from 'components/Shared/List'
import ListItem from 'components/Shared/ListItem'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import RepoListItem from 'containers/RepoListItem'

function ReposList ({ loading, error, repos }) {
  if (loading) {
    return <List component={LoadingIndicator} />
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    )
    return <List component={ErrorComponent} />
  }

  if (repos !== false) {
    return <List items={repos} component={RepoListItem} />
  }

  return null
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  repos: PropTypes.any
}

export default ReposList
