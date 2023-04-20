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

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      if (latitude && longitude) {
        setPosition({ latitude, longitude });
      }
    });
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
