import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DragItem from "./DragItem";
import { Grid, GridImage, GridItem } from "./Grid";
import GridContext from "./GridContext";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  overlay: {
    width: '100%',
    height: '100%',
    background: 'black',
    opacity: .8,
  },
  positionFixed: {
    position: 'fixed',
    top: 0,
  },
  dragglePopUp: {
    width: '100%',
    maxWidth: '600px',
    maxHeight: '600px',
    overflow: 'scroll',
    bottom:0,
    margin: 'auto',
    padding: '50px',
    paddingBottom: '150px', 
    background: 'white'
  },  
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  button: {
    margin: '10px auto 0'
  }
}));

function GridPopUp(props) {
  const { items, moveItem, saveMoveItem, remove } = useContext(GridContext);
  const classes = useStyles();
  const onSave = () => {
    saveMoveItem();
    props.toggle(false);
  }
  return (
    <div className={classes.root}>
      <div className={`${classes.positionFixed} ${classes.overlay}`}></div>
      <div className={`${classes.positionFixed} ${classes.dragglePopUp}`}>
      <Box display="flex" justifyContent="end">
        <IconButton onClick={() => {props.toggle(false)}}>
          <CloseIcon />
        </IconButton>
        </Box>
        <Grid>
          {items.map((item, index) => (
            <DragItem key={item.id} id={item.id} onMoveItem={moveItem}>
              <GridItem>
                <GridImage src={item.src}>
                    <GridListTileBar
                    title={index + 1}
                    actionIcon={
                      <IconButton className={classes.icon} onClick={() => { remove(index) }}>
                        <DeleteForeverIcon />
                      </IconButton>
                    }
                  />
                </GridImage>
              </GridItem>
            </DragItem>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center">
        <Button 
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => {onSave()}}
          >save</Button>
        </Box>
      </div>
    </div>  
  );
}

export default GridPopUp;
