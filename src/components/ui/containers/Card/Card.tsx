import classnames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

export interface CardProps extends ComponentProps<'div'> {
  block?: boolean;
  title?: string;
  footer?: JSX.Element;
  variant?: 'primary' | 'secondary' | 'dark';
}

/**
 * Object allowing to display information from a comparative approach.
 * @param props
 * @param props.children {@link PropsWithChildren.children}
 * @param props.footer Element to display at the bottom of the component.
 * @param props.title Component's title.
 * @param props.variant Color theme of the card.
 */
const Card: FC<PropsWithChildren<CardProps>> = ({ children, className, footer, title, variant }) => {
  let classes = '';

  switch (variant) {
    case 'primary':
      classes = 'bg-primary';
      break;
    case 'secondary':
      classes = 'bg-secondary';
      break;
    case 'dark':
      classes = 'bg-neutral';
      break;
  }

  return (
    <div className={classnames('bg-white rounded-2xl shadow-[0px_10px_30px_rgba(0,0,0,0.05)]', className, classes)}>
      {title && <h2 className={classnames('font-medium m-0')}>{title}</h2>}
      <div className="flex flex-col grow">{children}</div>
      {footer && <div className="mt-8 mb-5">{footer}</div>}
    </div>
  );
};
export default Card;
