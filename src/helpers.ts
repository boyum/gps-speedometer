const toRad = (num: number): number => num * (Math.PI / 180);

const computeDistance = (
  previousPosition: GeolocationPosition,
  newPosition: GeolocationPosition,
  metersAboveSeaLevel: number,
) => {
  const earthRadius = 6.371e6;
  const radius = earthRadius + metersAboveSeaLevel;

  const prevLatitude = toRad(previousPosition.coords.latitude);
  const newLatitude = toRad(newPosition.coords.latitude);

  const dLat = toRad(
    newPosition.coords.latitude - previousPosition.coords.latitude,
  );
  const dLong = toRad(
    newPosition.coords.longitude - previousPosition.coords.longitude,
  );

  const angle =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(prevLatitude) * Math.cos(newLatitude) * Math.sin(dLong / 2) ** 2;

  const angularDistance =
    2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));

  const distance = radius * angularDistance;

  return distance;
};

export const calculateVelocity = (
  previousPosition: GeolocationPosition,
  newPosition: GeolocationPosition,
  metersAboveSeaLevel: number = 0,
): number | null => {
  const timeDifferenceInSeconds =
    (newPosition.timestamp - previousPosition.timestamp) / 1000;

  const distance = computeDistance(
    previousPosition,
    newPosition,
    metersAboveSeaLevel,
  );
  const velocity = distance / timeDifferenceInSeconds;

  if (Number.isNaN(velocity)) {
    console.log(
      `
      Velocity is NaN. 
      Previous position: ${JSON.stringify(previousPosition, undefined, "  ")}
      New position: ${JSON.stringify(newPosition, undefined, "  ")}
      Distance: ${JSON.stringify(distance, undefined, "  ")}
      Time diff: ${JSON.stringify(timeDifferenceInSeconds, undefined, "  ")}
    `,
      previousPosition,
      newPosition,
    );

    return null;
  }

  return velocity;
};

export const formatVelocity = (velocity: number): string => {
  return (Math.round(velocity * 100) / 100).toString();
};
