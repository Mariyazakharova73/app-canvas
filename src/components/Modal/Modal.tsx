import cn from 'classnames';
import {
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Portal from '../Portal/Portal';
import s from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { children, isOpen, onClose } = props;
  // for animation when closing a modal
  const [isClosing, setIsClosing] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onContentClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (
    <Portal>
      <div
        className={cn(s.Modal, {
          [s.opened]: isOpen,
          [s.isClosing]: isClosing,
        })}
      >
        <div
          className={s.overlay}
          onClick={closeHandler}
          role="button"
          tabIndex={0}
          // @ts-ignore
          onKeyDown={onKeyDown}
        >
          <div
            className={s.content}
            role="button"
            tabIndex={0}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
