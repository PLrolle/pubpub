import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import {safeGetInToJS} from 'utils/safeParse';
import fuzzy from 'fuzzy';
import {LoaderDeterminate} from 'components';
import {PreviewEditor} from 'components';

// import {globalStyles} from 'utils/styleConstants';
// import {globalMessages} from 'utils/globalMessages';
// import {FormattedMessage} from 'react-intl';
import Dropzone from 'react-dropzone';
import {s3Upload} from 'utils/uploadFile';
import {getMedia, createAtom, saveVersion} from './actions';
import {updateAtomDetails, addContributor, updateContributor, deleteContributor} from 'containers/Atom/actions';

import atomTypes from 'components/AtomTypes';

let styles;

export const Manage = React.createClass({
	propTypes: {
		mediaData: PropTypes.object,
		// Functions that allow callbacks on saveVersion or Insert
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			filter: '',
			createNewType: 'document',
			uploadRates: [],
			uploadFiles: [],
		};
	},

	componentDidMount() {
		this.props.dispatch(getMedia());
	},

	filterChange: function(evt) {
		this.setState({filter: evt.target.value});
	},

	// On file drop (or on file select)
	// Upload files automatically to s3
	// On completion call function that hits the pubpub server to generate asset information
	// Generated asset information is then sent to Firebase for syncing with other users
	onDrop: function(files) {

		const startingFileIndex = this.state.uploadRates.length;
		const newUploadRates = files.map((file)=> {
			return 0;
		});
		const newUploadFiles = files.map((file)=> {
			return file.name;
		});
		const uploadRates = this.state.uploadRates.concat(newUploadRates);
		const uploadFiles = this.state.uploadFiles.concat(newUploadFiles);


		files.map((file, index)=> {
			s3Upload(file, this.onFileProgress, this.onFileFinish, startingFileIndex + index);
		});

		this.setState({
			uploadRates: uploadRates,
			uploadFiles: uploadFiles,
		});

	},

	onSelect: function(evt) {
		const selectedFiles = [];
		for (let index = 0; index < evt.target.files.length; index++) {
			selectedFiles.push(evt.target.files[index]);
		}
		this.onDrop(selectedFiles);
		document.getElementById('media-file-select').value = '';
	},

	// Update state's progress value when new events received.
	onFileProgress: function(evt, index) {
		const percentage = evt.loaded / evt.total;
		const tempUploadRates = this.state.uploadRates;
		tempUploadRates[index] = percentage;
		this.setState({uploadRates: tempUploadRates});
	},

	onFileFinish: function(evt, index, type, filename, title) {

		let atomType = undefined;
		const extension = filename.split('.').pop();
		switch (extension) {
		case 'jpg':
		case 'png':
		case 'jpeg':
		case 'tiff':
		case 'gif':
			atomType = 'image'; break;
		case 'pdf':
			atomType = 'pdf'; break;
		case 'ipynb':
			atomType = 'jupyter'; break;
		case 'mp4':
		case 'ogg':
		case 'webm':
			atomType = 'video'; break;
		case 'csv':
			atomType = 'table'; break;
		default:
			break;
		}

		const versionContent = {
			url: 'https://assets.pubpub.org/' + filename
		};
		this.props.dispatch(createAtom(atomType, versionContent, title));
		this.setState({filter: ''});
	},

	saveVersionHandler: function(newVersionContent, versionMessage, atomData) {
		const newVersion = {
			type: atomData.type,
			message: versionMessage,
			parent: atomData._id,
			content: newVersionContent
		};
		this.props.dispatch(saveVersion(newVersion));
	},

	handleCreateNewChange: function(item) {
		this.setState({createNewType: item});
	},

	createNew: function() {
		console.log('Creating: ', this.state.createNewType);
		// If document, redirect
		this.props.dispatch(createAtom(this.state.createNewType, undefined, ('New ' + this.state.createNewType), undefined, true));
		this.setState({filter: ''});
	},

	setFilter: function(string) {
		this.setState({filter: string});
	},

	handleAddContributor: function(atomID, contributorID) {
		this.props.dispatch(addContributor(atomID, contributorID));
	},

	handleUpdateContributor: function(linkID, linkType, linkRoles) {
		this.props.dispatch(updateContributor(linkID, linkType, linkRoles));
	},

	handleDeleteContributor: function(linkID) {
		this.props.dispatch(deleteContributor(linkID));
	},

	updateDetails: function(atomID, newDetails) {
		this.props.dispatch(updateAtomDetails(atomID, newDetails));
	},

	render: function() {

		const mediaItems = safeGetInToJS(this.props.mediaData, ['mediaItems']) || [];
		const allTypes = mediaItems.map((item)=> {
			return item.type;
		});
		const allUniqueTypes = [...new Set(allTypes)];

		const typeFilters = this.state.filter.match(/type:([a-zA-Z]*)/gi) || [];
		const typesFiltered = typeFilters.map((type)=> {
			return type.replace('type:', '');
		}).filter((item)=> {
			return !!item;
		});
		
		const mediaItemsFilterForType = mediaItems.filter((item)=> {
			if (typesFiltered.length === 0) { return true; }
			return typesFiltered.includes(item.type);
		});

		const filteredItems = fuzzy.filter(this.state.filter.replace(/type:([a-zA-Z]*)/gi, ''), mediaItemsFilterForType, {extract: (item)=>{ return item.type + ' ' + item.parent.title;} });

		const options = Object.keys(atomTypes).sort((foo, bar)=>{
			// Sort so that alphabetical
			if (foo > bar) { return 1; }
			if (foo < bar) { return -1; }
			return 0;
		});
		return (
			<div style={{backgroundColor: '#999', padding: '3em'}}>
			<Dropzone ref="dropzone" disableClick={true} onDrop={this.onDrop} style={{}} activeClassName={'dropzone-active'} >
			<div style={{backgroundColor: 'white'}}>

				<div style={styles.mediaSelect}>

					<div style={styles.mediaSelectHeader}>

						<div style={styles.addNewDropdown}>
							<div className={'light-button arrow-down-button'} style={{position: 'relative', minWidth: '150px',}}><span style={{textTransform: 'capitalize'}}>{this.state.createNewType}</span>
								<div className={'hoverChild arrow-down-child'}>
									{options.map((option)=>{
										return <div key={'setType-' + option} onClick={this.handleCreateNewChange.bind(this, option)} style={{textTransform: 'capitalize'}}>{option}</div>;
									})}
								</div>
							</div>
						</div>
						<div className={'button'} onClick={this.createNew} style={{padding: 'calc(.3em + 1px) 1em', verticalAlign: 'top', left: '-2px'}}>Create New</div>


						<div className={'button'} style={styles.dropzoneBlock}>
							Click or Drag files to add
							<input id={'media-file-select'} type={'file'} onChange={this.onSelect} multiple={true} style={styles.fileInput}/>
						</div>

					</div>

					{this.state.uploadFiles.map((uploadFile, index)=> {
						return (
							<div key={'uploadFile-' + index} style={[styles.uploadBar, this.state.uploadRates[index] === 1 && {display: 'none'}]}>
								{uploadFile}
								<LoaderDeterminate value={this.state.uploadRates[index] * 100} />
							</div>
						);
					})}

						<div className={'light-button arrow-down-button'} style={{position: 'relative'}}>Filter
							<div className={'hoverChild arrow-down-child'}>
								{allUniqueTypes.sort((foo, bar)=>{
									// Sort so that alphabetical
									if (foo > bar) { return 1; }
									if (foo < bar) { return -1; }
									return 0;
								}).map((item)=> {
									return <div key={'filter-type-' + item} onClick={this.setFilter.bind(this, ('type:' + item))} style={{textTransform: 'capitalize'}}>{item}</div>;
								})}
							</div>
						</div>
						<input type="text" placeholder={'Filter'} value={this.state.filter} onChange={this.filterChange} style={styles.filterInput}/>

						{filteredItems.map((item)=> {
							return item.original;
						}).sort((foo, bar)=>{
							// Sort so that most recent is first in array
							if (foo.parent.lastUpdated > bar.parent.lastUpdated) { return -1; }
							if (foo.parent.lastUpdated < bar.parent.lastUpdated) { return 1; }
							return 0;
						}).splice(0, 20).map((item, index)=> {
							if (this.state.atomMode === 'recent' && index > 9) {
								return null;
							}
							const buttons = [ 
							// 	{ type: 'link', text: 'Save Version', link: '/pub/' + item.slug + '/edit' },
							];

							return (
								// Add bibtex back into reference editor
								<PreviewEditor 
									key={'atomItem-' + (item._id || item.parent._id)}
									atomData={item.parent}
									versionData={item}
									contributorsData={item.contributors}
									footer={ <div> <input type="checkbox" /> Show on profile</div> }
									buttons = {buttons} 

									onSaveVersion={this.onSaveVersion}
									onSaveAtom={this.onSaveAtom}
									updateDetailsHandler={this.updateDetails}
									handleAddContributor={this.handleAddContributor}
									handleUpdateContributor={this.handleUpdateContributor}
									handleDeleteContributor={this.handleDeleteContributor}
									saveVersionHandler={this.saveVersionHandler}

									detailsLoading={item.detailsLoading}
									detailsError={!!item.detailsError}
									permissionType={item.permissionType}

									defaultOpen={item.defaultOpen}/>

							);
						})}

				</div>

			</div>

			<div className={'showOnActive'}>Drop files to add</div>
			</Dropzone>
			</div>
		);
	}

});

