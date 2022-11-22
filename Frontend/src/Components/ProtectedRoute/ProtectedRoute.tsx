import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { ComponentType } from 'react';
import { IProduct } from '../../interfaces/IProduct';

interface ProtectedRouteProps {
  component: ComponentType<any>;
  props?: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  props,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div className="page-layout">PageLoader</div>,
  });

  return <Component {...props} />;
};
