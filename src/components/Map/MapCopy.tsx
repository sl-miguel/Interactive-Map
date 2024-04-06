import { MapContainer, Popup, FeatureGroup, TileLayer, Marker, LayersControl, useMapEvent, useMap } from "react-leaflet";
import { useState } from "react";
import L, { CRS } from "leaflet";
import CustomMarker from "./Markers/CustomMarker";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [showFishingSpots, setShowFishingSpots] = useState(true);
  const [showTeleports, setShowTeleports] = useState(true);

  const markers = [{ id: 1, position: { x: -90, y: 113 }, name: "Coffre Ordinaire", type: "ordinary-chest" }];

  const fishingSpots = [
    { id: 1, lat: -90.25, lng: 113.25, title: "point B1" },
    { id: 2, lat: -93.25, lng: 115.25, title: "point B2" },
    { id: 3, lat: -96.25, lng: 117.25, title: "point B3" },
    { id: 4, lat: -95.25, lng: 118.25, title: "point B4" },
    { id: 5, lat: -92.25, lng: 111.25, title: "point B5" },
  ];

  const teleports = [
    { id: 1, lat: 0.505, lng: -0.1, title: "Teleport 1" },
    { id: 2, lat: 1.51, lng: -0.11, title: "Teleport 2" },
    { id: 3, lat: 2.515, lng: -0.11, title: "Teleport 3" },
  ];

  const ControllingGroup = () => {
    // @ts-ignore
    const map = useMapEvent({
      overlayadd(e: any) {
        // @ts-ignore
        let bounds = new L.LatLngBounds();
        console.log("Event", e);

        map.eachLayer((layer) => {
          if (layer instanceof L.FeatureGroup) {
            bounds.extend(layer.getBounds());
          }
        });

        // if (bounds.isValid()) map.flyToBounds(bounds);
      },
    });

    return null;
  };

  // function MapCenter() {
  //   // const map = useMap();
  //   // const center = map.getCenter();
  //   // map.setView(center, 2);
  //   // return <Marker position={center} />;
  //   // const [position, setPosition] = useState(() => map.getCenter());
  //   // const bounds = map.getBounds();
  //   // const data = map.fitBounds(bounds, { maxZoom: MAX_ZOOM });
  //   // map.fitBounds()
  //   // console.log("map center:", map.getCenter());
  //   // console.log("map", map);
  //   // return <Rectangle bounds={bounds} pathOptions={{ color: "red", fill: false }} />;
  // }

  return (
    <div>
      <div style={{ position: "fixed", width: "200px", bottom: 0, padding: "10px", zIndex: 999999 }}>
        <h2>Markers</h2>
        <div>
          <input type="checkbox" checked={showFishingSpots} onChange={() => setShowFishingSpots(!showFishingSpots)} />
          <label>Fishing Spots</label>
        </div>
        <div>
          <input type="checkbox" checked={showTeleports} onChange={() => setShowTeleports(!showTeleports)} />
          <label>Teleports</label>
        </div>
      </div>

      <MapContainer crs={CRS.Simple} maxZoom={8} zoom={2} center={[-88.25, 117.25]} attributionControl={false} style={{ height: "100vh", width: "100vw" }}>
        {/* <LayersControl position="topright" collapsed={false}> */}
        <TileLayer minNativeZoom={3} maxNativeZoom={5} noWrap={true} url="tiles/{z}/{x}/{y}.png" />
        {/* <MapCenter /> */}
        {/* <LayersControl.Overlay name="Points de téléportation">
            <FeatureGroup>
              {fishingSpots.map((spot) => (
                <Marker key={spot.id} position={[spot.lat, spot.lng]}>
                  <Popup>{spot.title}</Popup>
                </Marker>
              ))}
            </FeatureGroup>
          </LayersControl.Overlay> */}

        {/* Render Fishing Spots if enabled */}
        {showFishingSpots &&
          fishingSpots.map((spot) => (
            <Marker key={spot.id} position={[spot.lat, spot.lng]}>
              <Popup>{spot.title}</Popup>
            </Marker>
          ))}

        {showTeleports &&
          teleports.map((spot) => (
            <Marker key={spot.id} position={[spot.lat, spot.lng]}>
              <Popup>{spot.title}</Popup>
            </Marker>
          ))}
        {/* </LayersControl> */}

        <ControllingGroup />
      </MapContainer>
    </div>
  );

  // return (
  //   <MapContainer crs={CRS.Simple} maxZoom={8} zoom={2} center={[-88.25, 117.25]} attributionControl={false} style={{ height: "100vh", width: "100vw" }}>
  //     <TileLayer minNativeZoom={3} maxNativeZoom={5} noWrap={true} url="tiles/{z}/{x}/{y}.png" />

  //     {/* Show map bounds */}
  //     {/* <Rectangle bounds={MAP_BOUNDS} pathOptions={{ color: "red", fill: false }} /> */}
  //     <MyComponent />

  //     {/* https://react-leaflet.js.org/docs/example-layers-control/ */}
  //     <LayersControl position="topright">
  //       <LayersControl.Overlay name="Chests">
  //         <LayerGroup>
  //           <Marker position={[-80.25, 110.25]} />

  //           <Marker position={[latitude, longitude]}>
  //             <Popup>
  //               {latitude}, {longitude}
  //             </Popup>
  //           </Marker>
  //         </LayerGroup>
  //       </LayersControl.Overlay>

  //       <LayersControl.Overlay name="Center" checked>
  //         <CustomMarker />
  //       </LayersControl.Overlay>
  //     </LayersControl>
  //   </MapContainer>
  // );
};

export default Map;
