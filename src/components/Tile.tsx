import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Tile = ({
  value,
  onClick,
  x,
  y,
}: {
  value: number | null;
  onClick: (x: number, y: number) => void;
  x: number;
  y: number;
}) => {
  const [bgColor, setBgColor] = useState<string | null>();

  useEffect(() => {
    if (value) {
      setBgColor("yellow");
      const timer = setTimeout(() => {
        setBgColor("white");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <StyledTile
      onClick={() => onClick(x, y)}
      style={{ backgroundColor: bgColor || "white" }}
    >
      {value}
    </StyledTile>
  );
};

export default React.memo(Tile);

const StyledTile = styled.div`
  display: flex;
  border: 0.3px solid rgba(0, 0, 0, 0.24);
  height: 40px;
  min-width: 40px;
  margin: 1px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 10%;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;
