import { useCallback, useEffect, useState } from "react";
import { generateEmptyMatrix, updateMatrix } from "../utils/helpers";
import styled from "styled-components";
import Tile from "./Tile";
import produce from "immer";

const Page = () => {
  const [pageData, setPageData] = useState<(number | null)[][]>([[null]]);
  useEffect(() => {
    const output = generateEmptyMatrix(50);
    setPageData(output);
  }, []);

  const onTileClicked = useCallback((x: number, y: number) => {
    // @ts-ignore
    setPageData((current) => {
      return produce(current, (draft: any) => {
        updateMatrix(draft, x, y);
      });
    });
  }, []);

  return (
    <>
      {pageData?.map((row, rowKey) => {
        return (
          <Row key={rowKey}>
            {row.map((item, itemKey) => {
              return (
                <Tile
                  key={itemKey}
                  value={item}
                  x={itemKey}
                  y={rowKey}
                  onClick={onTileClicked}
                />
              );
            })}
          </Row>
        );
      })}
    </>
  );
};

export default Page;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
