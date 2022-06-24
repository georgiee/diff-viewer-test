import React, { useMemo, useState } from "react";
import styled from "styled-components";
import * as diffTypes from './types';
import { locatorEqual } from '../utils';
import { useStore } from '../providers/NotesContext';
import { DiffMode, NoteType } from '../../types';
import { NoteRenderer } from '../notes/NoteRenderer';

interface LineProps {
  line: diffTypes.Line;
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


export const Line = ({ line }: LineProps) => {
  const [hoverActive, setHoverActive] = useState(false);

  const notes = useStore((state) => state.notes)
  const mode = useStore((state) => state.mode)
  const addDraft = useStore((state) => state.createDraft)
  
  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, line.locator)), [notes]);
  
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

        {
          (mode !== DiffMode.INTERVIEW) && (
            <ActionContainer onClick={() => addDraft && addDraft(line.locator)}>
              {hoverActive && "+"}
            </ActionContainer>
          )
        }
        
        <div>{getLineGutter(line.type)}</div>
        <div>{line.content}</div>
      </LineContainer>
      
      <NoteRenderer notes={matchingNotes}/>
    </>
  );
};
