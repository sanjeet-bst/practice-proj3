import React, { Component, Suspense } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import logo from './logo.svg';
import './App.css';

import Header from './components/header'
import { Dashboard } from './components/dashboard'

// Component using the Trans component
function MyComponent() {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  );
}

// page uses the hook
function Page() {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
     <Header changeLanguage={changeLanguage} />
      <div className="App-intro">
        {/* <MyComponent /> */}
        <Dashboard/>
      </div>
    </div>
  );
}









// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}
