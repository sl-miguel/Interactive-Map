import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";

import markersJSON from "../../assets/data.json";
import positionsJSON from "../../assets/positions.json";
import CustomMarker from "./Markers/CustomMarker";

const Map = () => {
  const [visibleMarkers, setVisibleMarkers] = useState<{ [key: number]: boolean }>({});

  // Function to toggle marker visibility based on its ID
  const toggleMarkerVisibility = (id: number) => {
    setVisibleMarkers((prevVisibleMarkers) => ({
      ...prevVisibleMarkers,
      [id]: !prevVisibleMarkers[id],
    }));
  };

  useEffect(() => {
    console.log("Visible Markers", visibleMarkers);
  }, [visibleMarkers]);

  const Sidebar = () => {
    return (
      <div style={{ position: "fixed", width: "200px", bottom: 0, padding: "10px", zIndex: 999999 }}>
        <h1>Markers</h1>

        {markersJSON.map((markerJSON) => (
          <div key={markerJSON.name}>
            <h2>{markerJSON.name}</h2>
            <ul>
              {markerJSON.items.map((item) => (
                <li key={item.id}>
                  <input type="checkbox" name="" id={item.name} checked={visibleMarkers[item.id]} onChange={() => toggleMarkerVisibility(item.id)} />
                  <label htmlFor={item.name}>{item.name}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Sidebar />
      <MapContainer crs={CRS.Simple} maxZoom={8} zoom={2} center={[-88.25, 117.25]} attributionControl={false} style={{ height: "100vh", width: "100vw" }}>
        <TileLayer minNativeZoom={3} maxNativeZoom={5} noWrap={true} url="tiles/{z}/{x}/{y}.png" />

        {/* default markers don't show in vercel */}
        {/* {positionsJSON.map((position) => visibleMarkers[position.id] && <Marker position={[position.position.x, position.position.y]} />)} */}
        {positionsJSON.map((position) => visibleMarkers[position.id] && <CustomMarker x={position.position.x} y={position.position.y} />)}
      </MapContainer>
    </div>
  );
};

export default Map;
