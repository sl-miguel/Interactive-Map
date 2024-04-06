import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import styles from './marker.module.css';
import newMarker from './pin.png';

function CustomMarker() {

    const pointerIcon = new L.Icon({
        iconUrl: newMarker,
        iconSize: [50, 58], // size of the icon
        iconAnchor: [20, 58], // changed marker icon position
        popupAnchor: [0, -60], // changed popup position
      });

    return (
        <Marker icon={pointerIcon} position={[-88.25, 117.25]}>
        <Popup className={styles.newPopup} minWidth={300}>
          Hello ?
        </Popup>
      </Marker>
    )
}

export default CustomMarker;