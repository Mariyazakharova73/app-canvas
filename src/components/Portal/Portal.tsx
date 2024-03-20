import { PropsWithChildren, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode; // элемент
  element?: HTMLElement; // место назначения
}

const Portal = ({
  children,
  element = document.body,
}: PropsWithChildren<PortalProps>) => {
  return createPortal(children, element);
};

export default Portal;
