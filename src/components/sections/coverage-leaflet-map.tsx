'use client'

import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet'
import type { CoverageMapLocation, Neighborhood } from '@/lib/cms-types'
import 'leaflet/dist/leaflet.css'

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

function pinSize(workers: number) {
  if (workers > 180) return 18
  if (workers > 140) return 16
  if (workers > 100) return 14
  return 12
}

function makePinIcon(workers: number, focused: boolean, dimmed: boolean, pulse: boolean) {
  const size = pinSize(workers)
  const pad = pulse ? 16 : 8
  return L.divIcon({
    className: 'coverage-pin-icon',
    html: `<div class="coverage-pin ${focused ? 'is-focused' : ''} ${dimmed ? 'is-dimmed' : ''} ${pulse ? 'is-pulse' : ''}" style="width:${size}px;height:${size}px"></div>`,
    iconSize: [size + pad, size + pad],
    iconAnchor: [(size + pad) / 2, (size + pad) / 2],
  })
}

function nearestNeighbors(hood: Neighborhood, all: Neighborhood[], count = 2) {
  return [...all]
    .filter((n) => n.name !== hood.name)
    .sort((a, b) => {
      const da = (a.latitude - hood.latitude) ** 2 + (a.longitude - hood.longitude) ** 2
      const db = (b.latitude - hood.latitude) ** 2 + (b.longitude - hood.longitude) ** 2
      return da - db
    })
    .slice(0, count)
}

function FitBounds({ neighborhoods }: { neighborhoods: Neighborhood[] }) {
  const map = useMap()

  useEffect(() => {
    if (neighborhoods.length === 0) return
    if (neighborhoods.length === 1) {
      map.setView([neighborhoods[0].latitude, neighborhoods[0].longitude], 13)
      return
    }
    const bounds = L.latLngBounds(
      neighborhoods.map((n) => [n.latitude, n.longitude] as [number, number]),
    )
    map.fitBounds(bounds, { padding: [52, 52], maxZoom: 13 })
  }, [map, neighborhoods])

  return null
}

function FlyToSelection({
  selected,
  neighborhoods,
  reduceMotion,
}: {
  selected: string
  neighborhoods: Neighborhood[]
  reduceMotion: boolean
}) {
  const map = useMap()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const hood = neighborhoods.find((n) => n.name === selected)
    if (!hood) return
    const zoom = Math.max(map.getZoom(), 12)
    if (reduceMotion) {
      map.setView([hood.latitude, hood.longitude], zoom)
    } else {
      map.flyTo([hood.latitude, hood.longitude], zoom, { duration: 0.7 })
    }
  }, [selected, neighborhoods, map, reduceMotion])

  return null
}

export type CoverageLeafletMapProps = {
  location: CoverageMapLocation
  neighborhoods: Neighborhood[]
  selected: string
  focusName: string
  topDensity: Set<string>
  reduceMotion: boolean
  onSelect: (name: string) => void
  onHover: (name: string | null) => void
}

export function CoverageLeafletMap({
  location,
  neighborhoods,
  selected,
  focusName,
  topDensity,
  reduceMotion,
  onSelect,
  onHover,
}: CoverageLeafletMapProps) {
  const focusHood = neighborhoods.find((n) => n.name === focusName) ?? neighborhoods[0]
  const neighbors = useMemo(
    () => (focusHood ? nearestNeighbors(focusHood, neighborhoods) : []),
    [focusHood, neighborhoods],
  )

  return (
    <MapContainer
      center={[location.centerLat, location.centerLng]}
      zoom={location.zoom}
      className="coverage-leaflet-map h-full w-full z-0"
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <FitBounds neighborhoods={neighborhoods} />
      <FlyToSelection selected={selected} neighborhoods={neighborhoods} reduceMotion={reduceMotion} />

      {!reduceMotion &&
        focusHood &&
        neighbors.map((neighbor) => (
          <Polyline
            key={`${focusHood.name}-${neighbor.name}`}
            positions={[
              [focusHood.latitude, focusHood.longitude],
              [neighbor.latitude, neighbor.longitude],
            ]}
            pathOptions={{
              color: '#E6175C',
              weight: 2,
              opacity: 0.28,
              dashArray: '5 7',
            }}
          />
        ))}

      {neighborhoods.map((hood) => {
        const isFocused = focusName === hood.name
        const isDimmed = !isFocused
        const pulse = topDensity.has(hood.name) && !reduceMotion

        return (
          <Marker
            key={`${hood.name}-${isFocused}-${isDimmed}`}
            position={[hood.latitude, hood.longitude]}
            icon={makePinIcon(hood.workers, isFocused, isDimmed, pulse)}
            eventHandlers={{
              click: () => onSelect(hood.name),
              mouseover: () => onHover(hood.name),
              mouseout: () => onHover(null),
            }}
          />
        )
      })}
    </MapContainer>
  )
}
