import React, { Component } from "react"
import { connect } from 'react-redux';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

import {
  Tooltip,
  actions,
} from "redux-tooltip"

import World from '../../static/world.json';

const { show, hide } = actions

class Map extends Component {
  constructor() {
    super()
    this.handleMove = this.handleMove.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }
  handleMove(geography, evt) {
    const x = evt.clientX
    const y = evt.clientY + window.pageYOffset
    this.props.dispatch(
      show({
        origin: { x, y },
        content: geography.properties.name,
      })
    )
  }
  handleLeave() {
    this.props.dispatch(hide())
  }
  render() {
    return (
      <div>
        <ComposableMap>
          <ZoomableGroup>
            <Geographies geography={World}>
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    onMouseMove={this.handleMove}
                    onMouseLeave={this.handleLeave}
                    style={{
                      default: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#607D8B",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#FF5722",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(Map)
