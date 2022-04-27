import SampleConfirmDialogs from '../components/SampleConfirmDialogs';
import SampleFormDialogBtn from '../components/SampleFormDialogBtn';
import SampleFullScreenDialogBtn from '../components/SampleFullScreenDialogBtn';
import SampleNestedDialogBtn from '../components/SampleNestedDialogBtn';

const SampleDialogPage: React.FunctionComponent = () => {
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
