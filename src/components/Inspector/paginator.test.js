import React from 'react'

import { create } from 'react-test-renderer'

import Paginator from './paginator'

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

const findPaginationPrevious = (instance) => {
  return findByClassName(instance, 'button-previous')
}

const findPaginationNext = (instance) => {
  return findByClassName(instance, 'button-next')
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

describe('Paginator', () => {
  test('it shows disabled prev/next buttons and zero pages', () => {
    const component = create(<Paginator />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)

    expect(paginationPrevious.props.disabled).toBeTruthy()
    expect(paginationNext.props.disabled).toBeTruthy()
    expect(pageNumbers.length).toEqual(0)
  })

  test('it shows disabled prev/next buttons and one page (selected by default)', () => {
    const component = create(<Paginator pages={1} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBeTruthy()
    expect(paginationNext.props.disabled).toBeTruthy()
    expect(pageNumbers.length).toEqual(1)
    expect(selectedPage.props.children).toBe(1)
  })

  test('it shows disabled prev button, enabled next button and two pages (first one is selected by default)', () => {
    const component = create(<Paginator pages={2} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(2)
    expect(selectedPage.props.children).toBe(1)
  })

  test('it shows disabled prev button, enabled next button and two pages (first one is selected by default)', () => {
    const component = create(<Paginator pages={2} selected={1} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(2)
    expect(selectedPage.props.children).toBe(1)
  })

  test('it shows disabled next button, enabled prev button and two pages (second one is selected)', () => {
    const component = create(<Paginator pages={2} selected={2} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(2)
    expect(selectedPage.props.children).toBe(2)
  })

  test('it shows enabled prev/next buttons and three pages (second page is selected)', () => {
    const component = create(<Paginator pages={3} selected={2} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(2)
  })

  test('it shows disabled next button, enabled prev button and two pages (third page is selected)', () => {
    const component = create(<Paginator pages={3} selected={3} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(2)
    expect(selectedPage.props.children).toBe(3)
  })

  test('it shows disabled prev button, enabled next button and three pages', () => {
    const component = create(<Paginator pages={4} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(1)
    expect(rightEllipsis)
  })

  test('it shows disabled prev button, enabled next button and three pages', () => {
    const component = create(<Paginator pages={5} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(1)
  })

  test('it shows enabled prev/next buttons and three pages (fourth page is selected)', () => {
    const component = create(<Paginator pages={5} selected={3} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(3)
  })

  test('it shows disabled next button, enabled prev button and three pages (fifth page is selected)', () => {
    const component = create(<Paginator pages={5} selected={5} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(2)
    expect(selectedPage.props.children).toBe(5)
  })

  test('it shows right ellipsis', () => {
    const component = create(<Paginator pages={6} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(1)
    expect(rightEllipsis)
  })

  test('it shows right ellipsis', () => {
    const component = create(<Paginator pages={7} selected={2} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(2)
    expect(rightEllipsis)
  })

  test('it shows right ellipsis', () => {
    const component = create(<Paginator pages={88} selected={39} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(39)
    expect(rightEllipsis)
  })

  test('it shows left ellipsis', () => {
    const component = create(<Paginator pages={5} selected={4} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const leftEllipsis = findLeftEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(4)
    expect(leftEllipsis)
  })

  test('it shows both ellipses', () => {
    const component = create(<Paginator pages={6} selected={3} />)
    const instance = component.root

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const leftEllipsis = findLeftEllipsis(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage.props.children).toBe(3)
    expect(leftEllipsis)
    expect(rightEllipsis)
  })
})
