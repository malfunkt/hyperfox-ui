import React from 'react'

import { create } from 'react-test-renderer'

import Table from './table'

const _matchClass = (element, className) => {
  if (element._fiber.stateNode) {
    let classes = ((element._fiber.stateNode.props || {}).className || '').split(' ')
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].trim() === className) {
        return true
      }
    }
  }
  return false
}

const findAllByClassName = (testInstance, className) => {
  return testInstance.findAll((element) => {
    return _matchClass(element, className)
  })
}

const findByClassName = (testInstance, className) => {
  return testInstance.find((element) => {
    return _matchClass(element, className)
  })
}

const findTableRows = (instance) => {
  return findAllByClassName(instance, 'table-row')
}

describe('Table', () => {
  test('it displays zero elements', () => {
    const component = create(<Table />)
    const instance = component.root

    const tableRows = findTableRows(instance)

    expect(tableRows.length).toEqual(0)
  })

  test('it displays one element', () => {
    const component = create(<Table records={[{UUID: 1}]} />)
    const instance = component.root

    const tableRows = findTableRows(instance)

    expect(tableRows.length).toEqual(1)
  })

  test('it displays 30 elements', () => {
    let elements = []
    for (let i = 0; i < 30; i++) {
      elements.push({UUID: i + 1})
    }

    const component = create(<Table records={elements} />)
    const instance = component.root

    const tableRows = findTableRows(instance)

    expect(tableRows.length).toEqual(30)
  })
})
