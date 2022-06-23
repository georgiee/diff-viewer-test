import React, { useState } from "react";
import styled from "styled-components";
import * as diffTypes from './types';

interface LineProps {
  line: diffTypes.Line;
  addDraft: Function
}

const LineContainer = styled.div<{ type: "context" | "add" | "remove" }>`
  display: grid;
  grid-template-columns: 50px 50px 30px 30px auto 1fr;
  white-space: pre;

  padding-left: 16px;
  background-color: ${({ type }) => getLineColor(type)};
`;

const ActionContainer = styled.div`
  color: blue;
  cursor: pointer;
`;

const getLineColor = (type: string) => {
  switch (type) {
    case "add":
      return "#ecfdf0";
    case "remove":
      return "#fbe9eb";
  }
};

const getLineGutter = (type: string) => {
  switch (type) {
    case "add":
      return "+";
    case "remove":
      return "-";
  }
};

export const Line = ({ line, addDraft }: LineProps) => {
  const [hoverActive, setHoverActive] = useState(false);

  return (
    <>
      <LineContainer
        title={line.locator.join(',')}
        type={line.type}
        onMouseEnter={() => setHoverActive(true)}
        onMouseLeave={() => setHoverActive(false)}
      >
        <div>{line.original_line_number}</div>
        <div>{line.new_line_number}</div>
        
        <ActionContainer onClick={() => addDraft(line.locator)}>
          {hoverActive && "+"}
        </ActionContainer>
        
        <div>{getLineGutter(line.type)}</div>
        <div>{line.content}</div>
      </LineContainer>
    </>
  );
};
