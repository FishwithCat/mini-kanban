import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';



export const StyledTooltip = withStyles((theme: Theme) => ({
    tooltipPlacementBottom: {
        marginTop: '7px'
    },
    tooltipPlacementLeft: {
        marginRight: '0px',
    },
    arrow: {
        right: '-1px !important'
    }
}))(Tooltip);