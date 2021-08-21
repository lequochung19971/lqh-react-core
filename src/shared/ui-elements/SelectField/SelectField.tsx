import React from 'react';
import { MenuItem, TextField, TextFieldProps } from '@material-ui/core';
import { nanoid } from '@reduxjs/toolkit';
import { SelectDataSource } from '@shared/types/selectDataSource.type';

type SelectFieldProps = TextFieldProps & {
  dataSource?: SelectDataSource[];
};

export const SelectField = React.forwardRef<any, SelectFieldProps>(function SelectField(props, ref) {
  const { dataSource, ...FieldProps } = props;
  return (
    <TextField ref={ref} {...FieldProps} select>
      {(dataSource ?? []).map((source) => (
        <MenuItem key={nanoid()} value={source.value ?? ''}>
          {source.label ?? ''}
        </MenuItem>
      ))}
    </TextField>
  );
});
