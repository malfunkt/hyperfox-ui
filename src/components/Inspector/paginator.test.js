import React from 'react'

import { create } from 'react-test-renderer'

import Paginator from './paginator'

const findPaginationPrevious = (instance) => {
  return instance.findByProps({className: 'pagination-previous'})
}

const findPaginationNext = (instance) => {
  return instance.findByProps({className: 'pagination-next'})
}

const findPageNumbers = (instance) => {
  return instance.findAllByProps({className: 'pagination-link'})
}

const findSelectedPage = (instance) => {
  return instance.findByProps({className: 'is-current'})
}

const findLeftEllipsis = (instance) => {
  return instance.findByProps({className: 'pagination-left-ellipsis'})
}

const findRightEllipsis = (instance) => {
  return instance.findByProps({className: 'pagination-right-ellipsis'})
}

describe('Paginator', () => {
  test('it shows disabled prev/next buttons and zero pages', () => {
    const component = create(<Paginator />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(0)
  })

  test('it shows disabled prev/next buttons and one page (selected by default)', () => {
    const component = create(<Paginator pages={1} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(1)
    expect(selectedPage).toBe(1)
  })

  test('it shows disabled prev button, enabled next button and two pages (first one is selected by default)', () => {
    const component = create(<Paginator pages={2} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(2)
    expect(selectedPage).toBe(1)
  })

  test('it shows disabled prev button, enabled next button and two pages (first one is selected by default)', () => {
    const component = create(<Paginator pages={2} selected={1} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(2)
    expect(selectedPage).toBe(1)
  })

  test('it shows disabled next button, enabled prev button and two pages (second one is selected)', () => {
    const component = create(<Paginator pages={2} selected={2} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(2)
    expect(selectedPage).toBe(2)
  })

  test('it shows enabled prev/next buttons and three pages (second page is selected)', () => {
    const component = create(<Paginator pages={3} selected={2} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage).toBe(3)
  })

  test('it shows disabled next button, enabled prev button and three pages (third page is selected)', () => {
    const component = create(<Paginator pages={3} selected={3} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(3)
    expect(selectedPage).toBe(3)
  })

  test('it shows disabled prev button, enabled next button and four pages', () => {
    const component = create(<Paginator pages={4} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(4)
    expect(selectedPage).toBe(1)
  })

  test('it shows disabled prev button, enabled next button and five pages', () => {
    const component = create(<Paginator pages={5} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(1)
  })

  test('it shows enabled prev/next buttons and five pages (fourth page is selected)', () => {
    const component = create(<Paginator pages={5} selected={3} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(3)
  })

  test('it shows disabled next button, enabled prev button and five pages (fifth page is selected)', () => {
    const component = create(<Paginator pages={5} selected={5} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(false)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(4)
  })

  test('it shows right ellipsis', () => {
    const component = create(<Paginator pages={6} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(false)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(1)
    expect(rightEllipsis)
  })

  test('it shows right ellipsis', () => {
    const component = create(<Paginator pages={7} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(1)
    expect(rightEllipsis)
  })

  test('it shows right ellipsis', () => {
    const component = create(<Paginator pages={88} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(1)
    expect(rightEllipsis)
  })

  test('it shows left ellipsis', () => {
    const component = create(<Paginator pages={5} selected={4} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const leftEllipsis = findLeftEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(4)
    expect(leftEllipsis)
  })

  test('it shows both ellipses', () => {
    const component = create(<Paginator pages={6} selected={3} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const leftEllipsis = findLeftEllipsis(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(3)
    expect(leftEllipsis)
    expect(rightEllipsis)
  })

  test('it shows both ellipses', () => {
    const component = create(<Paginator pages={12} selected={5} />)
    const instance = component.root;

    const paginationPrevious = findPaginationPrevious(instance)
    const paginationNext = findPaginationNext(instance)
    const pageNumbers = findPageNumbers(instance)
    const selectedPage = findSelectedPage(instance)
    const leftEllipsis = findLeftEllipsis(instance)
    const rightEllipsis = findRightEllipsis(instance)

    expect(paginationPrevious.props.disabled).toBe(true)
    expect(paginationNext.props.disabled).toBe(true)
    expect(pageNumbers.length).toBe(5)
    expect(selectedPage).toBe(3)
    expect(leftEllipsis)
    expect(rightEllipsis)
  })
})
