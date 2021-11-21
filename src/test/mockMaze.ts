import { Maze } from '@/model/maze';

export const MOCK_MAZE: Maze = [
  [
    {
      walls: {
        top: true,
        bottom: false,
        left: true,
        right: true,
      },
      coordinates: {
        x: 0,
        y: 0,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: false,
        left: true,
        right: false,
      },
      coordinates: {
        x: 1,
        y: 0,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: true,
        left: false,
        right: false,
      },
      coordinates: {
        x: 2,
        y: 0,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: true,
        left: false,
        right: false,
      },
      coordinates: {
        x: 3,
        y: 0,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: true,
        left: false,
        right: true,
      },
      coordinates: {
        x: 4,
        y: 0,
      },
      visitedDuringGenerating: true,
    },
  ],
  [
    {
      walls: {
        top: false,
        bottom: false,
        left: true,
        right: true,
      },
      coordinates: {
        x: 0,
        y: 1,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: false,
        bottom: false,
        left: true,
        right: true,
      },
      coordinates: {
        x: 1,
        y: 1,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: false,
        left: true,
        right: false,
      },
      coordinates: {
        x: 2,
        y: 1,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: true,
        left: false,
        right: false,
      },
      coordinates: {
        x: 3,
        y: 1,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: false,
        left: false,
        right: true,
      },
      coordinates: {
        x: 4,
        y: 1,
      },
      visitedDuringGenerating: true,
    },
  ],
  [
    {
      walls: {
        top: false,
        bottom: false,
        left: true,
        right: true,
      },
      coordinates: {
        x: 0,
        y: 2,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: false,
        bottom: false,
        left: true,
        right: false,
      },
      coordinates: {
        x: 1,
        y: 2,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: false,
        bottom: true,
        left: false,
        right: false,
      },
      coordinates: {
        x: 2,
        y: 2,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: true,
        left: false,
        right: true,
      },
      coordinates: {
        x: 3,
        y: 2,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: false,
        bottom: false,
        left: true,
        right: true,
      },
      coordinates: {
        x: 4,
        y: 2,
      },
      visitedDuringGenerating: true,
    },
  ],
  [
    {
      walls: {
        top: false,
        bottom: false,
        left: true,
        right: true,
      },
      coordinates: {
        x: 0,
        y: 3,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: false,
        bottom: true,
        left: true,
        right: true,
      },
      coordinates: {
        x: 1,
        y: 3,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: false,
        left: true,
        right: false,
      },
      coordinates: {
        x: 2,
        y: 3,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: true,
        left: false,
        right: false,
      },
      coordinates: {
        x: 3,
        y: 3,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: false,
        bottom: false,
        left: false,
        right: true,
      },
      coordinates: {
        x: 4,
        y: 3,
      },
      visitedDuringGenerating: true,
    },
  ],
  [
    {
      walls: {
        top: false,
        bottom: true,
        left: true,
        right: false,
      },
      coordinates: {
        x: 0,
        y: 4,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: true,
        left: false,
        right: false,
      },
      coordinates: {
        x: 1,
        y: 4,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: false,
        bottom: true,
        left: false,
        right: true,
      },
      coordinates: {
        x: 2,
        y: 4,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: true,
        bottom: true,
        left: true,
        right: false,
      },
      coordinates: {
        x: 3,
        y: 4,
      },
      visitedDuringGenerating: true,
    },
    {
      walls: {
        top: false,
        bottom: true,
        left: false,
        right: true,
      },
      coordinates: {
        x: 4,
        y: 4,
      },
      visitedDuringGenerating: true,
    },
  ],
];

export const USER_EVENT_SOLUTION =
  '{arrowdown}{arrowdown}{arrowdown}{arrowdown}{arrowright}{arrowright}{arrowup}{arrowright}{arrowright}{arrowdown}';
