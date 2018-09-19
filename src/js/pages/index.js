import React, { Component } from "react"
import { connect } from 'react-redux';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"

import { Motion, spring } from "react-motion"

import {
  Tooltip,
  actions,
} from "redux-tooltip"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  display: 'flex'
}
const peopleWrapperStyles = {
  flex: 1
}
const mapWrapperStyles= {
  flex: 1
}
const personWrapperStyles = {
  cursor: 'pointer'
}

const people = [
  { id: 1, name: "Denise	Rios", coordinates: [8.5417,47.3769] },
  { id: 2, name: "Ginger	Walker", coordinates: [103.8198,1.3521] },
  { id: 3, name: "Dewey	Weaver", coordinates: [-122.4194,37.7749] },
  { id: 4, name: "Jennie	Gill", coordinates: [151.2093,-33.8688] },
  { id: 5, name: "Angelo	Hines", coordinates: [3.3792,6.5244] },
  { id: 6, name: "Virgil	Hardy", coordinates: [-58.3816,-34.6037] },
  { id: 7, name: "Tina	Griffin", coordinates: [121.4737,31.2304] },
]

const { show, hide } = actions

class Map extends Component {
  constructor() {
    super()
    this.state = {
      zoom: 1,
      center: [0,20],
      selectedPerson: null
    };
    // this.handleMove = this.handleMove.bind(this)
    // this.handleLeave = this.handleLeave.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handlePersonClick = this.handlePersonClick.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handlePersonHover = this.handlePersonHover.bind(this)
    this.handlePersonHoverOut = this.handlePersonHoverOut.bind(this)
    this.handleWheel=this.handleWheel.bind(this);
  }
  handleWheel(scroll) {
        console.log(scroll);
        if (scroll.deltaY > 0) {
            this.handleZoomOut();
        } else if (scroll.deltaY < 0) {
            this.handleZoomIn();
        }
    }
  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2,
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2,
    })
  }
  handlePersonClick(person) {
    this.setState({
      zoom: 2,
      center: person.coordinates,
      selectedPerson: person.id
    })
  }
  handleReset() {
    this.setState({
      center: [0,20],
      zoom: 1,
      selectedPerson: null
    })
  }

  handlePersonHover(person, evt) {
    const x = evt.clientX
    const y = evt.clientY + window.pageYOffset

    this.props.dispatch(
      show({
        origin: { x, y },
        content: person.name,
      })
    )
  }

  handlePersonHoverOut() {
    this.props.dispatch(hide())
  }

  // handleMove(geography, evt) {
  //   const x = evt.clientX
  //   const y = evt.clientY + window.pageYOffset
  //   this.props.dispatch(
  //     show({
  //       origin: { x, y },
  //       content: geography.properties.name,
  //     })
  //   )
  // }
  // handleLeave() {
  //   this.props.dispatch(hide())
  // }

  render() {
    return (
      <div style={wrapperStyles} onWheel={this.handleWheel}>
        <div>
          { people.map((person, i) => (
            <div style={{
              ...personWrapperStyles,
              fontWeight: person.id === this.state.selectedPerson ? 'bold' : 'normal'
            }} key={i} onClick={() => this.handlePersonClick(person)}>
              {person.name}
            </div>
          )) }
          <br />
          <div style={personWrapperStyles} onClick={this.handleReset}>Reset zoom</div>
        </div>
        <div style={mapWrapperStyles}>
          <Motion
          defaultStyle={{
            zoom: 1,
            x: 0,
            y: 20,
          }}
          style={{
            zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
            x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
            y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
          }}
          >
          {({zoom,x,y}) => (
            <ComposableMap
            projectionConfig={{ scale: 205 }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto",
            }}>
            <ZoomableGroup center={[x,y]} zoom={zoom}>
            <Geographies geography="/static/world.json">
            {(geographies, projection) =>
              geographies.map((geography, i) => (
                <Geography
                key={i}
                geography={geography}
                projection={projection}
                /* onMouseMove={this.handleMove} */
                /* onMouseLeave={this.handleLeave} */
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
            <Markers>
            { people.map((person, i) => (
              <Marker
              key={i}
              marker={person}
              onClick={this.handlePersonClick}
              onMouseMove={this.handlePersonHover}
              onMouseLeave={this.handlePersonHoverOut}
              >
              <circle
              cx={0}
              cy={0}
              r={6}
              fill="#FF5722"
              stroke="#DF3702"
              />
              </Marker>
            ))}
            </Markers>
            </ZoomableGroup>
            </ComposableMap>
          )}
          </Motion>
          <Tooltip />
        </div>
      </div>
    )
  }
}

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(Map)
