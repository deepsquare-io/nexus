// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import classnames from 'classnames';
import type { ComponentProps, FC, JSX, PropsWithChildren } from 'react';

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
