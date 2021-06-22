import React from 'react';
import { Header, HeaderName } from 'carbon-components-react';

const HeaderCRUD = (prop) => {
  const { ariaLabel, prefix, children } = prop;
  return (
    <Header aria-label={ariaLabel}>
    <HeaderName prefix={prefix}>{children}</HeaderName>
  </Header>
  );
};

export default HeaderCRUD;