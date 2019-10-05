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

/*
const findPaginationPrevious = (instance) => {
  return findByClassName(instance, 'pagination-previous')
}

const findPaginationNext = (instance) => {
  return findByClassName(instance, 'pagination-next')
}

const findPageNumbers = (instance) => {
  return findAllByClassName(instance, 'pagination-link')
}

const findSelectedPage = (instance) => {
  return findByClassName(instance, 'is-current')
}

const findLeftEllipsis = (instance) => {
  return findByClassName(instance, 'pagination-left-ellipsis')
}

const findRightEllipsis = (instance) => {
  return findByClassName(instance, 'pagination-right-ellipsis')
}
*/

describe('Table', () => {
  test('it displays zero elements', () => {
    const component = create(<Table />)
    const instance = component.root

    const tableRows = findTableRows(instance)

    expect(tableRows.length).toEqual(0)
  })

  test('it displays one element', () => {
    const component = create(<Table requests={[{ID: 1}]} />)
    const instance = component.root

    const tableRows = findTableRows(instance)

    expect(tableRows.length).toEqual(1)
  })

  test('it displays ten elements', () => {
    let elements = []
    for (let i = 0; i < 30; i++) {
      elements.push({ID: i + 1})
    }

    const component = create(<Table requests={elements} />)
    const instance = component.root

    const tableRows = findTableRows(instance)

    expect(tableRows.length).toEqual(10)
  })

  test('it displays twenty elements', () => {
    let elements = []
    for (let i = 0; i < 30; i++) {
      elements.push({ID: i + 1})
    }

    const component = create(<Table pageSize={20} requests={elements} />)
    const instance = component.root

    const tableRows = findTableRows(instance)

    expect(tableRows.length).toEqual(20)
  })


})
