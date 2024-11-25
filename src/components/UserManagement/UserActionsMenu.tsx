import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface UserActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const UserActionsMenu: React.FC<UserActionsMenuProps> = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(); onEdit(); }}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); onDelete(); }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserActionsMenu;
