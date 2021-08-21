import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, styled } from '@material-ui/core';
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
  // console.log(routeConfigs);
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
    </Suspense>
  );
};

export default SamplePage;
