import { useState, useRef, useEffect } from "react";
const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

export default function Home() {
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
    if ("geolocation" in navigator) {
      setAvailable(true);
    }
  }, [isAvailable]);
  type Error = {
    code: number;
  };
  const error = (err: Error) => {
    switch (err.code) {
      case 1:
        // 位置情報を利用する権限が無い場合
        alert("権限なし(code:" + err.code + ")");
        break;
      case 2:
        // 電波状況等により位置情報が取得できなかった場合
        alert("位置情報取得失敗(code:" + err.code + ")");
        break;
      case 3:
        // 位置情報取得に時間がかかり過ぎて接続がタイムアウトした場合
        alert("タイムアウト(code:" + err.code + ")");
        break;
      default:
        // 上記以外の原因不明エラー
        alert("原因不明(code:" + err.code + ")");
    }
  };
  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          setPosition({ latitude, longitude });
        }
      }, error);
    } else {
      // Geolocation APIに対応していない端末
      alert("位置情報サービス非対応");
    }
  };

  if (isFirstRef.current) return <div className="App">Loading...</div>;

  return (
    <div className="App">
      <div className="mx-10">
        <p>Geolocation API Sample</p>
        {!isFirstRef && !isAvailable && <ErrorText />}
        {isAvailable && (
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
              onClick={getCurrentPosition}
            >
              座標取得
            </button>
            <div>
              緯度: {position.latitude}
              <br />
              経度: {position.longitude}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
