import React from 'react';
import styled from 'styled-components';
import { up } from '../../style-utils/breakpoint';
import { isNoneTouch } from '../../style-utils/is-touch';

const ScrollContainer = styled.div`
  overflow: hidden;

  ${isNoneTouch()} {
    overflow-x: scroll;

    /**
     * we push to content box over it's boundaries to have some distance to
     * to scroll bar
     */
    padding-bottom: 16px;
    margin-bottom: -16px;
  }

  /**
   * we stretch the container on the left and right over the PageLayout, 
   * so that they scroll from side to side
   */
  margin-right: -24px;
  margin-left: -24px;
  padding-left: 24px;

  ${up('md')} {
    overflow: hidden;

    margin-right: 0;
    margin-left: 0;
    padding-left: 0;
  }
`;

const StyledTeaserGrid = styled.div<{ amountOfChildren: number }>`
  display: grid;
  gap: 24px;

  justify-items: stretch;

  /**
   * we give the last element 24px more space for the padding 
   * -> distance to outer window
   */
  grid-template-columns: ${(props) =>
    `repeat(${props.amountOfChildren - 1}, minmax(224px, 1fr)) 248px`};

  > :last-child {
    padding-right: 24px;
  }

  ${up('md')} {
    gap: 70px;
    grid-template-columns: ${(props) =>
      props.amountOfChildren > 3 ? '1fr 1fr' : '1fr 1fr 1fr'};
  }
`;

interface TeaserGridProps {
  children: React.ReactNode | React.ReactNode[];
}

export const TeaserGrid = (props: TeaserGridProps): JSX.Element => {
  const amountOfChildren = React.Children.count(props.children);

  return (
    <ScrollContainer>
      <StyledTeaserGrid amountOfChildren={amountOfChildren}>
        {props.children}
      </StyledTeaserGrid>
    </ScrollContainer>
  );
};
