import React from 'react';
import { Teaser } from '../../content/teaser/teaser';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { SyPersonioJob } from '../../../types';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TeaserGrid } from '../../content/teaser/teaser-grid';
import { up } from '../../support/breakpoint';

const SectionHeadline = styled.h2`
  ${TextStyles.headlineL}
  margin: 0;
  margin-bottom: 80px;

  ${up('md')} {
    ${TextStyles.headlineXL}
  }
`;

interface OpeningsProps {
  jobs: SyPersonioJob[];
}

export const Openings = (props: OpeningsProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <SectionHeadline>{t('career.openings.headline')}</SectionHeadline>
      <TeaserGrid>
        {props.jobs.map((item) => (
          <Teaser title={item.name} linkTo={item.slug} key={item.id}>
            {item.short}
          </Teaser>
        ))}
      </TeaserGrid>
    </div>
  );
};
