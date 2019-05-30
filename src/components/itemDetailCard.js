import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ButtonComp from './button'
import { decoratedImageUrl } from '../utils/request'
import ItemCardBig from './itemCardBig'
const styles = {
  root: {
    flexGrow: 1
  },
  box: {
    maxWidth: '940px',
    height: '625px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop:0,
    marginBottom:0
  },
  title: {
    fontSize: '1rem'
  },
  justify: {
    display: 'flex',
    justifyContent: 'center'
  }
}

class ItemDetailCard extends Component {
  state = {

  }
  render() {
    const { classes, title, style, bgcolor, image, box, productDetails } = this.props

    return (
      <div className={classes.justify}>
        <Box
          boxShadow={3}
          bgcolor={bgcolor ? bgcolor : '#FFFFFF'}
          m={0}
          p={1}

          className={box === 1 ? classes.box2 : classes.box}
        >
          <ItemCardBig productDetails={productDetails} bgcolor={bgcolor}/>
        </Box>
      </div>
    )
  }
}

export default withStyles(styles)(ItemDetailCard)
