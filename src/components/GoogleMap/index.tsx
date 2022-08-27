import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { Airport } from "../../utils/types";
import { useSelector } from "react-redux";

const GoogleMap = () => {
  const startingPoint: Airport = useSelector((state: any) => state.start);
  const destination: Airport = useSelector((state: any) => state.destination);

  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(1);
  const [maps, setMaps] = useState();
  const [flightPath, setFlightPath] = useState<any>(null);

  useEffect(() => {
    const renderPolylines = (maps: any) => {
      console.log(
        "render polyline",
        { lat: startingPoint.lat, lng: startingPoint.long },
        { lat: destination.lat, lng: destination.long }
      );
      /* render geodesic polyline */
      let geodesicPolyline = new maps.maps.Polyline({
        path: [
          { lat: Number(startingPoint.lat), lng: Number(startingPoint.long) },
          { lat: Number(destination.lat), lng: Number(destination.long) },
        ],
        geodesic: true,
        strokeColor: "#00a1e1",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });
      if (flightPath) flightPath.setMap(null);
      geodesicPolyline.setMap(maps.map);
      setFlightPath(geodesicPolyline);
    };
    if (
      maps &&
      startingPoint.AirportCode != "" &&
      destination.AirportCode != ""
    ) {
      renderPolylines(maps);
    }
  }, [startingPoint, destination]);

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI" }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={(maps: any) => setMaps(maps)}
      >
        <Marker
          lat={startingPoint.lat}
          lng={startingPoint.long}
          name="Source Airport"
          color="blue"
        />
        <Marker
          lat={destination.lat}
          lng={destination.long}
          name="Destination Airport"
          color="red"
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
