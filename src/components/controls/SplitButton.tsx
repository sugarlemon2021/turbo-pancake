import { Dispatch, FC, MouseEvent, useRef, useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Button from './Button';

type Props = {
  ariaLabel: string;
  indexState: [number, Dispatch<number>];
  options: Array<string>;
  setSelectedDate: Dispatch<Date | null>;
};

const SplitButton: FC<Props> = ({ ariaLabel, options, indexState, setSelectedDate }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = indexState;

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setSelectedDate(null);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: MouseEvent<Document>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="contained" color="primary" disableElevation ref={anchorRef} aria-label="split button">
        <Button primary lg onClick={() => setSelectedDate(null)} className="px-2 border-r-0">
          {options[selectedIndex]}
        </Button>
        <Button
          primary
          lg
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label={ariaLabel}
          aria-haspopup="menu"
          onClick={handleToggle}
          className="min-w-0 px-2"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className="z-10">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SplitButton;
