import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import isClient from '../utils/isClient'

const OSX = `osx`
const WINDOWS = `win`
const LINUX = `linux`
const LINUX_RPM = `linux_rpm`
const UNKNOWN = `...`
const LINE = `line`

const links = {
  [OSX]: {
    title: 'Mac OSX',
    url: `https://github.com/iterative/dvc/releases/download/0.9.7/dvc-0.9.7.pkg`
  },
  [WINDOWS]: {
    title: 'Windows',
    url: `https://github.com/iterative/dvc/releases/download/0.9.7/dvc-0.9.7.exe`
  },
  [LINUX]: {
    title: 'Linux Deb',
    url: `https://github.com/iterative/dvc/releases/download/0.9.7/dvc_0.9.7_amd64.deb`
  },
  [LINUX_RPM]: {
    title: 'Linux RPM',
    url: `https://github.com/iterative/dvc/releases/download/0.9.7/dvc-0.9.7-1.x86_64.rpm`
  },
  [UNKNOWN]: {
    title: 'pip install dvc'
  },
  [LINE]: {
    line: true
  }
}

export default class DownloadButton extends Component {
  state = {
    os: UNKNOWN,
    open: false
  }

  constructor() {
    super()

    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    const os = this.getSystemOS()
    this.setState({ os })

    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setRef = ref => (this.ref = ref)

  handleClickOutside = event => {
    if (this.ref && !this.ref.contains(event.target)) {
      if (this.state.open) {
        this.close()
      }
    }
  }

  getSystemOS = () => {
    let OSName = UNKNOWN
    if (!isClient) return OSName

    if (navigator.userAgent.indexOf('Win') !== -1) OSName = WINDOWS
    if (navigator.userAgent.indexOf('Mac') !== -1) OSName = OSX
    if (navigator.userAgent.indexOf('Linux') !== -1) OSName = LINUX

    return OSName
  }

  close = () => this.setState({ open: false })

  toggle = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }

  download = () => {
    this.close()
  }

  renderLinks = () => (
    <Links>
      {[OSX, WINDOWS, LINUX, LINUX_RPM, LINE, UNKNOWN].map(id => {
        const link = links[id]

        if (link.line) {
          return <Delimiter key={id} />
        }

        if (!link.url) {
          return (
            <DownloadInput
              key={id}
              value={link.title}
              onClick={function(e) {
                e.target.select()
                e.stopPropagation()
              }}
            />
          )
        }

        return (
          <DownloadLink
            key={id}
            href={link.url}
            target="_blank"
            onClick={() => this.download(link)}
            active={id === this.state.os}
          >
            {link.title}
          </DownloadLink>
        )
      })}
    </Links>
  )

  render() {
    const { os, open } = this.state
    const currentOS = links[os]

    return (
      <Handler onClick={this.toggle} innerRef={this.setRef}>
        <Button>
          <Icon>
            <img
              src="/static/img/download-arrow.svg"
              alt="Download"
              width={14}
              height={20}
            />
          </Icon>
          <Inner>
            <div>
              <Action>Download</Action>
              <Description>({currentOS.title})</Description>
            </div>

            <Triangle open={open}>
              <img src="/static/img/triangle.svg" alt="" />
            </Triangle>
          </Inner>
        </Button>
        {open && <Popup>{this.renderLinks()}</Popup>}
      </Handler>
    )
  }
}

const Handler = styled.span`
  position: relative;
  display: inline-block;
  width: 186px;
  height: 60px;
`

const Button = styled.button`
  position: relative;
  width: 186px;
  height: 60px;
  border: none;
  border-radius: 4px;
  background-color: #945dd6;

  padding: 0px;
  background-color: #945dd6;
  line-height: 1.29;
  color: #ffffff;

  cursor: pointer;
  z-index: 9;

  display: flex;
  flex-direction: row;
  align-items: center;
`

const Icon = styled.div`
  flex-basis: 48px;

  text-align: center;
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`

const Action = styled.h6`
  font-size: 20px;
  font-family: "BrandonGrotesqueMed";
  line-height: 0.9;
`
const Description = styled.p`
  font-family: "BrandonGrotesqueLight";
  padding-top: 4px;
  font-size: 13px;
  text-align: left;
`

const Triangle = styled.div`
  margin-right: 19px;
  align-items: center;
  display: flex;

  transition: left 300ms linear;

  ${props =>
    props.open &&
    `
    transition: left 300ms linear;
    transform: rotate(-180deg);
  `};
`

const Popup = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 3px;
  transform: translateY(100%);
  background-color: #ffffff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
`

const item = css`
  display: block;
  min-height: 36px;
  line-height: 1.29;
  padding: 0px 17px;

  display: flex;
  align-items: center;
  font-family: "BrandonGrotesqueMed";
  text-decoration: none;

  color: #b0b8c5;
`

const Delimiter = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  height: 1px;
`

const DownloadInput = styled.input`
  ${item};
  border: none !important;
  font-family: Monospace;

  ${props =>
    props.active &&
    `
    color: #40364d;
  `};
`

const DownloadLink = styled.a`
  ${item};
  color: #b0b8c5;

  &:hover {
    color: #40364d;
  }

  ${props =>
    props.active &&
    `
    color: #40364d;
  `};
`
