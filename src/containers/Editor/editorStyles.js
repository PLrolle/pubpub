import {globalStyles} from '../../utils/styleConstants';


export const styles = {
	editorContainer: {
		position: 'relative',
		color: globalStyles.sideText,
		fontFamily: globalStyles.headerFont,
		backgroundColor: globalStyles.sideBackground,
		height: 'calc(100vh - ' + globalStyles.headerHeight + ')',
	},
	editorContainerDark: {
		backgroundColor: '#272727',

	},
	errorTitle: {
		textAlign: 'center',
		fontSize: '45px',
		padding: 40,
	},
	isMobile: {
		display: 'none',
		'@media screen and (min-resolution: 3dppx), (max-width: 767px)': {
			display: 'block',
		},
	},
	mobileHeader: {
		textAlign: 'center',
		fontSize: '3em',
		paddingTop: 50,
	},
	mobileText: {
		textAlign: 'center',
		fontSize: '1.5em',
		padding: 20,
	},
	notMobile: {
		'@media screen and (min-resolution: 3dppx), (max-width: 767px)': {
			display: 'none',
		},
	},
	loading: {
		opacity: 0,
	}, 
	loaded: {
		opacity: 1
	},
	hiddenUntilLoad: {
		transition: '.3s linear opacity .25s',
	},
	editorTopNav: {
		position: 'fixed',
		top: 30,
		width: '100%',
		backgroundColor: globalStyles.sideBackground,
		zIndex: 10,
	},
	editorTopNavDark: {
		backgroundColor: '#272727',
	},
	editorLoadBar: {
		position: 'fixed',
		top: 60,
		width: '100%',
		zIndex: 10,
	},
	editorNav: {
		listStyle: 'none',
		height: globalStyles.headerHeight,
		width: '100%',
		margin: 0,
		padding: 0,
		
	},
	editorNavItem: {
		height: '100%',
		padding: '0px 20px',
		lineHeight: globalStyles.headerHeight,
		float: 'left',
		':hover': {
			cursor: 'pointer',
			color: globalStyles.sideHover,
		},
	},
	editorNavSeparator: {
		width: 1,
		backgroundColor: '#999',
		height: 'calc(' + globalStyles.headerHeight + ' - 16px)',
		margin: '8px 0px',
		float: 'left',
	},
	editorNavRight: {
		float: 'right',
	},
	alignRight: {
		textAlign: 'right',
	},
	floatRight: {
		float: 'right',
	},
	modalSplash: {
		opacity: 0,
		pointerEvents: 'none',
		width: '100vw',
		height: 'calc(100vh - 2 * ' + globalStyles.headerHeight + ')',
		position: 'fixed',
		top: 60,
		backgroundColor: 'rgba(255,255,255,0.7)',
		transition: '.1s linear opacity',
		zIndex: 100,
	},
	modalSplashActive: {
		opacity: 1,
		pointerEvents: 'auto',
	},
	modalContainer: {
		width: '76vw',
		minHeight: 400,
		maxHeight: 'calc(100vh - 150px)',
		overflow: 'hidden',
		overflowY: 'scroll',
		margin: '0 auto',
		position: 'absolute',
		top: 60,
		left: '12vw',
		backgroundColor: 'white',
		boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
		zIndex: 150,

		opacity: 0,
		pointerEvents: 'none',
		transform: 'scale(0.8)',
		transition: '.1s linear opacity, .1s linear transform',

		'@media screen and (min-width: 1600px)': {
			width: 1200,
			left: 'calc(50vw - 600px)',
		},

	},
	modalContainerActive: {
		opacity: 1,
		pointerEvents: 'auto',
		transform: 'scale(1.0)',
	},
	hiddenMainEditor: {
		height: 0,
		overflow: 'hidden',
		pointerEvents: 'none',
	},
	showAll: {
		padding: '0px 5px',
		display: 'none',
		color: globalStyles.veryLight,
		position: 'absolute',
		top: -1,
		left: 135,
		height: '30px',
		lineHeight: '30px',
		width: 73,
		':hover': {
			cursor: 'pointer',
			color: 'black',
		}

	},
	showAllVisible: {
		pointerEvents: 'auto',
		display: 'inline-block',
	},
	common: {
		editorBottomNav: {
			position: 'fixed',
			top: 60,
			width: '100%',
			pointerEvents: 'none',
			zIndex: 10,
		},
		editorMarkdown: {
			margin: '30px 0px',
			width: '50vw',
			zIndex: 5,

			position: 'fixed',
			height: 'calc(100vh - 60px - 2*' + globalStyles.headerHeight + ')',
			overflow: 'hidden',
			overflowY: 'scroll',
		},
		editorPreview: {
			width: 'calc(50% - 20px)',
			backgroundColor: '#fff',
			boxShadow: 'rgba(0,0,0,0.25) 0px 3px 9px 1px',
			position: 'fixed',
			right: 0,
			top: 61,
			height: 'calc(100vh - 61px)',
			overflow: 'hidden',
			overflowY: 'scroll',
			zIndex: 20,
			padding: 10
		},
		bottomNavBackground: {
			position: 'absolute',
			height: globalStyles.headerHeight,
			backgroundColor: globalStyles.sideBackground,
			transition: '.352s linear opacity',
			opacity: 0,
			top: 1,
			width: '50%',
		},
		bottomNavBackgroundDark: {
			backgroundColor: '#272727',
		},
		bottomNavLeft: {
			// backgroundColor: 'rgba(100,200,85, 0.4)',
			// width: '20%',
			// height: 'calc(100vh - 60px)',
			position: 'relative',
			float: 'left',
		},
		bottomNavRight: {
			// backgroundColor: 'rgba(200,100,85, 0.4)',
			// width: '20%',
			// height: 'calc(100vh - 60px)',
			float: 'right',
			position: 'relative',
		},
		bottomNavTitle: {
			height: globalStyles.headerHeight,
			lineHeight: globalStyles.headerHeight,
			padding: '0px 20px',
			color: globalStyles.veryLight,
			fontSize: '.9em',
		},
		bottomNavDivider: {
			width: '20vw',
			height: '1px',
			position: 'relative',
		},
		bottomNavDividerSmall: {
			backgroundColor: globalStyles.veryLight,
			width: '50%',
			height: '100%',
			margin: '0px 20px',
			position: 'absolute',
			top: 0,
		},
		bottomNavDividerRight: {
			right: 0,
		},
		bottomNavDividerLarge: {
			backgroundColor: globalStyles.veryLight,
			width: 'calc(25vw + 1px)',
			height: '100%',
			margin: '0px 0px',
			position: 'absolute',
			top: 0,
		},
		bottomNavDividerLargeRight: {
			right: 0,
		},
		bottomNavList: {
			listStyle: 'none',
			margin: 0,
			padding: 0,
			overflow: 'hidden',
			overflowY: 'scroll',
			maxHeight: 'calc(100vh - 90px)',
			opacity: 1,
			transition: '.352s linear opacity',
		},
		bottomNavListItem: {
			margin: '0px 20px',
			padding: '3px 0px',
			float: 'left',
			clear: 'both',
			color: globalStyles.veryLight,
			fontSize: '.8em',
			pointerEvents: 'auto',

			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			maxWidth: '15vw',
			':hover': {
				cursor: 'pointer',
				color: globalStyles.sideText,
			}
		},
		listItemActiveFocus: {
			color: 'black',
		}
	},

	edit: {
		editorMarkdown: {
			transition: '.352s linear transform, .3s linear opacity .25s, 0s linear padding .352s, 0s linear left .352s',
			transform: 'translateX(0%)',
			padding: globalStyles.headerHeight + ' 25vw',
			left: 0,
		},
		editorPreview: {
			transition: '.352s linear transform',
			transform: 'translateX(110%)',
		},
		bottomNavRight: {
			transition: '.352s linear transform',
			transform: 'translateX(0%)',
		},
		bottomNavDividerLarge: {
			transition: '.352s linear opacity',
			opacity: 0,
		},
		bottomNavBackground: {
			opacity: 0,
		},
	},

	preview: {
		editorBottomNav: {
			pointerEvents: 'none',
		},
		editorMarkdown: {
			transition: '.352s linear transform, .3s linear opacity .25s',
			transform: 'translateX(-50%)',
			padding: globalStyles.headerHeight + ' 0px',
			left: '25vw'
		},
		editorPreview: {
			transition: '.352s linear transform',
			transform: 'translateX(0%)',
		},
		bottomNavRight: {
			transition: '.352s linear transform',
			transform: 'translateX(-250%)',
		},
		bottomNavTitle: {
			pointerEvents: 'auto',
			':hover': {
				color: globalStyles.sideText,
				cursor: 'pointer',
			}
		},
		bottomNavDividerLarge: {
			transition: '.352s linear opacity',
			opacity: 1,
		},
		bottomNavBackground: {
			opacity: 1,
		},
		bottomNavList: {
			opacity: 0,
			backgroundColor: globalStyles.sideBackground,
			transition: '.1s linear opacity, 0s linear box-shadow 0.352s',
			boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.3)',
			
		},
		bottomNavListRight: {
			boxShadow: '-3px 3px 3px 0px rgba(0,0,0,0.3)',
		},
		bottomNavListItem: {
			pointerEvents: 'none',
		},
		listActive: {
			opacity: 1,	
		},
		listItemActive: {
			pointerEvents: 'auto',
			width: '100%',
		},
		listTitleActive: {
			color: globalStyles.sideText,
		}
	},
};

