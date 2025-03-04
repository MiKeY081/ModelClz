// frontend/src/components/ListItem.tsx
import React from 'react';

interface ListItemProps {
  content: string;
}

const ListItem: React.FC<ListItemProps> = ({ content }) => (
  <div className="py-2 text-gray-700">{content}</div>
);

export default ListItem;