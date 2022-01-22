import React, { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, styled } from '@mui/material';
import { ConfirmDialog } from '@shared/components/Dialog/ConfirmDialog/ConfirmDialog';
import useConfirmDialog from '@shared/components/Dialog/ConfirmDialog/useConfirmDialog';
import useDialog from '@shared/components/Dialog/useDialog';
import { useRouterContext } from '@shared/components/Routers/RouterContext';
import { pageLoading } from '@store/loading/slices';
import { useDispatch } from '@store';

const Wrapper = styled('div')({
  '& img': {
    width: '100%',
  },
});

const SamplePage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(pageLoading.open());
    setTimeout(() => {
      dispatch(pageLoading.close());
    }, 2000);
  };
  const { i18n, t } = useTranslation();
  const { routeConfigs } = useRouterContext();
  const confirmDialog = useConfirmDialog();
  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(1);

  useEffect(() => {
    setCount2(30);
    setCount2(30);
    setCount2(30);
    setCount2(30);
  }, [count]);

  const handleOpenDialog = () => {
    confirmDialog.open().then((value: any) => {
      console.log(value);
    });
  };

  const handleOpenDialog2 = () => {
    confirmDialog.open().then((value: any) => {
      console.log(value);
    });
  };

  return (
    <Suspense fallback={<div>Loading....</div>}>
      <div>Test Translation: {t('test')}</div>
      <Button
        color="primary"
        variant="contained"
        disabled={i18n.language === 'en'}
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </Button>
      <Button
        color="secondary"
        variant="contained"
        disabled={i18n.language === 'vi'}
        onClick={() => i18n.changeLanguage('vi')}
      >
        VI
      </Button>
      <Wrapper>
        <button onClick={onClick}>Click me!!!!</button>
      </Wrapper>
      <Link to="/login">Login</Link>
      <Link to="/other">Other link</Link>
      <Button color="secondary" onClick={handleOpenDialog}>
        Open dialog 1
      </Button>
      <Button color="secondary">Close dialog 1</Button>
      <Button color="primary" onClick={handleOpenDialog2}>
        Open dialog 2
      </Button>
      <Button color="primary">Close dialog 2</Button>
    </Suspense>
  );
};

export default SamplePage;