// CodeMirror styles function can be
// used to dynamically change font, size, color, etc
export function codeMirrorStyles(loginData) {
	const editorFont = loginData.getIn(['userData', 'settings', 'editorFont']);
	const editorFontSize = loginData.getIn(['userData', 'settings', 'editorFontSize']);
	const editorColor = loginData.getIn(['userData', 'settings', 'editorColor']);

	const editorStyles = {};

	switch (editorFont) {
	case 'serif':
		editorStyles.fontFamily = 'Arial';
		break;
	case 'sans-serif':
		editorStyles.fontFamily = 'Lato';
		break;
	case 'mono':
		editorStyles.fontFamily = 'Courier';
		break;
	default:
		editorStyles.fontFamily = 'Courier';
		break;
	}

	switch (editorFontSize) {
	case 'small':
		editorStyles.fontSize = '11px';
		break;
	case 'medium':
		editorStyles.fontSize = '15px';
		break;
	case 'large':
		editorStyles.fontSize = '19px';
		break;
	default:
		editorStyles.fontSize = '15px';
		break;
	}

	switch (editorColor) {
	case 'light':
		editorStyles.cursorColor = '#000';
		editorStyles.color = '#555';
		editorStyles.colorHeader = '#676767';
		editorStyles.colorTitle = '#575757';
		editorStyles.colorPPM = '#474747';
		editorStyles.colorCite = '#171717';
		break;
	case 'dark':
		editorStyles.cursorColor = '#fff';
		editorStyles.color = '#ddd';
		editorStyles.colorHeader = '#bbb';
		editorStyles.colorTitle = '#ccc';
		editorStyles.colorPPM = '#eee';
		editorStyles.colorCite = '#fff';
		break;
	default:
		editorStyles.color = '#555';
		break;
	}

	return {
		'.CodeMirror': {
			backgroundColor: 'transparent',
			fontSize: editorStyles.fontSize,
			color: editorStyles.color,
			fontFamily: editorStyles.fontFamily,
			padding: '0px 20px',
			width: 'calc(100% - 40px)',
			// fontFamily: 'Alegreya',
		},
		'.CodeMirror-cursors': {
			pointerEvents: 'none',
		},
		'.CodeMirror-cursor': {
			borderLeft: '1px solid ' + editorStyles.cursorColor,
		},
		'.cm-s-default .cm-header': {
			color: editorStyles.colorHeader,
		},
		'.cm-header-1': {
			fontSize: '20px',
		},
		'.cm-header-2': {
			fontSize: '18px',
		},
		'.cm-header-3': {
			fontSize: '16px',
		},
		'.cm-ppm': {
			color: editorStyles.colorPPM,
		},
		'.cm-ppm-title': {
			fontSize: '23px',
			color: editorStyles.colorTitle,
			fontWeight: 'bold',
		},
		'.cm-ppm-abstract': {
			fontSize: '16px',
		},
		'.cm-ppm-authorsNote': {
			fontSize: '14px',
		},
		'.cm-ppm-cite': {
			color: editorStyles.colorCite,
		},
		'.cm-plugin': {
			cursor: 'pointer',
			borderRadius: '2px',
			color: '#555',
		},
		'.cm-plugin-image': {
			backgroundColor: '#DAE8F8',
		},
		'.cm-plugin-video': {
			backgroundColor: '#DAF8E3',
		},
		'.cm-plugin-audio': {
			backgroundColor: '#F8ECDA',
		},
		'.cm-plugin-table': {
			backgroundColor: '#F1DAF8',
		},
		
	};
}

// Function to generate side-list fade in animations.
// Generates unique style per side and per item-depth
export function animateListItemStyle(side, status, index) {
	const statusOffset = { loaded: 0, loading: 1};
	const offset = { left: -100, right: 100};
	const delay = 0.25 + (index * 0.02);
	return {
		transform: 'translateX(' + statusOffset[status] * offset[side] + 'px)',
		transition: '.3s ease-out transform ' + delay + 's',
	};
}