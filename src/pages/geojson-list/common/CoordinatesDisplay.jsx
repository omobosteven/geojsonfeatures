export const CoordinatesDisplay = ({ coordinates }) => {
  const getCoordinates = (points) => {
    return (
      <ul>
        [
        {typeof points[0] === "number" ? (
          <span>
            {points[0]}, {points[1]}
          </span>
        ) : (
          points.map((point) => Array.isArray(point) && getCoordinates(point))
        )}
        ]
      </ul>
    );
  };

  return <>{getCoordinates(coordinates)}</>;
};
