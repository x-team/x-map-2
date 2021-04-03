import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

import { Motion, spring } from 'react-motion'

// @ts-expect-error: this description package doesn’t have type definitions
import { Tooltip, actions } from 'redux-tooltip'

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
  display: 'flex',
}

const mapWrapperStyles = {
  flex: 1,
}
const personWrapperStyles = {
  cursor: 'pointer',
}

const geographyStyle = {
  default: {
    fill: '#ECEFF1',
    stroke: '#607D8B',
    strokeWidth: 0.75,
    outline: 'none',
  },
  hover: {
    fill: '#607D8B',
    stroke: '#607D8B',
    strokeWidth: 0.75,
    outline: 'none',
  },
  pressed: {
    fill: '#FF5722',
    stroke: '#607D8B',
    strokeWidth: 0.75,
    outline: 'none',
  },
}

type Person = {
  id: number
  name: string
  coordinates: [number, number]
}

const people: Person[] = [
  { id: 1, name: 'Denise	Rios', coordinates: [8.5417, 47.3769] },
  { id: 2, name: 'Ginger	Walker', coordinates: [103.8198, 1.3521] },
  { id: 3, name: 'Dewey	Weaver', coordinates: [-122.4194, 37.7749] },
  { id: 4, name: 'Jennie	Gill', coordinates: [151.2093, -33.8688] },
  { id: 5, name: 'Angelo	Hines', coordinates: [3.3792, 6.5244] },
  { id: 6, name: 'Virgil	Hardy', coordinates: [-58.3816, -34.6037] },
  { id: 7, name: 'Tina	Griffin', coordinates: [121.4737, 31.2304] },
]

const { show, hide } = actions

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

type HandlePersonHover = (
  person: Person
) => React.MouseEventHandler<SVGPathElement>

const Home = (): JSX.Element => {
  const [zoom, setZoom] = useState<number>(1)
  const [center, setCenter] = useState<[lat: number, long: number]>([0, 20])
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null)

  const dispatch = useDispatch()

  const handlePersonClick = (person: Person) => () => {
    setZoom(2)
    setCenter(person.coordinates)
    setSelectedPerson(person.id)
  }

  const handleReset = () => {
    setZoom(1)
    setCenter([0, 20])
    setSelectedPerson(null)
  }

  const handlePersonHover: HandlePersonHover = ({ name }) => ({
    clientX,
    clientY,
  }) => {
    if (typeof window === 'undefined') return
    const x = clientX
    const y = clientY + window.pageYOffset
    dispatch(
      show({
        origin: { x, y },
        content: name,
      })
    )
  }

  const handlePersonHoverOut = () => dispatch(hide())

  return (
    <div style={wrapperStyles}>
      <div>
        {people.map((person, i) => (
          <div
            style={{
              ...personWrapperStyles,
              fontWeight: person.id === selectedPerson ? 'bold' : 'normal',
            }}
            key={i}
            onClick={handlePersonClick(person)}
          >
            {person.name}
          </div>
        ))}
        <br />
        <div style={personWrapperStyles} onClick={handleReset}>
          Reset zoom
        </div>
      </div>
      <div style={mapWrapperStyles}>
        <Motion
          defaultStyle={{
            zoom: 1,
            x: 0,
            y: 20,
          }}
          style={{
            zoom: spring(zoom, { stiffness: 210, damping: 20 }),
            x: spring(center[0], { stiffness: 210, damping: 20 }),
            y: spring(center[1], { stiffness: 210, damping: 20 }),
          }}
        >
          {({ zoom, x, y }) => (
            <ComposableMap
              projectionConfig={{ scale: 205 }}
              width={980}
              height={551}
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#EAEAEC"
                        stroke="#D6D6DA"
                        style={geographyStyle}
                      />
                    ))
                  }
                </Geographies>
                {people.map((person, i) => (
                  <Marker
                    coordinates={person.coordinates}
                    key={i}
                    onClick={handlePersonClick(person)}
                    onMouseMove={handlePersonHover(person)}
                    onMouseLeave={handlePersonHoverOut}
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
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
        <Tooltip />
      </div>
    </div>
  )
}

export default Home
