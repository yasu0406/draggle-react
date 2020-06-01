import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridPopUp from './DragPopUp';
import GridContext from "./GridContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  cardMedia: {
    height: '500px'
  }
  ,
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  }
}));

function App(props) {
  const { saveItems } = useContext(GridContext);
  const [Toggle, setToggle] = useState(false);
  const classes = useStyles();
  return (
    <div className="App">
      {
        saveItems.length > 0 && <CardMedia
        className={classes.cardMedia}
        image={saveItems[0].src}
        onClick={() => setToggle(true)}
        />
      }
      
      <div className={classes.root}>
      <GridList className={classes.gridList} cols={5} cellHeight={100}>
        {saveItems.map((saveItem, index) => {
          if(index > 0) {
            return (
              <GridListTile key={saveItem.id} onClick={() => setToggle(true)}><img src={saveItem.src} /></GridListTile>
            )
          }
        })}
      </GridList>
      {Toggle && <GridPopUp toggle={() => setToggle(false)}/>}
    </div>
    </div>
  );
}

export default App;
