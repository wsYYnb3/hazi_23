import React, { useState } from "react";
import { runRace } from "../controllers/raceController";
export default function RaceView() {
  const [bet, setBet] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  function handleRace() {
    const validBets = ["piros", "zöld", "kék"];
    if (!validBets.includes(bet.toLowerCase())) {
      setError(
        "Helytelen fogadás! Csak 'piros', 'zöld', vagy 'kék' választható."
      );
      setResult(null);
      return;
    }

    setError("");
    setResult(runRace(bet.toLowerCase()));
  }

  return (
    <div className='p-4 bg-gray-100 min-h-screen flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4'>Snail Race</h1>
      <input
        value={bet}
        onChange={(e) => setBet(e.target.value)}
        placeholder='Melyik csigára fogadsz?'
        className='border p-2 mb-4 rounded'
      />
      <button
        onClick={handleRace}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Futtatás
      </button>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      {result && (
        <div className='mt-6 w-full max-w-lg'>
          <h2 className='text-xl font-bold'>{result.message}</h2>
          <div className='mt-4'>
            <h3 className='font-bold'>Részletek:</h3>
            {result.events.map((event, index) => (
              <div key={index} className='mb-2'>
                <p className='font-medium'>
                  {event.lap}. kör:{" "}
                  {event.boosters
                    ? `Boostert kapott: ${event.boosters}`
                    : "Nem volt booster"}
                </p>
                <p>
                  Pozíciók:{" "}
                  {event.positions
                    .map((s, idx) => `${idx + 1}. ${s.color}`)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
          <div className='mt-6 flex justify-around'>
            {result.standings.map((snail, idx) => (
              <div
                key={snail.color}
                className={`flex flex-col items-center ${
                  idx === 0
                    ? "bg-yellow-300"
                    : idx === 1
                    ? "bg-gray-300"
                    : "bg-orange-300"
                } p-4 rounded`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    snail.color === "piros"
                      ? "bg-red-500"
                      : snail.color === "zöld"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <p>{snail.color}</p>
                <p>{snail.distance} távolság</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
