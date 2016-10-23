import {Container, Column, Row} from './grid-helpers';

export const TwoColumnGrid = (col1, col2) =>
  Container([
    Row([
      Column(col1),
      Column(col2)
    ])
  ]);

export const ThreeColumnGrid = (col1, col2, col3) =>
  Container([
    Row([
      Column(col1),
      Column(col2),
      Column(col3)
    ])
  ]);

