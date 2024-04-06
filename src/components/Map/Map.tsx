import { MapContainer, TileLayer } from "react-leaflet";
import { createControlComponent } from "@react-leaflet/core";
import L, { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const MapInfo = createControlComponent(() => {
    const MapInfo = L.Control.extend({
      onAdd: (_map: L.Map): HTMLElement => {
        const panel = L.DomUtil.create("aside", "controls");
        L.DomEvent.disableClickPropagation(panel);
        L.DomEvent.disableScrollPropagation(panel);
        return panel;
      },

      addControl: () => {},
    });

    return new MapInfo({ position: "bottomleft" });
  });

  return (
    <MapContainer crs={CRS.Simple} maxZoom={8} zoom={2} center={[-88.25, 117.25]} attributionControl={false} style={{ height: "100vh", width: "100vw" }}>
      <TileLayer minNativeZoom={3} maxNativeZoom={5} noWrap={true} url="tiles/{z}/{x}/{y}.png" />
      <MapInfo />
    </MapContainer>
  );
};

export default Map;
