import type { ReactNode } from 'react';

type IMainProps = {
  nav?: boolean;
  footer?: boolean;
  meta?: ReactNode;
  children: ReactNode;
};

const defaultProps = {
  nav: true,
  footer: true,
};

const Main = (passProps: IMainProps) => {
  const props: IMainProps = {
    ...defaultProps,
    ...passProps,
  };

  return (
    <div>
      {props.meta}
      {props.nav}
      <main > 
        {props.children}
      </main>
    </div>
  );
  
};

export { Main };
