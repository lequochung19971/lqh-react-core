import { makeStyles } from "@material-ui/core";

export const useEmployeeStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
	tableHeaderCell: {
		fontWeight: 600
	}
});

export const useFormDialogStyles = makeStyles({
  appBar: {
    position: 'relative'
  }
});

export const useFormStyles = makeStyles({
  textField: {
    margin: '8px'
  }
})