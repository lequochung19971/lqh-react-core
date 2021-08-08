import { SelectDataSource } from '@shared/types/selectDataSource.type';

export const positionDataSource: { id: string; data: SelectDataSource<string>[] }[] = [
  {
    id: 'dep1',
    data: [
      {
        label: 'Department 1 - Position 1',
        value: 'pos11',
      },
      {
        label: 'Department 1 - Position 2',
        value: 'pos12',
      },
    ],
  },
  {
    id: 'dep2',
    data: [
      {
        label: 'Department 2 - Position 1',
        value: 'pos21',
      },
      {
        label: 'Department 2 - Position 2',
        value: 'pos22',
      },
    ],
  },
];
