export const parseProps = (propsStr) => {
  const props = propsStr?.split(';').filter(Boolean) || []
  return props.reduce((acc, cur) => {
    const prop = cur.split(':')
    return {
      ...acc,
      [prop[0]]: prop[1]
    }
  }, {})
}

export const parseTitleStr = (titleStr) => {
  const parts = titleStr.split('!')

  return {
    title: parts[0],
    props: parseProps(parts[1])
  }
}