export default connect( state => {
	return {
		mediaData: state.manage,
	};
})( Radium(Manage) );

styles = {
	editModeHeader: {
		display: 'table',
		padding: '.5em 0em',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			display: 'block',
		},
	},
	container: {
		// position: 'fixed',
		// top: 0,
		// left: 0,
		// width: '100vw',
		// height: '100vh',
		// backgroundColor: 'rgba(0,0,0,0.6)',
		// zIndex: 999,
		// opacity: 0,
		// pointerEvents: 'none',
		// transition: '.1s linear opacity',
	},
	containerActive: {
		opacity: 1,
		pointerEvents: 'auto',
	},
	splash: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		zIndex: 1000,
	},
	modalContent: {
		position: 'fixed',
		zIndex: 10001,
		// width: 'calc(80vw - 2em)',
		// maxHeight: 'calc(92vh - 4em)',
		maxHeight: '92vh',
		top: '4vh',
		left: '5vw',
		right: '5vw',
		backgroundColor: 'white',
		overflow: 'hidden',
		overflowY: 'scroll',
		boxShadow: '0px 0px 3px rgba(0,0,0,0.7)',
		transform: 'scale(0.8)',
		transition: '.1s ease-in-out transform',
		borderRadius: '2px',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			// width: 'calc(98vw - 2em)',
			height: 'calc(98vh - 2em)',
			top: '1vh',
			left: '1vw',
			right: '1vw',
			padding: '1em',
		},
	},
	modalContentActive: {
		transform: 'scale(1.0)',
	},
	mediaSelect: {
		// padding: '1em 0em',
	},
	mediaSelectHeader: {
		padding: '1em 0em',
	},
	mediaDetails: {
		padding: '1em 2em',
	},
	filterInput: {
		display: 'inline-block',
		// width: 'calc(100% - 20px - 4px)',
		// borderWidth: '0px 0px 2px 0px',
	},
	input: {
		width: 'calc(100% - 20px - 4px)',
	},
	textarea: {
		height: '4em',
	},
	item: {
		margin: '1em 0em',
		backgroundColor: '#F3F3F4',
		cursor: 'pointer',
		// display: 'inline-block',
		width: '100%',
		height: '50px',
		overflow: 'hidden',
		display: 'table',
	},
	itemPreview: {
		width: '1%',
		height: '50px',
		marginRight: '1em',
		display: 'table-cell',
		verticalAlign: 'middle',
	},
	itemPreviewImage: {
		maxWidth: '50px',
		maxHeight: '50px',
	},
	itemDetail: {
		display: 'table-cell',
		verticalAlign: 'middle',
		padding: '1em',
	},
	details: {
		display: 'table',
		width: '100%',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			display: 'block',
		},
	},
	detailsPreview: {
		display: 'table-cell',
		verticalAlign: 'middle',
		position: 'relative',
		textAlign: 'center',
		padding: '1em',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			display: 'block',
			padding: '1em 0em',
		},
	},
	detailsForm: {
		display: 'table-cell',
		width: '50%',
		padding: '2em 1em',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			display: 'block',
			width: '100%',
			padding: '2em 0em',
		},
	},
	detailsTitle: {
		left: 0,
		display: 'table-cell',
	},
	detailsClear: {
		display: 'inline-block',
		cursor: 'pointer',
	},
	detailsCancel: {
		cursor: 'pointer',
		display: 'table-cell',
		width: '1%',
		padding: '0em 1em',
	},
	detailsButtonWrapper: {
		display: 'table-cell',
		width: '1%',
	},
	detailsButton: {
		padding: '0em 1em',
		whiteSpace: 'nowrap',
	},
	radioInput: {
		margin: '0em 0em 1em 0em',
	},
	radioLabel: {
		display: 'inline-block',
		fontSize: '0.95em',
		margin: '0em 2em 1em 0em',
	},
	disabledInput: {
		opacity: 0.5,
		pointerEvents: 'none',
	},
	addNewDropdown: {
		// width: '250px',
		display: 'inline-block',
		// minWidth: '150px',
	},
	dropzoneBlock: {
		padding: '0em 2em',
		margin: '0em 1em',
		fontSize: '0.85em',
		borderStyle: 'dashed',
		height: '34px',
		lineHeight: '34px',
		verticalAlign: 'top',
		position: 'relative',
		overflow: 'hidden',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			margin: '0em',
		},
	},
	fileInput: {
		marginBottom: '0em',
		width: '100%',
		position: 'absolute',
		height: 'calc(100% + 20px)',
		left: 0,
		top: -20,
		padding: 0,
		cursor: 'pointer',
		opacity: 0,
	},
	uploadBar: {
		margin: '0em 2em 1em',
		overflow: 'hidden',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			margin: '0em 0em 1em',
		},
	},

};