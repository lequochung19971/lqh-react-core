import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextFieldProps,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AddressType, provinceTypes, districtTypes, wardTypes } from '@shared/enums';
import districtsJson from '@shared/json-configs/districts.json';
import provincesJson from '@shared/json-configs/provinces.json';
import wardsJson from '@shared/json-configs/wards.json';
import { Address, AddressModel } from '@shared/models';
import { InputDialogField, LqhButton } from '@shared/ui-elements';

export const provinces = provincesJson.map((p) => new Address(p));
export const districts = districtsJson.map((d) => new Address(d));
export const wards = wardsJson.map((w) => new Address(w));
type AddressDialogFieldProps = TextFieldProps & {
  onSave?: () => void;
};

const AddressDialogField = React.forwardRef<any, AddressDialogFieldProps>(function AddressDialogField(props, ref) {
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [dataSource, setDataSource] = useState(provinces);
  const addressModel = useRef<AddressModel>({} as AddressModel);

  const selectAddress = (address: Address) => {
    if (!addressModel.current.province && provinceTypes.includes(address.type as AddressType)) {
      addressModel.current.province = address;
      const matchedDistrict = districts.filter((d) => d.parentCode === address.code);
      setDataSource(matchedDistrict);
      return;
    }

    if (!addressModel.current.district && districtTypes.includes(address.type as AddressType)) {
      addressModel.current.district = address;
      const matchedWards = wards.filter((w) => w.parentCode === address.code);
      setDataSource(matchedWards);
      return;
    }

    if (!addressModel.current.ward && wardTypes.includes(address.type as AddressType)) {
      addressModel.current.ward = address;
      return;
    }
  };

  const handleCloseDialog = () => {
    setOpenAddressDialog(false);
  };

  useEffect(() => {
    const resetDialogData = () => {
      if (!openAddressDialog) {
        addressModel.current =
          addressModel.current.district || addressModel.current.ward || addressModel.current.province
            ? ({} as AddressModel)
            : addressModel.current;
        setDataSource(provinces);
      }
    };
    resetDialogData();
  }, [openAddressDialog]);

  return (
    <InputDialogField
      {...props}
      ref={ref}
      onClick={() => setOpenAddressDialog(true)}
      dialogProps={{
        open: openAddressDialog,
        onClose: () => handleCloseDialog(),
        maxWidth: 'md',
        fullWidth: true,
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" width="100%">
          <span>Address Information</span>
          <IconButton edge="start" color="inherit" onClick={() => setOpenAddressDialog(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <List component="nav">
          {dataSource.map((province) => (
            <>
              <ListItem key={province.type} button onClick={() => selectAddress(province)}>
                <ListItemText>{province.name}</ListItemText>
              </ListItem>
            </>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <LqhButton color="secondary" variant="contained" size="large">
          Save
        </LqhButton>
        <LqhButton color="secondary" variant="outlined" size="large">
          Cancel
        </LqhButton>
      </DialogActions>
    </InputDialogField>
  );
});

export default AddressDialogField;
