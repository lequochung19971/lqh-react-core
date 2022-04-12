import { WrapperDialogProps } from '@shared/components/Dialog/type';
import SampleConfirmDialogs from '../components/SampleConfirmDialogs';
import SampleFormDialogBtn from '../components/SampleFormDialogBtn';
import SampleFullScreenDialogBtn from '../components/SampleFullScreenDialogBtn';
import SampleNestedDialogBtn from '../components/SampleNestedDialogBtn';

const SampleDialogPage: React.FunctionComponent<WrapperDialogProps> = () => {
  return (
    <>
      <SampleNestedDialogBtn />
      <SampleFormDialogBtn />
      <SampleFullScreenDialogBtn />
      <SampleConfirmDialogs />
    </>
  );
};

export default SampleDialogPage;
