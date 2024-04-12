import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";

import markersJSON from "../../assets/data.json";
import positionsJSON from "../../assets/positions.json";

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

  const Sidebar = () => {
    return (
      <div style={{ position: "fixed", width: "200px", bottom: 0, padding: "10px", zIndex: 999999 }}>
        <h2>Markers</h2>

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

        {positionsJSON.map((position) => visibleMarkers[position.id] && <Marker position={[position.position.x, position.position.y]} />)}

        <ControllingGroup />
      </MapContainer>
    </div>
  );
};

export default Map;
