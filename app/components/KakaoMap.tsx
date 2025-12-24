import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  lat: number;
  lng: number;
  setCustomValue?: (id: string, value: unknown) => void;
  detailPage?: boolean;
}

const KakaoMap = ({
  lat,
  lng,
  setCustomValue,
  detailPage = false,
}: KakaoMapProps) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY!, // 발급 받은 APPKEY
  });

  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (detailPage) return;

    setCustomValue!("lat", mouseEvent.latLng.getLat());
    setCustomValue!("lng", mouseEvent.latLng.getLng());
  };

  return (
    <Map
      center={{ lat, lng }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat, lng }} />
    </Map>
  );
};

export default KakaoMap;
